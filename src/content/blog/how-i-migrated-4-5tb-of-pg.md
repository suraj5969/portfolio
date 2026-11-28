---
title: "How I Migrated a 4.5 TB Postgres DB with 92 Seconds of Downtime"
description: "How I migrated two Postgres databases, cut storage by 70%, and upgraded to Postgres 18."
pubDate: "2026-11-27"
---

I recently migrated my company's 4.5 terabytes of postgres database to a new database instance. Successfully migrating within 92 seconds of downtime and reducing the storage by 70% (yeah that's right), updating postgres to the latest version, and and lot more. This post is a detailed account of how I did it, the challenges I faced, and the lessons I learned along the way.


## Why We Did It

We are a driver safety product([SafetyConnect](https://safetyconnect.io/)) and we primarily capture users trips and build analytics around them, with lot more other funcanalities around the product. We were maintaning 2 databases for one product, and the data was kept forever, including churned customers. We were running an ageing Postgres version, and our live schema had drifted away from our ORM models. Indexes were bloated and misaligned, and there were unused tables and dead columns. Finally, our old RDS instances were publicly accessible from the internet and services connected without TLS.

- **Two databases for one product.** Core application data (customers, users, vehicles) lived in `main` db, while trips and sensor events lived in `trips` db. Every backend service had to connect to both, and anything that needed data from both sides had to stitch it together in application code—we couldn't even enforce foreign keys between trips and users or vehicles. This decision was made years ago and was designed by a third party agency, when company was started.
- **Keeping everything forever.** Roughly 4.5 TB had piled up over the years, mostly old raw trip telemetry that nobody ever opened. Backups, restores, and sequential scans all scaled with that dead weight. We never cleaned up the historical data of a active customer.
- **An ageing Postgres version.** Both instances were running Postgres 14. AWS RDS Extended Support for Postgres 14 is scheduled around February 2027, which would have costed us a lot more.
- **Schema drift.** Over time, the live schema had drifted away from our ORM models—manual indexes, hand-built partitions, and leftover constraints that the codebase didn't even know about.
- **Bloated and misaligned indexes.** Some indexes had barely been scanned in years; others were huge 8–10-column composites or separate single-column indexes where queries actually needed a two-column composite. At the same time, hot queries were hitting massive sequential scans because they lacked the right index.
- **Unused tables and dead columns.** Features we had removed long ago still had tables and columns taking up space on massive tables, alongside `isDeleted` flags that were always `false` and never actually set.
- **Extra Storage with less information.** Some endpoints were called more than they required, like we had a health ping endpoint that was called to frequenlty and has grown the health table to `250 GB`. I reduced the frequncy of this ping while keeping the information content same, also decided to reduce the data ingestion for some other places while keeping the informtion required same from that data.
- **Security debt.** Our old RDS instances were publicly accessible from the internet and services connected without TLS. Moving to a brand-new database was the cleanest moment to lock everything inside our VPC and enforce SSL.

---

## Doing it Solo as a Full-Stack Developer

I ran this migration solo. I'm a full-stack developer, not a dedicated DBA, so I knew my limits going in. Whatever strategy I picked had to satisfy three rules:

1. Keep live production untouched during prep and during migration, so prod data is unaffected.
2. Keep the process simple enough to reason about and verify, even if its slow.
3. Guarantee an easy, fast rollback. If something went wrong after cutover, we needed to be able to flip back to the old databases without panic.

Working with Claude while designing the plan helped stress-test my assumptions. It pushed me toward a few changes that made a huge difference—including rethinking how we store trip telemetry.

---

## The Big Architectural Decisions

### 1. Packing per-point trip tables into compressed `jsonb`

Initially, my plan was straightforward: keep the last 15 months of data, clean up the schema and indexes, upgrade to Postgres 18 and merge 2 databases into one.

I already knew that almost all of database storage was four trips tables: `Trajectories`, `Accelerations`, `Turns`, and `PhoneHandlings`. Every GPS waypoint and every harsh driving event had its own row—around **300 rows per trip**, backed by massive multi-column indexes. Every single endpoint loaded this events *by trip*. Nobody queried individual GPS points across trips. So instead of keeping hundreds of rows per trip across four tables, claude suggested to pack all of a trip's trajectory arrays, raw events, and pre-filtered risk events into **one row per trip**. It made sense to me as it would compress a lot of data and still not affect any analytics around them as we already have rough statistics of trips stored separtely and all analytics were happening on them.

This single decision turned ~400 row writes and multiple index updates per trip into a single row write, and cut the storage footprint dramatically.

### 2. Archiving to S3 Parquet instead of deleting

I didn't want to throw historical data away as active clients may still ask for for them. But from our product usage analytics I mostly saw only data quried for last 1 year, so I just decided to keep 15 months of data and archive other for any ask.

- Kept **15 months** of trip and core history.
- Everything pruned was first exported to **Parquet files in S3** (using DuckDB).

### 3. Offline rebuild + incremental catch-up (instead of in-place DDL)

Mutating 4.5 TB in place on live RDS would have meant days of I/O contention, lock risks, and no clean fallback. Instead, I decided to build the new database **completely offline** on a disposable work EC2 instance, load it into a fresh Postgres 18 RDS instance, and used an incremental catch-up loop to bridge the gap until cutover:

```text
  +-------------------------------+
  |   Live PG 14 (Main + trips)
  +---------------+---------------+
          |               |
          | (1) Snapshot  | (4) Incremental Catch-Up Loop
          v               |     (Inserts, Updates, Deletes)
  +---------------+       |
  |  Temp RDS     |       |
  +-------+-------+       |
          | (2) Dump       ------------------------------------
          v                                                    |
  +--------------------------------------+                     |
  | Disposable Work EC2 (PG 18)          |                     |
  | - Archive >15m to S3 Parquet         |                     |
  | - Backfill trips events in new table |                     |
  | - Cleanup, partition & merge dbs     |                     |
  +---------------+----------------------+                     |
                  |                                            |
                  | (3) Bulk Load (Data and Constraints)       |
                  v                                            |
  +-------------------------------+                            |
  |   New Private PG 18 RDS       |     <------------------------
  +-------------------------------+
```

---

## How the Catch-Up Mechanism Worked

Between taking the production snapshot and actually flipping traffic, 2–4 days of offline work had to happen. To keep the new Postgres 18 database in sync without scanning 4.5 TB on every pass, the catch-up relied on three pieces:

1. **Delete tracking:** Before taking the snapshot, I installed lightweight triggers on both live databases that logged the primary key and table of every deleted row into a dedicated `catchup` table.
2. **Insert and update tracking:** On the live databases, built a tiny partial indexes on `updatedAt` covering only rows modified after just before our snapshot time. Each catch-up pass only queried those recent changes instead of scanning whole tables.

Every pass ended with an automated `verify` check comparing recent row counts by key on both sides.

---

## Step-by-Step Walkthrough

### Phase 1: Freeze & Snapshot Live Production

1. **Freeze schema changes.** From this point until cutover, no database migrations or manual DDL were allowed on the live databases.
2. **Turn on delete tracking.** ran the delete-tracking SQL on both live PG 14 databases *before* taking snapshots so no deletes between could slip through.
3. **Snapshot and restore to temporary RDS instances.** Took RDS snapshots of both live databases and restored them to temporary instances. Dumping from temporary instances meant zero read load on live production.

### Phase 2: Offline Rebuild on a Disposable Work Host

4. **Dump and restore onto the work EC2.** Using Postgres 18's `pg_dump`, I dumped from the temporary RDS instances and restored onto a disposable EC2 host running Postgres 18 locally. Restored **without plain indexes** to save time and disk, then deleted the temporary RDS instances right away.
5. **Archive old data to S3 Parquet.** Export rows older than 15 months to S3 Parquet, verified the S3 files, and deleted them from the ec2 copy.
6. **Backfill `TripDetails` and drop legacy tables.** Transformed the remaining 15 months of `Trajectories`, `Accelerations`, `Turns`, and `PhoneHandlings` into `TripDetails` rows, verified that every single trip had its details, and dropped the old per-point tables.
7. **Clean up schema, partition, index, and link.** On the unified work database:
   - Dropped unused tables, dead columns, and unused `isDeleted` flags;
   - Partitioned required tables by month that has grown enough.
   - Built clean primary keys for partationed tables and a trimmed, query-backed index set.
   - Added real foreign keys between trip tables and `Users`/`Vehicles`/`Customers`— finally possible now that `main` and `trips` were one database.

### Phase 3: Provisioning & Tuning the New Postgres 18 RDS

8. **Create the Postgres 18 parameter group *before* loading.** Several settings matter up front, especially:
   - `default_toast_compression = lz4`: Setting this *before* restoring meant every `jsonb` payload in `TripDetails`.
   - `wal_compression = lz4`: Smaller WAL and faster backups with minimal CPU overhead.
   - `random_page_cost = 1.1` and `effective_io_concurrency = 64`: Matching SSD storage and taking advantage of Postgres 18's asynchronous I/O.
   - `work_mem = 32MB`, `maintenance_work_mem = 1GB`, `autovacuum_work_mem = 256MB`, `max_wal_size = 8GB`.
   - `shared_preload_libraries = pg_stat_statements,auto_explain,pg_cron` for query visibility, slow-plan logging, and in-database scheduled partition maintenance.
   - On high-churn tables set `fillfactor = 70` and tighter autovacuum thresholds to encourage HOT updates.
9. **Provision a private, locked-down RDS instance.** Created a smaller Postgres 18 instance inside our private VPC with `rds.force_ssl` enabled. During the bulk load, temporarily kept Multi-AZ off and backup retention at 0 for speed.

### Phase 4: Bulk Load, Constraints & Freezing

10. **Load schema, then data, then constraints.**
11. **Analyze and freeze.** Immediately after loading, run `vacuumdb --analyze-in-stages` so the query planner had statistics from start, followed by `vacuumdb --freeze --analyze` once while nobody was on the database. Then turned on Multi-AZ and backups back on.

### Phase 5: Catch-Up Passes & Rehearsal

12. **Rehearse on dev first, then catch up on prod.** First ran entire playbook on our dev environment first.
13. **Before Maintanace window verify everything is good**

### Phase 6: The Cutover

During our announced maintenance window:

1. **Stop all writers.** Stop all backend services, crons, and ETL jobs, and confirm zero active writers. Make sure how you will handel this data loss in downtime, our was buffered and retired from phone, so nothing was lost.
2. **Run the final catch-up, advance sequences, and verify.** Then the final catch-up pass, updated sequences, verify to confirm both sides matched.
3. **Switch configs, deploy, and restart.**
4. **Smoke tests & cleanup.**

---

## Monitoring & Cleanup

- Monitor the backend closely, some days after cutover to new DB.
- After a week, delete old dbs, archive/delete snapshots.  

---

## Takeaways

This is just the outline but any migration and this as well take a lot of effort and much other work, edge cases and building scripts with automated sanity checks for every step is going to take a lot of work, and this also did. This is just a quick outline and the way I did it, but there were a lot of other small minor steps involved. That changes from product to product and the way your DB is structured. This took me a month of work.
