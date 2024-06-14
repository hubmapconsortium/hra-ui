const lint = 'npx nx affected:lint --uncommited --fix true';
const format = 'npx nx format:write --uncommited';

export default {
  '*.{js,mjs,cjs,ts,html,scss,css}': [lint, format],
  '*.{md,json,yml,yaml}': format,
};
