/**
 * Interface for servers used in HRA-API page.
 */
export interface Server {
  /* endpoint id */
  id: string;
  /* server description */
  description: string;
  /* server name */
  url: string;
  /* OpenAPI spec url */
  spec: string;
}
