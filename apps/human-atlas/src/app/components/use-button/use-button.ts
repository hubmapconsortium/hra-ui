/** An interface representing the details of the button */
export interface UseButton {
  /** Label on the button */
  text: string;
  /** URL for the page to redirect to when button is clicked */
  url?: string;
  /** Route for the page to redirect to when button is clicked */
  route?: string;
  /** Icon name of the icon to be displayed on the button */
  icon?: string;
}
