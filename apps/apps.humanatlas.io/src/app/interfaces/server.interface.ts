/**
 * Interface for servers used in HRA-API page.
 *
 * id: server identifier
 * description: server description
 * url: API endpoint URL
 * spec: OpenAPI spec URL
 */
export interface Server {
  /**
   * server endpoint id - to identify the server uniquely
   */
  id: string;
  /**
   * server description - short description
   */
  description: string;
  /**
   * API endpoint URL - to which requests are sent to
   */
  url: string;
  /**
   * OpenAPI spec url - from where the request/response schema is obtained
   */
  spec: string;
}
