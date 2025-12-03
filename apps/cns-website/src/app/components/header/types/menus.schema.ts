import * as z from 'zod';

/** A menu item */
export type MenuItem = z.infer<typeof MenuItemSchema>;
/** Schema for a menu item */
export const MenuItemSchema = z
  .object({
    type: z.literal('item'),
    label: z.string(),
    url: z.string().url(),
    tagline: z.string().optional(),
    imgSrc: z.string().optional(),
    external: z.boolean().optional(),
    target: z.string().optional(),
  })
  .meta({ id: 'HeaderMenuItem' });

/** A menu group */
export type MenuGroup = z.infer<typeof MenuGroupSchema>;
/** Schema for a menu group */
export const MenuGroupSchema = z
  .object({
    type: z.literal('group'),
    label: z.string(),
    description: z.string().optional(),
    external: z.boolean().optional(),
    target: z.string().optional(),
    items: MenuItemSchema.array(),
  })
  .meta({ id: 'HeaderMenuGroup' });

/** A menu */
export type Menu = z.infer<typeof MenuSchema>;
/** Schema for a menu */
export const MenuSchema = z
  .object({
    type: z.literal('menu'),
    id: z.string(),
    label: z.string(),
    items: MenuGroupSchema.array().optional(),
    featured: MenuItemSchema.optional(),
  })
  .meta({ id: 'HeaderMenu' });

/** Multiple menus */
export type Menus = z.infer<typeof MenusSchema>;
/** Schema for multiple menus */
export const MenusSchema = z
  .object({
    $schema: z.string(),
    options: z.union([MenuSchema, MenuItemSchema]).array(),
  })
  .meta({ id: 'HeaderMenus' });

export default MenusSchema;
