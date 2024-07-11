/** Production environment configuration. */
export const environment = {
  production: true,
  disableDbWorker: true,
  acceptableViewerDomains: ['https://portal.hubmapconsortium.org', 'https://portal.test.hubmapconsortium.org'],
  dbOptions: {
    dataSources: [
      'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@staging/assets/kpmp/data/rui_locations.jsonld',
      'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@staging/assets/sparc/data/rui_locations.jsonld',
    ],
    hubmapDataService: '',
    hubmapPortalUrl: '',
    hubmapDataUrl: '',
    hubmapAssetsUrl: '',

    useRemoteApi: false,
    remoteApiEndpoint: 'https://apps.humanatlas.io/hra-api--staging/v1',
  },
  googleAnalyticsToken: 'G-ERNVZ1Q4KE',
};
