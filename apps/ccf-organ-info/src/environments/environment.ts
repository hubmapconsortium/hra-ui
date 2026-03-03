/** Testing environment configuration. */
export const environment = {
  production: false,
  disableDbWorker: true,
  acceptableViewerDomains: ['https://portal.hubmapconsortium.org', 'https://portal.test.hubmapconsortium.org'],
  dbOptions: {
    remoteApiEndpoint: 'https://apps.humanatlas.io/api',
  },
};
