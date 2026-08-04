import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const VIRTUAL_MODULE_ID = 'virtual:blog-posts';
const RESOLVED_ID = '\0' + VIRTUAL_MODULE_ID;

export default function blogPlugin(): Plugin {
  const blogDir = path.resolve(__dirname, '../content/blog');

  function loadPosts() {
    if (!fs.existsSync(blogDir)) {
      return [];
    }

    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

    return files
      .map(file => {
        const filePath = path.join(blogDir, file);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(raw);

        const stats = readingTime(content);

        return {
          slug: data.slug || file.replace(/\.md$/, ''),
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString().split('T')[0],
          excerpt: data.excerpt || '',
          tags: data.tags || [],
          coverImage: data.coverImage || null,
          readingTime: data.readingTime || Math.ceil(stats.minutes),
          published: data.published !== false,
          content,
        };
      })
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return {
    name: 'vite-plugin-blog',

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_ID) {
        const posts = loadPosts();
        return `export default ${JSON.stringify(posts, null, 2)};`;
      }
    },

    handleHotUpdate({ file, server }) {
      if (file.includes('content/blog') && file.endsWith('.md')) {
        const module = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (module) {
          server.moduleGraph.invalidateModule(module);
          server.ws.send({ type: 'full-reload' });
        }
      }
    },
  };
}
