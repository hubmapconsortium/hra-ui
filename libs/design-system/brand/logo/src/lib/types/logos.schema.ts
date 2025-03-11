import { z } from 'zod';

/** Logo size */
export type BrandLogoSize = z.infer<typeof BrandLogoSizeSchema>;
/** Schema for logo size */
export const BrandLogoSizeSchema = z.enum(['small', 'regular']);

/** Logo item */
export type BrandLogo = z.infer<typeof BrandLogoSchema>;
/** Schema for logo item */
export const BrandLogoSchema = z.object({
  size: BrandLogoSizeSchema,
  src: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
});

/** Logos */
export type BrandLogos = z.infer<typeof BrandLogosSchema>;
/** Schema for logos */
export const BrandLogosSchema = z.object({
  $schema: z.string(),
  logos: BrandLogoSchema.array(),
});

export default BrandLogosSchema;
