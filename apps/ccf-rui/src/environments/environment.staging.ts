export const environment = {
  production: true,
  disableDbWorker: true,
  dbOptions: {
    ccfOwlUrl: 'https://ccf-ontology.hubmapconsortium.org/v2.1.0/ccf.owl',
    ccfContextUrl: 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: '', // Do not query the search-api for spatial entities by default
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    hubmapToken: localStorage.getItem('HUBMAP_TOKEN') ?? '',
  },
  customization: {
    theme: 'hubmap',
    header: true,
    homeUrl: 'https://portal.hubmapconsortium.org/',
    logoTooltip: 'Human BioMolecular Atlas Project',
    collisionsEndpoint: 'https://apps.humanatlas.io/api/v1/collisions',
    referenceData: 'https://apps.humanatlas.io/api/v1/rui-reference-data',
  },
  skipUnsavedChangesConfirmation: false,
  googleAnalyticsToken: 'G-ERNVZ1Q4KE',
};
