import { UseButton } from '../use-button/use-button';

/** An interface representing the details of the image card */
export interface ImageData {
  /** Title of the image card */
  title: string;
  /** Description of the image card */
  description: string;
  /** Path to the image inside the card */
  image: string;
  /** Path to the image in the modal */
  imageDialog: string;
  /** Alternate text for the image in the card */
  alt: string;
}

/** An interface representing the details of the header of custom card */
export interface CardHeader {
  /** Title of the image card */
  title: string;
  /** Label and URL for the button */
  buttonData: UseButton;
  /** Subtitle for the image card */
  subtitle: string;
}
