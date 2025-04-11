import { SvgIconNamespaceConfigSchema } from '@hra-ui/cdk/icons';
import { z } from 'zod';

/* Reexport so the schema generator detects this as a recurring schema */
export { SvgIconNamespaceConfigSchema };

/** Category logo id */
export type CategoryLogoId = CategoryLogo['id'];

/** Category logo data */
export type CategoryLogo = z.infer<typeof CategoryLogoSchema>;
/** Schema for category logo data */
export const CategoryLogoSchema = z.object({
  id: z.string().brand<'CategoryLogoId'>(),
  icon: z.string(),
});

/** Multiple category logos */
export type CategoryLogos = z.infer<typeof CategoryLogosSchema>;
/** Schema for multiple category logos */
export const CategoryLogosSchema = z.object({
  $schema: z.string(),
  logos: CategoryLogoSchema.array(),
  namespaceConfigs: SvgIconNamespaceConfigSchema.array(),
});

export default CategoryLogosSchema;
