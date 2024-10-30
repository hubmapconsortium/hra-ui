export default function disableCodeSplitting(_options) {
  return {
    name: 'disable-code-splitting',
    setup(build) {
      build.initialOptions.splitting = false;
    },
  };
}
