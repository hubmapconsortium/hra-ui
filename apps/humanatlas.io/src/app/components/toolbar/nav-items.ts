/** An interface representing the details of navigation items */
export interface NavItems {
  /** Label for the menu name */
  menuName: string;
  /** Flag to enable/disable menu item */
  disabled?: boolean;
  /** Route of the page to be redirected to when clicked on menu item */
  route?: string;
  /** Children of the menu item */
  children?: NavItems[];
  /** Flag to view/hide the divider between menu items */
  divider?: boolean;
  /** URL of the page to redirect to when clicked on menu item */
  url?: string;
  /** ID of an element for the page to be navigated when clicked on the menu item */
  id?: string;
  /** ID of an element for the page to be navigated when clicked on the menu item */
  fragment?: string;
  /** Name of the component to be embedded */
  componentName?: string;
}
