import { LinksSchema, MetaSchema } from "@/types/metaPagination";
import { z } from 'zod';
const ActivitiesItemSchema = z.object({
  id: z.number(),
  description: z.string().nullable().optional(),
  logName: z.string().nullable().optional(),
  subjectType: z.string().nullable().optional(),
  event: z.string().nullable().optional(),
  properties: z.record(z.any()).or(z.object({}).passthrough()).nullable().optional(),
  batchUuid: z.string().nullable().optional(),
  causer: z.string().nullable().optional(),
  time: z.string()
});


export const ActivitySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  total: z.number().int().nonnegative(),
  items: z.array(ActivitiesItemSchema)
});
export const ActivitiesSchema = z.array(ActivitySchema)


export type Activity = z.infer<typeof ActivitySchema>
export type Activities = z.infer<typeof ActivitiesSchema>
export type ActivityItem = z.infer<typeof ActivitiesItemSchema>

// ✅ schema wrapper untuk API response
export const ActivitiesResponseSchema = z.object({
  message: z.string(),
  data: z.array(ActivitySchema),
  links: LinksSchema,
  meta: MetaSchema,
  status: z.boolean()

});


export type ActivitiesResponse = z.infer<typeof ActivitiesResponseSchema>;
