import * as z from 'zod';

/** Breadcrumb Item Schema */
export const BreadcrumbItemSchema = z
  .object({
    name: z.string(),
    route: z.string().optional(),
  })
  .meta({ id: 'BreadcrumbItem' });
