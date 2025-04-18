import { z } from 'zod';

export const ClassesSchema = z.union([z.string(), z.string().array(), z.record(z.any())]);

export const StylesSchema = z.union([z.string(), z.record(z.any())]);

export const BaseContentTemplateSchema = z.object({
  component: z.string(),
  classes: ClassesSchema.optional(),
  styles: StylesSchema.optional(),
});

type BaseContentTemplateShape = (typeof BaseContentTemplateSchema)['shape'];
const AnyContentTemplateImplSchema = BaseContentTemplateSchema.passthrough();
const contentTemplateDefs: AnyContentTemplateDef[] = [];

export type AnyContentTemplate = z.infer<typeof AnyContentTemplateImplSchema>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyContentTemplateDef = z.ZodObject<BaseContentTemplateShape, any, any>;
export const AnyContentTemplateSchema: z.ZodType<AnyContentTemplate> = z.lazy(() => {
  if (contentTemplateDefs.length === 0) {
    return AnyContentTemplateImplSchema;
  }

  return z.discriminatedUnion('component', contentTemplateDefs as [AnyContentTemplateDef, ...AnyContentTemplateDef[]]);
});

export function addContentTemplates<Args extends AnyContentTemplateDef[]>(...templates: Args): void {
  contentTemplateDefs.push(...templates);
}

export function getContentTemplates(): AnyContentTemplateDef[] {
  return contentTemplateDefs;
}
