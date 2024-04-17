/** An interface representing the details of the links */
export interface SopLinks {
  /** Title of the list of link(s) */
  sopTitle: string;
  /** Label and URL of the link(s) */
  href: Links[];
}

/** An interface representing the label and URL of the links */
interface Links {
  /** Label for the link */
  title: string;
  /** URL for the link */
  href: string;
}
