# Matthew Deng Portfolio

My engineering portfolio, built with Next.js, React, TypeScript, and Tailwind CSS. The site covers my work in semiconductor packaging, materials processing, laboratory automation, robotics, and composite manufacturing.

## Local setup

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Checks

Run both checks before deploying:

```bash
npm run lint
npm run build
```

## Deployment

The site is deployed through Vercel at `matthew-deng-portfolio.vercel.app`. Pushing the deployment branch to GitHub triggers the normal Vercel build.

## Editing the site

- Project summaries, metrics, images, and case-study text live in `data/projects.ts`.
- Site identity, contact links, and the production URL live in `data/site.ts`.
- Project images and documents live under `public/assets`.
- `public/assets/README.md` lists the assets currently used by the site.

The résumé links intentionally open a prefilled email request. The site does not expose a public résumé PDF.

Technical results are kept within their supported scope. Proprietary Innolot coefficients, fit parameters, and prediction outputs are not included in the public case study.
