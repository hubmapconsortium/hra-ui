/** An interface representing the details of the prize card */
export interface PrizeCard {
  /** Title of the card */
  title: string;
  /** Name of the presenter */
  presentedBy?: string;
  /** Path to the image of the organization */
  orgImage?: string;
  /** Details of the winner(s) */
  winner: Winner[];
  /** Details of the image(s) of the user(s) */
  userImage?: UserImage[];
  /** Flag to display the divider below presenters */
  matDivider: boolean;
  /** Alternate text for the organization image */
  alt: string;
}

/** An interface representing the details of the button */
export interface Button {
  /** Label for the button */
  label: string;
  /** URL for the button */
  link: string;
}

/** An interface representing the details of the Prize Winner */
export interface Winner {
  /** Name of the winner */
  winner: string;
  /** Kaggle ID of the winner(s) */
  kaggleId?: string;
  /** Details of the Solution/Presentation button(s) */
  button?: Button[];
}

/** An interface representing the details of the user image */
interface UserImage {
  /** Path to the image of the user */
  image: string;
  /** Alternate text for the image of the user */
  alt: string;
}
