import { HubmapMenuGroup } from '../types/hubmap-menu.schema';
import { Menu } from '../types/menus.schema';
import { groups } from './hubmap-menu.json';
import { menus } from './menus.json';

/** Hubmap menu objects */
export const HUBMAP_MENU = groups as HubmapMenuGroup[];
/** Menus objects */
export const MENUS = menus as Menu[];
