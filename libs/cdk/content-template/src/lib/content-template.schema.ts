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
  component: z.string(),
  classes: ClassesSchema.optional(),
  styles: StylesSchema.optional(),
});

/** Content template with additional properties */
const ContentTemplateWithPropsSchema = ContentTemplateSchema.passthrough();

/** Data type for a content template */
export type AnyContentTemplate = z.infer<typeof ContentTemplateWithPropsSchema>;
/** Type of any content template zod specs */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyContentTemplateSpec = z.ZodObject<(typeof ContentTemplateSchema)['shape'], any, any>;
/** Schema for any content template */
export const AnyContentTemplateSchema: z.ZodType<AnyContentTemplate> = z.lazy(() => {
  const specs = getRegisteredContentTemplateSpecs();
  if (specs.length === 0) {
    return ContentTemplateWithPropsSchema;
  }

  return z.discriminatedUnion('component', specs as [AnyContentTemplateSpec, ...AnyContentTemplateSpec[]]);
});

/** All registered content template specs */
const registeredSpecs = new Set<AnyContentTemplateSpec>(); //: AnyContentTemplateSpec[] = [];

/**
 * Register additional content template specs
 *
 * @param specs Specs to add
 */
export function registerContentTemplateSpecs<Args extends AnyContentTemplateSpec[]>(...specs: Args): void {
  for (const spec of specs) {
    registeredSpecs.add(spec);
  }
}

/**
 * Gets all currently registered content template specs
 *
 * @returns An array of specs
 */
export function getRegisteredContentTemplateSpecs(): AnyContentTemplateSpec[] {
  return Array.from(registeredSpecs);
}
