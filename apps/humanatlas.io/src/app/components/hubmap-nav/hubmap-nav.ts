export interface HubmapNavItems {
  menuName: string;
  card?: AppCard[];
}

interface AppCard {
  icon?: string;
  title?: string;
  description?: string;
}
