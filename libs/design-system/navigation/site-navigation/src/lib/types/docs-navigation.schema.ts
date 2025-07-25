import { z } from 'zod';

/** Docs Navigation Item */
export type DocsNavigationItem = z.infer<typeof DocsNavigationItemSchema>;

/** Docs Navigation Item Schema */
export const DocsNavigationItemSchema = z.object({
  type: z.literal('item'),
  label: z.string(),
  icon: z.string().optional(),
  url: z.string(),
});

/** Docs Navigation Category */
export type DocsNavigationCategory = z.infer<typeof DocsNavigationCategorySchema>;

/** Docs Navigation Category Schema */
export const DocsNavigationCategorySchema = z.object({
  type: z.literal('category').optional(),
  label: z.string(),
  icon: z.string(),
  children: z.array(DocsNavigationItemSchema),
});

/** Docs Menu Items Array Type */
export type DocsMenuItems = z.infer<typeof DocsMenuItemsSchema>;

/** Docs Menu Items Array Schema */
export const DocsMenuItemsSchema = z.array(z.union([DocsNavigationCategorySchema, DocsNavigationItemSchema]));

/** Docs Navigation Menu */
export type DocsNavigationMenu = z.infer<typeof DocsNavigationMenuSchema>;

/** Docs Navigation Menu Schema */
export const DocsNavigationMenuSchema = z.object({
  $schema: z.string(),
  menuItems: DocsMenuItemsSchema,
});

export default DocsNavigationMenuSchema;
