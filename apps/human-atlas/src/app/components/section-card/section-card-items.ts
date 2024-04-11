/** An interface representing the details of the card */
export interface SectionCardItems {
  /** Title of the card */
  title: string;
  /** Description of the card */
  description: string;
  /** Path to the image of the card */
  image: string;
  /** Path to the GIF file of the card */
  gif: string;
  /** Route of the page to redirect when the card is clicked */
  route: string;
}
