/** An interface representing the carousel slide details */
export interface SliderItems {
  /** Title of the slide */
  title: string;
  /** Description of the slide */
  body: string;
  /** Path to the image of the slide  */
  image: string;
  /** URL for the button on the slide */
  url?: string;
  /** Route for the button on the slide */
  route?: string;
  /** Label for the buttton on the slide*/
  buttonText: string;
  /** Alternate text for the image of the slide */
  alt: string;
}
