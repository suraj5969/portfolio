import type { APIRoute, GetStaticPaths } from 'astro';
import { getBlogPosts } from '../../../lib/blog';
import { renderOG } from '../../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getBlogPosts();
	return posts.map((post) => ({
		params: { slug: post.id },
		props: { title: post.data.title },
	}));
};

export const GET: APIRoute = async ({ props }) => {
	const png = await renderOG({
		eyebrow: '03 · blog',
		title: (props as { title: string }).title,
		footer: 'surajgupta.dev/blog',
	});
	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};
