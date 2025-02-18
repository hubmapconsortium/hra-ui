import HubmapMenuSchema from '../types/hubmap-menu.schema';
import MenusSchema from '../types/menus.schema';
import RAW_HUBMAP_MENU from './hubmap-menu.json';
import RAW_MENUS from './menus.json';

/** Parsed hubmap menu object */
export const HUBMAP_MENU = HubmapMenuSchema.parse(RAW_HUBMAP_MENU).groups;
/** Parsed menus object */
export const MENUS = MenusSchema.parse(RAW_MENUS).menus;
