const lint = 'npx nx affected:lint --fix --files';
const format = 'npx nx format:write --files';

export default {
  '*.{js,mjs,cjs,ts,mts,cts,html}': [lint, format],
  '*.{css,scss,md,json,yml,yaml}': format,
};
