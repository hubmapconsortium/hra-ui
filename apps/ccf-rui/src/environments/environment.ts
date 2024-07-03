// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  disableDbWorker: true,
  dbOptions: {
    ccfOwlUrl: 'https://ccf-ontology.hubmapconsortium.org/v2.1.0/ccf.owl',
    ccfContextUrl: 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld',
    hubmapDataService: 'search-api',
    hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
    hubmapDataUrl: '', // Do not query the search-api for spatial entities by default
    hubmapAssetsUrl: 'https://assets.hubmapconsortium.org',
    token: localStorage.getItem('SESSION_TOKEN') ?? '',
  },
  customization: {
    theme: 'default',
    header: true,
    homeUrl: 'https://portal.hubmapconsortium.org/',
    logoTooltip: 'Human BioMolecular Atlas Project',
    collisionsEndpoint: 'https://apps.humanatlas.io/api/v1/collisions',
    referenceData: 'https://apps.humanatlas.io/api/v1/rui-reference-data',
  },
  skipUnsavedChangesConfirmation: true,
  googleAnalyticsToken: 'G-B3DT7XPMRT',
};
