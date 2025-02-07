import { z } from 'zod';

export type MenuItem = z.infer<typeof MenuItemSchema>;
export const MenuItemSchema = z.object({
  type: z.literal('item'),
  label: z.string(),
  url: z.string().url(),
});

export type MenuDivider = z.infer<typeof MenuDividerSchema>;
export const MenuDividerSchema = z.object({
  type: z.literal('divider'),
});

export type MenuSubGroup = z.infer<typeof MenuSubGroupSchema>;
export const MenuSubGroupSchema = z.object({
  type: z.literal('subgroup'),
  label: z.string(),
  items: MenuItemSchema.array(),
});

export type MenuGroup = z.infer<typeof MenuGroupSchema>;
export const MenuGroupSchema = z.object({
  type: z.literal('group'),
  label: z.string(),
  description: z.string().optional(),
  url: z.string().url(),
  items: z.union([MenuSubGroupSchema, MenuItemSchema]).array().optional(),
});

export type Menu = z.infer<typeof MenuSchema>;
export const MenuSchema = z.object({
  type: z.literal('menu'),
  id: z.string(),
  label: z.string(),
  items: z.union([MenuGroupSchema, MenuDividerSchema]).array(),
});

export type Menus = z.infer<typeof MenusSchema>;
export const MenusSchema = z.object({
  $schema: z.string(),
  menus: MenuSchema.array(),
});

export default MenusSchema;
