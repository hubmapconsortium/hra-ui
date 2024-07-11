/** Production environment configuration. */
export const environment = {
  production: true,
  disableDbWorker: true,
  acceptableViewerDomains: ['https://portal.hubmapconsortium.org', 'https://portal.test.hubmapconsortium.org'],
  dbOptions: {
    dataSources: [
      'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@gh-pages/assets/kpmp/data/rui_locations.jsonld',
      'https://cdn.jsdelivr.net/gh/hubmapconsortium/ccf-ui@gh-pages/assets/sparc/data/rui_locations.jsonld',
    ],
    hubmapDataService: '',
    hubmapPortalUrl: '',
    hubmapDataUrl: '',
    hubmapAssetsUrl: '',

    useRemoteApi: false,
    remoteApiEndpoint: 'https://apps.humanatlas.io/hra-api/v1',
  },
  googleAnalyticsToken: window.location.hostname === 'portal.hubmapconsortium.org' ? 'G-1WRJHN9FM6' : 'G-J9HWV9QPJ4',
};
