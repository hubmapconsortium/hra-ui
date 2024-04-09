/** An interface representing the page definitions */
export interface PageDef {
  /** Type of the page element */
  type: string;
  /** Details of the page element */
  [key: string]: any;
}
