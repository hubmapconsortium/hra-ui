const lint = 'eslint --fix';
const format = 'prettier --write';

export default {
  '*.{js,mjs,cjs,ts,mts,cts,html}': [lint, format],
  '*.{css,scss,md,json,yml,yaml}': format,
};
