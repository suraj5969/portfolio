---
title: "How I Built an AI Chatbot"
description: "What it takes to build a chatbot that answers questions from real customer data, safely."
pubDate: "2026-10-25"
heroImage: "../../assets/blog/chatbot.png"
tags: ["AI", "chatbot", "LLM"]
---

We recently shipped an AI assistant inside SafetyConnect, our fleet and workplace safety platform. A safety manager can type something like *"Which drivers had the most harsh braking events in the North region last month?"* and get back a short answer, a chart, and a few follow-up questions worth asking next.

## 1. Decide what kind of chatbot you're building

"AI chatbot" covers very different products, and each one fails in its own way:

| Kind of bot | What it does | Main risk |
| --- | --- | --- |
| Knowledge / Q&A | Answers from docs, FAQs, manuals | Confidently wrong answers |
| Data / analytics | Answers by querying your data | Wrong numbers, data leaking between users |
| Task automation | Creates records, sends messages | Irreversible side effects |
| Coding agent | Reads and edits code, runs commands | Breaking things at scale |

Most real products mix two of these. That's fine, but be clear about what's in scope for version one. Every capability you add widens what can go wrong.

We kept version one to **read-only questions over customer data** to remove a lot of work like how to control and make safe writes, confirmation flows, etc. Our decision shrinks the potential problems to only 2. The bot can give a wrong number, or it can show data to someone who shouldn't see it.

## 2. Make it deterministic wherever you can

An LLM is a probabilistic text generator. Ask it the same thing twice and you might get two different queries and two different numbers.

So if you already know how an answer should be calculated, write that calculation as code and let the model call it. Standard KPIs, fixed reports and anything a customer will compare week over week belong in functions. The model's job is to understand the question, pick the right function call and fill in the arguments.

A few rules help here. Give every tool a strict schema, and validate the model's arguments against that same schema. Keep tools narrow. And keep policy out of the model's hands and in deterministic code like tenant isolation, RBAC, and customer- or feature-specific rules belong in code.

## 3. Treat the system prompt like onboarding a new hire

The model knows SQL. It doesn't know your business. Every product has rules that live in people's heads: how a metric is really calculated, which column looks right but isn't, which hack someone added three years ago. A new engineer picks these up over months. The model has to learn them from your prompt every time.

So write the prompt the way you'd brief a careful new hire. Cover the product rules, the gotchas, the hard-coded special cases, the defaults (which time period, which units), and how to answer. Then keep it alive. Most of my rules were written after watching the bot get something wrong, and I note the failure next to each rule so nobody "tidies it up" later.

Don't use one giant prompt. Each step gets its own focused prompt: the classifier, the agent that writes the answer, text-to-SQL, a rulebook of business definitions, SQL repair and follow-up suggestions. Every prompt also gets today's date in the customer's timezone, so "last week" means the same thing to the bot as it does to the user.

## 4. Describe your schema like you're explaining it to an engineer

A text-to-SQL bot is only as good as its understanding of your tables, and column names alone aren't enough. Does `region` mean a sales region, a billing address or an operational zone? The model will guess.

For every table the bot can touch, write down what the table is for, what each column means (units, special values like "-1 means not scored"), the allowed values for text columns, how it joins to other tables, and which columns are traps. Keep these descriptions in code and review changes to them like any other code. The schema drifts as the product evolves, and the model will keep using the old rules unless you update them. Make sure to update to keep schema in sync with prompt.

## 5. Only show the model the tables that matter

You could paste the whole schema into every prompt. With a handful of tables that works. With dozens, it costs tokens, slows every call, and makes the model more likely to join something irrelevant just because it was there.

The fix is retrieval, the simplest form of RAG. Treat each table description as a small document and fetch the few that best match each question. One thing matters a lot here. Users ask in business language ("who brakes hard the most?"), while schemas use identifiers (`harsh_braking_count`). Semantic search is good at the first, and keyword search is good at the second. Use both.

I store each table in Qdrant with two vectors: a dense one from Azure OpenAI embeddings for meaning, and a sparse BM25 one for exact words. The tokenizer splits identifiers, so `harsh_braking_count` also matches "harsh braking". The two result lists are merged with Reciprocal Rank Fusion, and the top 7 tables go into the SQL prompt. I left out a reranker on purpose because RRF was already good enough for our questions.

