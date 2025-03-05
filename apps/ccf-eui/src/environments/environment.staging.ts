/** Production environment configuration. */
export const environment = {
  production: true,
  acceptableViewerDomains: [
    'https://portal.hubmapconsortium.org',
    'https://portal.test.hubmapconsortium.org',
    'https://data.sennetconsortium.org',
  ],
  dbOptions: {
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
