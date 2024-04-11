/** An interface representing the contact details of a person */
export interface ContactCard {
  /** Work field of the person */
  field: string;
  /** Name of the person */
  name: string;
  /** Role/Position of the person */
  role: string;
  /** Email of the person */
  email: string;
  /** Path to the image of the person */
  image: string;
  /** Alternate text for the image of the person */
  alt: string;
}
