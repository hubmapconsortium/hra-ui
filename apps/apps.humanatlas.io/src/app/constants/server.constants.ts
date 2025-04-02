import { Server } from '../interfaces';

/**
    HRA-API server options for dropdown
    This object contains the API endpoint URL and
    the corresponding OpenAPI spec URLs for use in the
    API page.

    id: server identifier
    description: server description
    url: API endpoint URL
    spec: OpenAPI spec URL
 */
export const servers: Server[] = [
  /* production server */
  {
    id: 'prod',
    description: 'HRA-API Production',
    url: 'https://apps.humanatlas.io/api',
    spec: 'https://apps.humanatlas.io/api/hra-api-spec.yaml',
  },
  /* staging server */
  {
    id: 'staging',
    description: 'HRA-API Staging',
    url: 'https://apps.humanatlas.io/api--staging',
    spec: 'https://apps.humanatlas.io/api--staging/hra-api-spec.yaml',
  },
  /* CCF-API (deprecated) */
  {
    id: 'ccf-api',
    description: 'CCF-API (deprecated) Production',
    url: 'https://apps.humanatlas.io/hra-api/v1',
    spec: 'https://apps.humanatlas.io/hra-api/ccf-api-spec.yaml',
  },
  /* HRA-API SPARQL Queries */
  {
    id: 'sparql',
    description: 'HRA-API SPARQL Queries',
    url: 'https://grlc.io/api-git/hubmapconsortium/ccf-grlc/subdir',
    spec: 'https://apps.humanatlas.io/api/grlc/index-spec.json',
  },
  /* HRA-API SPARQL Queries (HRA) */
  {
    id: 'sparql-hra',
    description: 'HRA-API SPARQL Queries',
    url: 'https://grlc.io/api-git/hubmapconsortium/ccf-grlc/subdir/hra/',
    spec: 'https://apps.humanatlas.io/api/grlc/hra-spec.json',
  },
];