## 6. Never give the AI unguarded access to your data

A prompt is a request, not a rule. You can write "only query this customer's data," and a determined user can still talk the model out of it. The model can also just make a mistake. Anything that matters for security has to be enforced by code that sits between the model and your data, where no prompt can reach it.

The principles are simple:

- **Least privilege.** A Q&A bot gets a read-only database user.
- **Identity comes from authentication**, never from the conversation.
- **Impose limits instead of checking for them.** Don't check whether the model added the right filter. Add it yourself.
- **Fail closed, and cap everything:** rows, query time, query size, loop rounds.

Here's how that played out for me.

**Who can see what.** Access follows the customer's hierarchy of departments, regions and managers, and each admin can see only part of it. That scope comes from the verified token and is passed into each run as configuration. It's never stored in the conversation, because conversations can be resumed later.

**One guard for every query.** The model writes SQL, but that SQL never runs as written. Every query goes through a single guard, which parses it. The guard rejects anything that isn't exactly one `SELECT`, any table outside the allowed catalog, any function outside an allowlist of pure functions, and system catalogs.

It then rewrites every table reference into a pre-filtered subquery scoped to the user's tenant and hierarchy. Checking that the model wrote `organization_id = 'A'` is a losing game, because `... OR TRUE` passes the check. After the rewrite, whatever the model writes can only narrow the data further. The same rewrite applies business rules, such as only counting business trips, and caps results with a `LIMIT`.

**Belt and braces.** Queries run as a read-only role, inside a read-only transaction, with a statement timeout. Errors go back to the model only as safe text, and SQL never reaches the client.

### The road I didn't take

There's a safer design than mine: don't let the AI write SQL at all. Build a small query layer instead. The model produces a structured request (metric, filters, group by, period), and your code turns it into SQL you wrote. Every metric is then defined once, the model needs far less schema knowledge, and you never parse untrusted SQL.

The cost is build time. Every metric and filter has to be built and maintained, and anything the layer doesn't support can't be answered. I was working alone and wanted the bot to handle a long tail of questions from day one, so I went with text-to-SQL and a strong guard. If you have the people, start with a query layer for your common questions and keep text-to-SQL as the fallback.

## 7. Design the conversation loop

A chatbot isn't one prompt and one model call. It's a small state machine: understand the message, decide what to do, do it, check the result, answer. Writing that loop down explicitly makes the bot much easier to test and debug.

Every loop needs a few things. It needs a budget, so a confused model can't loop forever. It needs self-repair, so the model gets its errors back and a few tries to fix them. It needs a way to ask the user when a question is ambiguous, and graceful degradation so a failing nice-to-have step doesn't lose the answer.

