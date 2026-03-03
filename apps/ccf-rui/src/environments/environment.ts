/** Development environment */
export const environment = {
  production: false,
  disableDbWorker: true,
  dbOptions: {},
  customization: {
    collisionsEndpoint: 'https://apps.humanatlas.io/api--staging/v1/collisions',
    referenceData: 'https://apps.humanatlas.io/api--staging/v1/rui-reference-data',
  },
  skipUnsavedChangesConfirmation: true,
};
