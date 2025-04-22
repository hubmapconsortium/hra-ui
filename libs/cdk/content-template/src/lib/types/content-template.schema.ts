import { z } from 'zod';

/** Class declaration */
export type Classes = z.infer<typeof ClassesSchema>;
/** Extra css classes for a content template component  */
export const ClassesSchema = z.union([z.string(), z.string().array(), z.record(z.any())]);

/** Css style declaration */
export type Styles = z.infer<typeof StylesSchema>;
/** Extra css styles for a content template component */
export const StylesSchema = z.union([z.string(), z.record(z.any())]);

/** Base schema for content template components */
export const ContentTemplateSchema = z.object({
  component: z.string() as unknown as z.ZodLiteral<string>,
  classes: ClassesSchema.optional(),
  styles: StylesSchema.optional(),
});

/** Content template with additional properties */
export const ContentTemplateWithPropsSchema = ContentTemplateSchema.passthrough();

/** All registered content template specs */
export const registeredSpecs = new Set<AnyContentTemplateSpec>();

/** Data type for a content template */
export type AnyContentTemplate = z.infer<typeof ContentTemplateWithPropsSchema>;
/** Type of any content template zod specs */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyContentTemplateSpec = z.ZodObject<(typeof ContentTemplateSchema)['shape'], any, any>;
/** Schema for any content template */
export const AnyContentTemplateSchema: z.ZodType<AnyContentTemplate> = z.lazy(() => {
  if (registeredSpecs.size === 0) {
    return ContentTemplateWithPropsSchema;
  }

  const specs = Array.from(registeredSpecs) as [AnyContentTemplateSpec, ...AnyContentTemplateSpec[]];
  return z.discriminatedUnion('component', specs);
});
