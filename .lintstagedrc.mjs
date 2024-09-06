const lint = 'npx nx affected:lint --fix true';
const format = 'npx nx format:write --uncommitted';

export default {
  '*.{js,mjs,cjs,ts,html,scss,css}': [lint, format],
  '*.{md,json,yml,yaml}': format,
};
