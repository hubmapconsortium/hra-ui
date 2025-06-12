const lint = 'npx nx affected:lint --uncommitted --fix';
const format = 'npx nx format:write --uncommitted';

export default {
  // TODO add linting for css/scss
  '*.{js,mjs,cjs,ts,html}': [lint, format],
  '*.{md,json,yml,yaml}': format,
};
