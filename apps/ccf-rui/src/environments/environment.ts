// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  disableDbWorker: true,
  dbOptions: {},
  customization: {
    theme: 'default',
    collisionsEndpoint: 'https://apps.humanatlas.io/api/v1/collisions',
    referenceData: 'https://apps.humanatlas.io/api/v1/rui-reference-data',
  },
  skipUnsavedChangesConfirmation: true,
  googleAnalyticsToken: 'G-B3DT7XPMRT',
};
