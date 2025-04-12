import { SvgIconNamespaceConfigSchema } from '@hra-ui/cdk/icons';
import { z } from 'zod';

// Reexport so the schema generator detects this as a recurring schema
export { SvgIconNamespaceConfigSchema };

/** Product logo id */
export type ProductLogoId = ProductLogo['id'];

/** Product logo data */
export type ProductLogo = z.infer<typeof ProductLogoSchema>;
/** Schema for product logo data */
export const ProductLogoSchema = z.object({
  id: z.string().brand<'ProductLogoId'>(),
  icon: z.string(),
});

/** Multiple product logos */
export type ProductLogos = z.infer<typeof ProductLogosSchema>;
/** Schema for multiple product logos */
export const ProductLogosSchema = z.object({
  $schema: z.string(),
  logos: ProductLogoSchema.array(),
  namespaceConfigs: SvgIconNamespaceConfigSchema.array(),
});

export default ProductLogosSchema;
