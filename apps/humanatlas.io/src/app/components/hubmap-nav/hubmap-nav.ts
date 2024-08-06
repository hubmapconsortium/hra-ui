/** Interface for HuBMAP Nav Items */
export interface HubmapNavItems {
  /** Name of the menu */
  menuName: string;
  /** Card details */
  card?: AppCard[];
}

/** Interface for card in the hubmap nav menu */
interface AppCard {
  /** Url to the icon */
  icon?: string;
  /** Title of the card */
  title?: string;
  /** Description of the card */
  description?: string;
  /** External URL for the card */
  url?: string;
}
