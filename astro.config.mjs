import { defineConfig } from 'astro/config';

// Static output to /dist, served by Cloudflare (see wrangler.jsonc).
// Update `site` once the domain is registered.
export default defineConfig({
  site: 'https://usandours.com',
  trailingSlash: 'never',
  build: { format: 'directory' },
});
