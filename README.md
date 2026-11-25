# Us & Ours Counselling

Website for Rachel Glover, RCC (Victoria, BC). Built with [Astro](https://astro.build) as a static site and hosted on Cloudflare (Workers static assets, free plan). Every push to `main` builds and deploys automatically.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npx wrangler dev # serves dist/ the way Cloudflare will
```

## Where things live

- `src/site.ts`: phone, email, address, booking link and form endpoint. Change these in one place.
- `src/pages/`: one file per page (Home, Couples, Stepfamilies, Individuals, About, Fees, Contact, Privacy).
- `src/components/`: shared header, footer and logo symbols.
- `src/styles/global.css`: the B "Two Forms" brand styles.
- `wrangler.jsonc`: Cloudflare hosting settings (serves `dist/`, pages at `/about` with no trailing slash).
- `public/img/`: photos. `og.jpg` is the social sharing image.

## Before launch

- [ ] Set `bookingUrl` in `src/site.ts` to Rachel's Jane booking link (buttons currently go to /contact).
- [ ] Create a Formspree form and set `formEndpoint` in `src/site.ts`.
- [ ] Register the domain, add it as a Custom Domain on the `us-and-ours` Worker in Cloudflare, and update `site` in `astro.config.mjs` if it changes.
- [ ] Confirm credentials on the About page and the privacy policy wording with Rachel.
- [ ] Replace the office photo and map placeholders with real images.
