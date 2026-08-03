# Repository instructions

- Do not install, remove, or upgrade dependencies unless the user explicitly asks for that dependency change.
- Do not run dependency installation commands, including `npm install`, `npm ci`, `yarn install`, or `pnpm install`, without that explicit request.
- If a task appears to require a dependency change, explain why and ask the user before modifying a package manifest or lockfile.
