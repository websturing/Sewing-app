import { z } from 'zod';

const PropertiesSchema = z.record(z.any()).or(z.object({}).passthrough());

const CauserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  email_verified_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
}).passthrough();

const ActivitiesItemSchema = z.object({
  id: z.number(),
  description: z.string().nullable().optional(),
  log_name: z.string().nullable().optional(),
  subject_type: z.string().nullable().optional(),
  subject_id: z.union([z.string(), z.number()]).nullable().optional(),
  causer_type: z.string().nullable().optional(),
  causer_id: z.union([z.string(), z.number()]).nullable().optional(),
  batch_uuid: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),

  causer: z
    .object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      email_verified_at: z.string().nullable().optional(),
      created_at: z.string().nullable().optional(),
      updated_at: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
});


export const ActivitiesSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  total: z.number().int().nonnegative(),
  items: z.array(ActivitiesItemSchema)
});

export type Activities = z.infer<typeof ActivitiesSchema>
export type ActivityItem = z.infer<typeof ActivitiesItemSchema>

// ✅ schema wrapper untuk API response
export const ActivitiesResponseSchema = z.object({
  data: z.array(ActivitiesSchema),
  links: z.object({}).passthrough(),
  meta: z.object({}).passthrough()
});


export type ActivitiesResponse = z.infer<typeof ActivitiesResponseSchema>;
