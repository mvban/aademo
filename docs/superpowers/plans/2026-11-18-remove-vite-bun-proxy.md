# Remove Vite and Use Bun Proxy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Vite and make `bun run start` proxy the hosted Cloudflare Pages app while keeping `bun run build` deployable.

**Architecture:** A Bun build script copies `src/` to `dist/`. A Bun HTTP server forwards local requests to `https://capacitor-app-2kb.pages.dev/`, preserving request methods, headers, and bodies. Cloudflare and Android workflows continue consuming `dist/`.

**Tech Stack:** Bun, TypeScript, Cloudflare Pages.

**Spec:** `docs/superpowers/specs/2026-11-18-remove-vite-bun-proxy-design.md`

## Global Constraints

- Local upstream: `https://capacitor-app-2kb.pages.dev/`.
- Build output: `dist/`.
- Start command: `bun run start`.
- Vite must be removed from dependencies and configuration.

## Review Focus

- Build output must not retain stale files from an earlier Vite build.
- Proxy paths, query strings, methods, and request bodies must reach the Pages origin.
- Proxy must return upstream status and headers, including redirects.
- The server must be configurable by `PORT` and default to `3000`.

### Task 1: Replace Vite with Bun build and proxy scripts

**Files:**
- Create: `scripts/build.ts`
- Create: `scripts/start.ts`
- Delete: `vite.config.ts`
- Modify: `package.json`
- Modify: `bun.lock`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `bun run build` copies `src/` contents into a clean `dist/`.
- Produces: `bun run start` listens on `PORT` or `3000` and proxies to the Pages origin.

- [ ] **Step 1: Implement clean static copy build**

Use Bun filesystem APIs to remove and recreate `dist/`, then recursively copy `src/` to `dist/`.

- [ ] **Step 2: Implement the Bun reverse proxy**

Use `Bun.serve` and `fetch` against the fixed Pages origin plus the incoming path/query, forwarding method, headers, and body; expose `PORT` with default `3000`.

- [ ] **Step 3: Update scripts and remove Vite**

Set `start` to `bun scripts/start.ts`, `build` to `bun scripts/build.ts`, remove the Vite `preview` script and dependency, and remove `vite.config.ts`.

- [ ] **Step 4: Verify build and proxy behavior**

Run: `bun run build && test -f dist/index.html && ! test -f dist/src/index.html`

Expected: exit 0, with `dist/index.html` present and no nested `dist/src` directory.

Run: `PORT=0 bun run start`

Expected: the server starts using Bun without a TypeScript/runtime error (stop it after startup).

### Task 2: Update project documentation

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: `bun run start` and `bun run build` from Task 1.

- [ ] **Step 1: Document Bun commands**

Explain that `bun run start` proxies the deployed Pages site and `bun run build` copies `src/` to `dist/` for Cloudflare Pages.

- [ ] **Step 2: Verify references and dependency removal**

Run: `rg -n "bun run start|bun run build|capacitor-app-2kb.pages.dev|vite|dist" README.md package.json scripts wrangler.toml capacitor.config.json`

Expected: Bun/proxy/build references exist, and Vite appears nowhere in active project configuration or dependencies.
