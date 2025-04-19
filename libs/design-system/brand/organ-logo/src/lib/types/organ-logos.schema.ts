import { SvgIconNamespaceConfigSchema } from '@hra-ui/cdk/icons';
import { z } from 'zod';

/* Reexport so the schema generator detects this as a recurring schema */
export { SvgIconNamespaceConfigSchema };

/** Organ logo id */
export type OrganLogoId = OrganLogo['id'];

/** Organ logo data */
export type OrganLogo = z.infer<typeof OrganLogoSchema>;
/** Schema for organ logo data */
export const OrganLogoSchema = z.object({
  id: z.string().brand<'OrganLogoId'>(),
  icon: z.string(),
});

/** Multiple organ logos */
export type OrganLogos = z.infer<typeof OrganLogosSchema>;
/** Schema for multiple organ logos */
export const OrganLogosSchema = z.object({
  $schema: z.string(),
  logos: OrganLogoSchema.array(),
  namespaceConfigs: SvgIconNamespaceConfigSchema.array(),
});

export default OrganLogosSchema;
