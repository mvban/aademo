# Remove Vite and Use Bun Proxy Design

## Intent

Make local development simple: `bun run start` should serve a local address
that reverse-proxies the existing Cloudflare Pages site at
`https://capacitor-app-2kb.pages.dev/`.

## Goals

- Remove Vite and its configuration from the project.
- Use Bun's built-in HTTP server for the local reverse proxy.
- Keep `bun run build` producing a deployable `dist/` directory.
- Preserve the existing relative static asset paths when copying `src/`.
- Keep Cloudflare deploy and Android workflow commands compatible.

## Non-goals

- Rebuilding or transforming the hosted Pages app locally.
- Adding a frontend dev server or hot-module reload.
- Changing the remote Pages deployment itself.

## Approach

Replace Vite with two small Bun scripts: one recursively copies `src/` to a
fresh `dist/` directory for static deployment, and one uses `Bun.serve` to
forward local requests to the Pages origin. The proxy forwards method, headers,
and request body, while returning the remote response to the browser.

## Implementation

- Add `scripts/build.ts` for the copy-based build.
- Add `scripts/start.ts` for the local reverse proxy with a configurable port.
- Update npm scripts and remove Vite dependencies/configuration.
- Refresh README instructions to describe Bun-based start/build behavior.
