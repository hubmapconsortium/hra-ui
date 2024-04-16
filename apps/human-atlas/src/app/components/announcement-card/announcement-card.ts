/** An interface representing announcement information to be displayed inside the card */
export interface Announcement {
  /** Message of the announcement */
  message: string;
  /** Route of the page to navigate to when clicked */
  route?: string;
  /** Label for the route */
  routeText?: string;
  /** Emoji to display with announcement */
  emoji?: string;
}
