import { z } from 'zod';

export type HubmapMenuItem = z.infer<typeof HubmapMenuItemSchema>;
export const HubmapMenuItemSchema = z.object({
  label: z.string(),
  description: z.string(),
  icon: z.string(),
  url: z.string().url(),
});

export type HubmapMenuGroup = z.infer<typeof HubmapMenuGroupSchema>;
export const HubmapMenuGroupSchema = z.object({
  label: z.string(),
  items: HubmapMenuItemSchema.array(),
});

export type HubmapMenu = z.infer<typeof HubmapMenuSchema>;
export const HubmapMenuSchema = z.object({
  $schema: z.string(),
  groups: HubmapMenuGroupSchema.array(),
});

export default HubmapMenuSchema;
