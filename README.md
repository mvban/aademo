## Created with Capacitor Create App

This app was created using [`@capacitor/create-app`](https://github.com/ionic-team/create-capacitor-app),
and comes with a very minimal shell for building an app.

### Running this example

The local start command proxies the deployed Cloudflare Pages site, so no
frontend dev server or local build is needed:

```bash
bun run start
```

To create the static files used by Cloudflare Pages or Capacitor:

```bash
bun run build
```

The build copies `src/` into `dist/`.

GitHub Actions builds a public-safe debug APK on every push, pull request, or
manual workflow run. Download `capacitor-app-debug-apk` from the workflow's
artifacts; no signing secrets are required.

### Deploying to Cloudflare Pages

This project deploys the static build output in `dist/` to the Cloudflare Pages
project `capacitor-app` using Wrangler.

Authenticate Wrangler once on your machine:

```bash
npx wrangler login
```

Deploy the production build:

```bash
npm run deploy
```

Create a preview deployment on a named branch:

```bash
npm run deploy:preview -- --branch=staging
```

Both deployment commands build the app before uploading `dist/`. The Pages
project must exist in the Cloudflare account used by `wrangler login`; if it
does not, create a Pages project named `capacitor-app` first or let the first
deployment create it when prompted.
