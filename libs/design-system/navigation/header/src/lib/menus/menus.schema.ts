import { z } from 'zod';

export type MenuItem = z.infer<typeof MenuItemSchema>;
export const MenuItemSchema = z.object({
  type: z.literal('item'),
  label: z.string(),
  url: z.string().url(), // Optional?
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

export type MenuSection = z.infer<typeof MenuSectionSchema>;
export const MenuSectionSchema = z.object({
  type: z.literal('section'),
  id: z.string(),
  label: z.string(),
  items: z.union([MenuGroupSchema, MenuDividerSchema]).array(),
});

export type Menus = z.infer<typeof MenusSchema>;
export const MenusSchema = z.object({
  sections: MenuSectionSchema.array(),
});

export default MenusSchema;