<figure>
<svg viewBox="0 50 760 486" role="img" aria-label="Chat graph: classify, agent, tools, finalize. Every data question passes through one guarded tool." font-size="13" style="width:100%;height:auto">
<style>.cg-ink{fill:var(--text)}.cg-q{fill:var(--text-muted);font-size:11.5px}.cg-b{font-weight:600}.cg-box{fill:none;stroke:var(--text-subtle);stroke-width:1.25}.cg-main{fill:var(--accent-soft);stroke:var(--accent);stroke-width:2}.cg-line{fill:none;stroke:var(--text-subtle);stroke-width:1.25}.cg-head{fill:var(--text-subtle)}</style>
<defs><marker id="cg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="cg-head" d="M0 0L10 5L0 10z"/></marker></defs>
<g class="cg-line" marker-end="url(#cg-arrow)"><path d="M170 90H200"/><path d="M350 90H395"/><path d="M545 90H585"/><path d="M275 114V166"/><path d="M455 114V250"/><path d="M485 250V114"/><path d="M445 350H485"/><path d="M560 372V418"/><path d="M485 440H445"/><path d="M635 440H680V350H635"/></g>
<rect class="cg-box" x="20" y="66" width="150" height="48" rx="8"/><text class="cg-ink" x="95" y="94" text-anchor="middle">User question</text>
<rect class="cg-box" x="200" y="66" width="150" height="48" rx="8"/><text class="cg-ink" x="275" y="94" text-anchor="middle">Classify intent</text>
<rect class="cg-box" x="395" y="66" width="150" height="48" rx="8"/><text class="cg-ink cg-b" x="470" y="94" text-anchor="middle">Agent</text>
<rect class="cg-box" x="585" y="66" width="150" height="48" rx="8"/><text class="cg-ink" x="660" y="94" text-anchor="middle">Finalize</text><text class="cg-q" x="660" y="136" text-anchor="middle">chart + follow-ups</text>
<rect class="cg-box" x="200" y="166" width="150" height="48" rx="8"/><text class="cg-ink" x="275" y="194" text-anchor="middle">Direct reply</text>
<text class="cg-q" x="372" y="80" text-anchor="middle">data</text><text class="cg-q" x="565" y="80" text-anchor="middle">done</text><text class="cg-q" x="283" y="144">smalltalk, help, off-topic</text><text class="cg-q" x="447" y="200" text-anchor="end">objective</text><text class="cg-q" x="493" y="200">rows, max 30 shown</text>
<rect class="cg-box" x="24" y="250" width="712" height="262" rx="8"/><text class="cg-ink cg-b" x="40" y="274">Tools the agent can call (max 4 rounds)</text>
<rect class="cg-box" x="40" y="300" width="204" height="88" rx="8"/><text class="cg-ink cg-b" x="56" y="324">ask_user</text><text class="cg-q" x="56" y="340">Asks a clarifying question</text><text class="cg-q" x="56" y="356">Saves state, pauses the turn</text><text class="cg-q" x="56" y="372">Resumes on the user's reply</text>
<rect class="cg-box" x="270" y="290" width="450" height="206" rx="8"/><text class="cg-ink cg-b" x="286" y="314">analytics_query</text><text class="cg-q" x="286" y="484">Scope filters and LIMIT are added by the guard, not the model</text>
<rect class="cg-box" x="295" y="328" width="150" height="44" rx="8"/><text class="cg-ink" x="370" y="354" text-anchor="middle">Retrieve tables</text>
<rect class="cg-box" x="485" y="328" width="150" height="44" rx="8"/><text class="cg-ink" x="560" y="354" text-anchor="middle">Write SQL</text>
<rect class="cg-main" x="485" y="418" width="150" height="44" rx="8"/><text class="cg-ink cg-b" x="560" y="444" text-anchor="middle">SQL guard</text>
<rect class="cg-box" x="295" y="418" width="150" height="44" rx="8"/><text class="cg-ink" x="370" y="444" text-anchor="middle">Run read-only</text>
<text class="cg-q" x="672" y="399" text-anchor="end">repair, max 3</text>
</svg>
<figcaption>Every data question passes through one guarded tool.</figcaption>
</figure>

I built the loop as a LangGraph graph: **classify → agent → tools → finalize**. Greetings, help and off-topic messages never reach the database. The agent writes plain-language objectives, never SQL. The tool turns each objective into SQL, guards it and runs it, with up to 3 repair attempts if something rejects it. The agent gets up to 4 rounds of tool calls, and after that it answers with what it has and says what's missing. Code builds the chart from the full result, and a small model suggests follow-ups. If that call fails, the answer still goes out.

When a question is genuinely ambiguous, the agent can call `ask_user`. The graph pauses, shows the clarifying question, and picks up where it left off once the user replies.

## 8. Trace everything

When a normal API returns a wrong result, you read the code. When a chatbot returns a wrong number, the code is usually fine. Something in a chain of model calls went wrong, and unless you recorded every step you can't tell which one. Was the right table retrieved? Did the SQL use the right formula? Did the answer misread the rows?

Set up LLM tracing from day one. For each user message you want every model call with its prompt, output, tokens and cost, every tool call with its inputs and outputs, timings, and the user and conversation it belongs to.

## 9. Production hygiene: limits, errors and evals

A chatbot is still a web service, just a much more expensive one. A single question can trigger several model calls and several database queries, so set rate limits that fit your budget.

Show errors people can actually act on. "You don't have access to this user" or "this feature isn't enabled for your account" is far better than "something went wrong."

Tests and evals are a must. When someone reports a bad answer, turn it into an eval case.

If you're building something similar, start narrow, put the guardrails in code, and write evals before you need them.
