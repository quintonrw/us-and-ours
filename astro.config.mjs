import { defineConfig } from 'astro/config';

// Static output; Vercel detects Astro and serves /dist.
// Update `site` once the domain is registered.
export default defineConfig({
  site: 'https://usandours.com',
  trailingSlash: 'never',
  build: { format: 'directory' },
});
