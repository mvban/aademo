# Cloudflare Pages Deployment Design

## Intent

Publish the Vite build output in `dist/` to the Cloudflare Pages project
`capacitor-app` using Wrangler CLI.

## Goals

- Keep Vite's existing `dist/` output unchanged.
- Provide a repeatable production deployment command.
- Provide a preview deployment command for non-production testing.
- Make the required Cloudflare project name and build directory explicit.

## Non-goals

- Creating or managing Cloudflare API tokens.
- Changing the app's Vite or Capacitor behavior.
- Configuring Cloudflare Workers, Functions, redirects, or custom domains.

## Approach

Use Wrangler Pages direct deployment. Add `wrangler.toml` with the Pages
project name and compatibility date, and add package scripts that build first
and then run `wrangler pages deploy dist`. This is preferable to dashboard-only
Git integration because the upload target and deployment workflow remain in the
repository and can run locally or in CI.

## Implementation

- Add Wrangler as a development dependency.
- Add `deploy` to run `npm run build` followed by the production Pages upload.
- Add `deploy:preview` to build and upload a named preview deployment.
- Document authentication and first-time project setup in `README.md`.

## Builder decisions

- Use `npx wrangler` through npm scripts so the repository's pinned Wrangler
  version is used.
- Use `wrangler.toml` rather than dashboard-only settings so the project name
  is reviewable and reproducible.
