import { z } from 'zod';

/** Svg icon namespace configuration */
export type SvgIconNamespaceConfig = z.infer<typeof SvgIconNamespaceConfigSchema>;

/** Schema for svg icon namespace configuration */
export const SvgIconNamespaceConfigSchema = z.object({
  namespace: z.string(),
  directory: z.string(),
});
