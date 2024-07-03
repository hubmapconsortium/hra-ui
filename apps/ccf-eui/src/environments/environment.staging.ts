/** Production environment configuration. */
export const environment = {
  production: true,
  disableDbWorker: true,
  acceptableViewerDomains: [
    'https://portal.hubmapconsortium.org',
    'https://portal.test.hubmapconsortium.org',
    'https://data.sennetconsortium.org',
  ],
  dbOptions: {
    ccfOwlUrl: 'https://apps.humanatlas.io/hra-api--staging/v1/ccf.owl.n3store.json',
    ccfContextUrl: 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
    token: localStorage.getItem('SESSION_TOKEN') ?? '',
    remoteApiEndpoint: 'https://apps.humanatlas.io/api',
  },
  customization: {
    theme: 'hubmap',
    header: true,
    homeUrl: 'https://portal.hubmapconsortium.org/',
    logoTooltip: 'Human BioMolecular Atlas Project',
  },
  googleAnalyticsToken: 'G-ERNVZ1Q4KE',
};
