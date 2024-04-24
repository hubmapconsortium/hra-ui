/** An interface representing the details to be displayed inside the card */
export interface LongCard {
  /** Path to the icon of the card */
  icon: string;
  /** Title inside the card */
  title: string;
  /** URL to be redirected to when clicked */
  externalLink?: string;
  /** Description of the card */
  body: string;
  /** Route to be redirected to when card is clicked */
  route?: string;
  /** Background color of the icon of the card */
  color?: string;
  /** Alternate text for the icon of the card */
  alt: string;
}

/** An interface representing heading and LongCard details */
export interface CardBlock {
  /** Heading of the card(s) */
  heading: string;
  /** Card details of the card(s) */
  cardData: LongCard[];
  /** Font size of the heading of the card */
  headerSize?: string;
  /** Element id of the heading of the card */
  id?: string;
}
