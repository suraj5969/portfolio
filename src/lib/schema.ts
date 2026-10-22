import { SOCIAL_LINKS } from '../consts';

export const SITE_URL = 'https://surajgupta.dev';
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function personSchema() {
	return {
		'@type': 'Person',
		'@id': PERSON_ID,
		name: 'Suraj Gupta',
		givenName: 'Suraj',
		familyName: 'Gupta',
		url: SITE_URL,
		image: `${SITE_URL}/og.png`,
		jobTitle: 'Full Stack Engineer',
		description:
			'Full stack engineer with 5+ years of experience in AI-powered product development, technical leadership, and developer tooling.',
		worksFor: [
			{ '@type': 'Organization', name: 'SafetyConnect', url: 'https://www.safetyconnect.io' },
			{ '@type': 'Organization', name: 'LST Consultancy', url: 'https://lstconsultancy.com' },
		],
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Nashik',
			addressCountry: 'IN',
		},
		knowsAbout: [
			'Full stack development',
			'LLM applications',
			'TypeScript',
			'Node.js',
			'React',
			'Python',
			'AWS',
		],
		sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.x, SOCIAL_LINKS.instagram],
		email: SOCIAL_LINKS.email,
	};
}

export function websiteSchema() {
	return {
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		url: SITE_URL,
		name: 'Suraj Gupta',
		description:
			'Full stack engineer building AI-powered products, scalable backends, and the teams that ship them.',
		author: { '@id': PERSON_ID },
		publisher: { '@id': PERSON_ID },
		inLanguage: 'en',
	};
}

export function profilePageSchema(pageUrl: string) {
	return {
		'@type': 'ProfilePage',
		'@id': `${pageUrl}#profile`,
		url: pageUrl,
		mainEntity: { '@id': PERSON_ID },
		about: { '@id': PERSON_ID },
		isPartOf: { '@id': WEBSITE_ID },
	};
}

export function collectionPageSchema(input: {
	pageUrl: string;
	name: string;
	description: string;
	inLanguage?: string;
}) {
	const { pageUrl, name, description, inLanguage = 'en' } = input;
	return {
		'@type': 'CollectionPage',
		'@id': `${pageUrl}#page`,
		url: pageUrl,
		name,
		description,
		isPartOf: { '@id': WEBSITE_ID },
		about: { '@id': PERSON_ID },
		author: { '@id': PERSON_ID },
		inLanguage,
	};
}

export interface BreadcrumbItem {
	name: string;
	url: string;
}

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

export interface BlogPostingInput {
	pageUrl: string;
	title: string;
	description: string;
	pubDate: Date;
	updatedDate?: Date;
	imageUrl?: string;
	keywords?: string[];
}

export function blogPostingSchema(input: BlogPostingInput) {
	const { pageUrl, title, description, pubDate, updatedDate, imageUrl, keywords } = input;
	return {
		'@type': 'BlogPosting',
		'@id': `${pageUrl}#post`,
		url: pageUrl,
		mainEntityOfPage: pageUrl,
		headline: title,
		description,
		datePublished: pubDate.toISOString(),
		dateModified: (updatedDate ?? pubDate).toISOString(),
		author: { '@id': PERSON_ID },
		publisher: { '@id': PERSON_ID },
		isPartOf: { '@id': WEBSITE_ID },
		...(imageUrl ? { image: imageUrl } : {}),
		...(keywords?.length ? { keywords } : {}),
		inLanguage: 'en',
	};
}

export function buildGraph(...nodes: object[]) {
	return {
		'@context': 'https://schema.org',
		'@graph': [personSchema(), websiteSchema(), ...nodes],
	};
}
