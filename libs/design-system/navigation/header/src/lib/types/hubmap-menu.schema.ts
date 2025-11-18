import { z } from 'zod';

/** A hubmap menu item */
export type HubmapMenuItem = z.infer<typeof HubmapMenuItemSchema>;
/** Schema for a hubmap menu item */
export const HubmapMenuItemSchema = z.object({
  label: z.string(),
  description: z.string(),
  icon: z.string(),
  url: z.string().url(),
});

/** A hubmap menu group */
export type HubmapMenuGroup = z.infer<typeof HubmapMenuGroupSchema>;
/** Schema for a hubmap menu group */
export const HubmapMenuGroupSchema = z.object({
  label: z.string(),
  items: HubmapMenuItemSchema.array(),
});

/** A hubmap menu */
export type HubmapMenu = z.infer<typeof HubmapMenuSchema>;
/** Schema for a humbap menu */
export const HubmapMenuSchema = z.object({
  $schema: z.string(),
  groups: HubmapMenuGroupSchema.array(),
});

export default HubmapMenuSchema;
