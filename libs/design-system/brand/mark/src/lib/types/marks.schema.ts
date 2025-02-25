import { z } from 'zod';

/** Mark variant */
export type BrandMarkVariant = z.infer<typeof BrandMarkVariantSchema>;
/** Schema for mark variant */
export const BrandMarkVariantSchema = z.enum(['default', 'contrast']);

/** Mark item */
export type BrandMark = z.infer<typeof BrandMarkSchema>;
/** Schema for mark item */
export const BrandMarkSchema = z.object({
  variant: BrandMarkVariantSchema,
  src: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
});

/** Marks */
export type BrandMarks = z.infer<typeof BrandMarksSchema>;
/** Schema for marks */
export const BrandMarksSchema = z.object({
  $schema: z.string(),
  marks: BrandMarkSchema.array(),
});

export default BrandMarksSchema;
