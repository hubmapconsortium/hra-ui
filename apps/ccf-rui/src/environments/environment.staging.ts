/** Staging environment */
export const environment = {
  production: true,
  disableDbWorker: true,
  dbOptions: {},
  customization: {
    collisionsEndpoint: 'https://apps.humanatlas.io/api/v1/collisions',
    referenceData: 'https://apps.humanatlas.io/api/v1/rui-reference-data',
  },
  skipUnsavedChangesConfirmation: false,
  googleAnalyticsToken: 'G-ERNVZ1Q4KE',
};
