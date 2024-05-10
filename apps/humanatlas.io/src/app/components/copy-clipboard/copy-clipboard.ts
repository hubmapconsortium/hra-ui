/** An interface representing the details of API url and buttons */
export interface CopyClipBoard {
  /** API url to be displayed in the card */
  url: string;
  /** Details of the plain button */
  plainButton: PlainButton;
  /** Details of the dynamic button */
  dynamicButton: ExternalButton;
  /** Border color for the card */
  borderColor: string;
}

/** An interface representing the details of plain button */
interface PlainButton {
  /** Icon name for the plain button */
  icon: string;
  /** Text for the plain button */
  label: string;
}

/** An interface representing the details of button with external URL */
interface ExternalButton {
  /** Text for the button */
  label: string;
  /** External URL for the button */
  url: string;
}
