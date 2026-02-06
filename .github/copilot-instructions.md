Purpose: Short, actionable guidance for AI coding agents working in this monorepo.

Overview

- This repository is an Nx monorepo containing many Angular apps (under `apps/`) and shared libraries (under `libs/`). Most apps are Angular 20 projects built with the `@nx/angular` plugin.
- Key patterns: generator defaults use `standalone: true`, `changeDetection: OnPush`, and `style: scss` (see `nx.json` "generators").

Quick commands

- Install dependencies: `npm install` at repo root.
- Serve an app locally: `npx nx run <app-name>:serve` or `nx serve <app-name>` (example: `npx nx run cde-ui:serve`).
- Build an app: `npx nx build <app-name>` (targets use configurations from `nx.json`).
- Run tests: `npx nx test <project>`; CI config uses `nx test --configuration=ci` when present.
- Storybook: `npx nx run <project>:storybook` (port defaults to 4400 per `nx.json`).

Architecture notes (what matters)

- Apps are self-contained Angular applications under `apps/`. Shared UI and logic live in `libs/` (e.g., `libs/design-system`, `libs/ccf-shared`).
- Build defaults and base paths are configured in `nx.json` target defaults. Production `baseHref` is `/ui/{projectName}/` — assume asset paths follow this base in production.
- Web components / WC builds: there is a `build-webcomponent` target; some apps produce a single `wc.js` in `dist/.../browser/wc.js`.
- Custom tool/plugin points: `tools/esbuild-plugins/disable-code-splitting.mjs` and the custom Nx plugin `@hra-ui/zod-to-json-schema` are used in build flows — inspect `tools/` when modifying build behavior.

Developer conventions and patterns to follow

- Change detection: components are always `OnPush` and always `standalone`. Prefer isolated, pure inputs and immutable patterns using Angular signals.
- Styles: global include paths reference `libs/design-system/styles` (see `targetDefaults` in `nx.json`). Use SCSS and the shared tokens.
- Libraries: follow existing naming and export patterns in `libs/`; prefer adding small reusable components to `libs/design-system` rather than app-specific copies.
- Deprecated libraries: **Do not reference these in new code** — `libs/ccf-shared`, `libs/ftu-ui-components`, and `libs/shared/utils` are deprecated and planned for removal. If equivalent functionality is needed, prefer `libs/design-system`, create a focused `libs/<new-lib>` or ask maintainers for guidance.
- Tests: Jest is used across the workspace (see root `jest.config.ts` and per-project configs). Many projects set `passWithNoTests: true` in `nx.json` so run specific project tests rather than relying on a global run.
- Use `@testing-library/angular` for unit tests: import and use `render()` from `@testing-library/angular` and assert via DOM queries (e.g., `screen.getByText`) instead of accessing the Angular `fixture` or component internals from the rendered result. This keeps tests resilient and aligned with existing project patterns.
- Test setup helpers: When tests require repeated, large `render(...)` blocks (lots of `providers`, `imports`, `declarations`, or common stubs), factor them into a `setup()` helper function that returns the `render` result and common helpers (for example: `{ renderResult, screen, user }`). Keep the helper in the test file to make test files concise and maintainable.
- Test constants: Move repeated constants (mock data, test fixtures, shared values) to the describe block level to reduce duplication across individual test cases. This improves maintainability and makes test data more visible and reusable.
- Zod imports: Always import zod using `import * as z from 'zod';` — this ensures zod imports are tree shakeable.

Integration and external dependencies

- Backend / API client: projects import `@hra-api/ng-client` to communicate with HRA APIs. When adding or updating API usage, check `libs/` for shared wrappers.
- Large visualization libs: `deck.gl`, `three`, and `@google/model-viewer` are used in visualization apps — be mindful of bundle size and the `disable-code-splitting` plugin.
- CI and code quality: CI references `.github/workflows/ci.yml` (also referenced as `sharedGlobals` in `nx.json`) and SonarCloud badges in the README — keep changes test-covered and linted.

Where to look first (useful files)

- `nx.json` — target defaults, build configurations, generator defaults.
- `package.json` — dependency matrix and dev tooling (nx, jest, storybook, husky).
- `apps/<app>/project.json` — app-specific build/serve/test targets and options.
- `libs/design-system` and `libs/ccf-shared` — canonical UI patterns and shared utilities.
- `tools/` — custom build plugins and scripts that change bundling behavior.

When making changes

- Prefer small, focused changes that update the library under `libs/` and then wire the app `project.json` to use it.
- Update `project.json` and `tsconfig.*.json` only for the specific project unless a workspace-wide change is required.
- Run the same Nx target you changed locally to verify (e.g., `npx nx build <project> --configuration=development`).

Examples (templates for common tasks)

- Serve app: `npx nx run cde-ui:serve` — used for local debugging of `cde-ui`.
- Build for production: `npx nx build cde-ui --configuration=production` — consult `nx.json` for `baseHref` behavior.

If something isn't discoverable

- Open `apps/<app>/project.json` and `libs/<lib>/project.json` — targets and custom executors live there.
- Ask the repo maintainers for infra details (deploy targets and environment values) if CI-only configs are referenced but not present locally.

Feedback

- If anything here is unclear or you need deeper details (CI, deployment, or specific app boot sequences), ask and I will expand this file with concrete examples and links.
