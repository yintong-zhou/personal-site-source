# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Yintong Zhou, a software developer. It's a single-project Blazor WebAssembly
standalone app (.NET 8, `Microsoft.NET.Sdk.BlazorWebAssembly`) — client-side rendered, no backend API and
no database; all content lives in Razor components and static assets under `wwwroot`. It's deployed to
Cloudflare Pages, a static-file host, which is why the app must stay WASM/standalone rather than the
server-rendered Blazor Web App model (Cloudflare Pages cannot run an ASP.NET Core server process).

## Common commands

Run all commands from the repository root, targeting the project file directly (there's no top-level
Directory.Build.props or global.json).

```powershell
# restore
dotnet restore .\personal-site\personal-site.csproj

# run locally (http://localhost:5125, https://localhost:7074)
dotnet run --project .\personal-site\personal-site.csproj

# build
dotnet build .\personal-site\personal-site.csproj

# publish (also triggers static prerendering, see below)
dotnet publish .\personal-site\personal-site.csproj --configuration Release --output .\publish
```

The static site to deploy is `publish\wwwroot` (not `publish\` itself — that folder also holds
`web.config`/staticwebassets manifests that aren't part of the deployable site). On Cloudflare Pages, the
build output directory must point at `personal-site/bin/Release/net8.0/publish/wwwroot` (or wherever the
`--output` path resolves `wwwroot` under).

There are no automated tests, lint config, or CI workflows in this repo (`.github/workflows` is empty).

## Architecture

- `Program.cs` — `WebAssemblyHostBuilder`, mounting `App` at `#app` and `HeadOutlet` at `head::after`. No
  HttpClient/DI services are registered — add them here if a page ever needs one.
- `wwwroot/index.html` — the static HTML shell (head links, `<div id="app">`, script tags for
  `blazor.webassembly.js`, jQuery, Bootstrap, `site.js`). This is the entry point for local dev and the
  non-prerendered fallback; `App.razor` itself contains only the `<Router>`, not the html/head/body wrapper.
- `wwwroot/_redirects` — Cloudflare Pages SPA fallback (`/* /index.html 200`) so client-side routes resolve
  correctly for any path that isn't a physically prerendered file.
- **Static prerendering for SEO**: `BlazorWasmPreRendering.Build` (NuGet, wired into the `.csproj`) hooks the
  `dotnet publish` pipeline, spins up the app in-memory, and crawls it starting from `/` by following
  in-page links, saving a fully server-rendered `index.html` per discovered route (e.g. `about/index.html`,
  `privacy/index.html`, `cookie/index.html`) with the page's real content and its per-page `<title>`/meta
  tags already in the markup (before any WASM hydration). This means:
  - **Every internal route must be reachable via an in-page link from `/`** (nav/footer links), or the
    crawler won't find it and it won't get prerendered — there's no manual route list to maintain, but a
    page with no inbound link is invisible to this process.
  - **Link `href`s must match the page's own `@page` route casing exactly.** Cloudflare Pages serves static
    files case-sensitively, so a link written as `href="About"` while the page declares `@page "/about"`
    would prerender into `/About/index.html`, which does not match the `/about` canonical URL the page
    itself declares — the canonical URL would 404 to the generic homepage instead of the intended page. All
    routes/links/canonicals in this repo are lowercase by convention; keep new ones consistent.
  - `BlazorWasmPrerenderingDeleteLoadingContents` is set to `true` in the `.csproj` so the `Loading...`
    placeholder in `index.html` doesn't leak into the prerendered output.
- `Layout/MainLayout.razor` + `Layout/NavMenu.razor` — shared chrome (header/nav/footer) applied to all
  routed pages.
- `Pages/*.razor` — one file per route (`@page "/..."`), each a self-contained page: `Home.razor` (`/`),
  `About.razor` (`/about`), `Privacy.razor`, `Cookies.razor`. Pages set their own `<PageTitle>` and SEO/Open
  Graph `<HeadContent>` inline — follow that pattern (and the lowercase-route convention above) when adding
  new content rather than a shared metadata component.
- `Layout/Partials/AboutSummary.razor` and `AboutResume.razor` are **not currently used by any page** —
  `personal-site.csproj` explicitly excludes them from compilation (`<None Include=...>` /
  `<Content Remove=...>` for `Pages\AboutSummary.razor`) as leftovers from an earlier version of the About
  page. Don't assume they're live components; check actual usage with a repo-wide search before editing or
  removing them.
- `wwwroot/lib/*` (Bootstrap, Bootstrap Icons, jQuery, jQuery Validation) are vendored locally, not npm/CDN
  managed — there is no `package.json`. Site-specific styling is in `wwwroot/css/app.css`; the only custom
  script is `wwwroot/js/site.js`.
- Light/dark theme is a simple `data-bs-theme` attribute toggle on `<html>`, flipped client-side in
  `site.js`'s `ChangeColor()` — there's no persisted preference (no localStorage/cookie).
