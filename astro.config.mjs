import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeSections from './src/lib/rehype-sections.mjs';

// Static site. Deploys free to Netlify or Cloudflare Pages:
// build command `npm run build`, output folder `dist`.
export default defineConfig({
  // SITE and BASE_PATH are set by the GitHub Pages workflow (.github/workflows/deploy.yml).
  // Locally they're unset, so the site runs at http://localhost:4321/.
  site: process.env.SITE || 'https://example.com',
  base: process.env.BASE_PATH || '/',
  // rehypeSections groups each `##` section of a case study so the page can lay it out in two columns.
  integrations: [mdx({ rehypePlugins: [rehypeSections] })],
});
