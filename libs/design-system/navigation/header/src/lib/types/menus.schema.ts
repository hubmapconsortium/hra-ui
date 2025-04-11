import { z } from 'zod';

/** A menu item */
export type MenuItem = z.infer<typeof MenuItemSchema>;
/** Schema for a menu item */
export const MenuItemSchema = z.object({
  type: z.literal('item'),
  label: z.string(),
  url: z.string().url(),
  target: z.string().optional(),
});

/** A menu divider */
export type MenuDivider = z.infer<typeof MenuDividerSchema>;
/** Schema for a menu divider */
export const MenuDividerSchema = z.object({
  type: z.literal('divider'),
});

/** A menu subgroup */
export type MenuSubGroup = z.infer<typeof MenuSubGroupSchema>;
/** Schema for a menu subgroup */
export const MenuSubGroupSchema = z.object({
  type: z.literal('subgroup'),
  label: z.string(),
  items: MenuItemSchema.array(),
});

/** A menu group */
export type MenuGroup = z.infer<typeof MenuGroupSchema>;
/** Schema for a menu group */
export const MenuGroupSchema = z.object({
  type: z.literal('group'),
  label: z.string(),
  description: z.string().optional(),
  url: z.string().url(),
  target: z.string().optional(),
  items: z.union([MenuSubGroupSchema, MenuItemSchema]).array().optional(),
});

/** A menu */
export type Menu = z.infer<typeof MenuSchema>;
/** Schema for a menu */
export const MenuSchema = z.object({
  type: z.literal('menu'),
  id: z.string(),
  label: z.string(),
  items: z.union([MenuGroupSchema, MenuDividerSchema]).array(),
});

/** Multiple menus */
export type Menus = z.infer<typeof MenusSchema>;
/** Schema for multiple menus */
export const MenusSchema = z.object({
  $schema: z.string(),
  menus: MenuSchema.array(),
});

export default MenusSchema;
