import { getCollection } from 'astro:content';

/**
 * Drafts are visible to authors:
 *   - during local `pnpm dev` (so we can preview while writing);
 *   - on Cloudflare preview deployments — any branch other than `main`
 *     (so we can review on the real edge before publishing).
 *
 * They stay hidden on the production build (branch=main → surajgupta.dev),
 * so the live site never accidentally exposes a work-in-progress post.
 */
const showDrafts = import.meta.env.DEV;

export async function getBlogPosts() {
	return getCollection('blog', ({ data }) => showDrafts || !data.draft);
}
