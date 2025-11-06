import { stockInApiSchema } from "@/modules/stock-in/schemas/stockin.api.schema";
import { LinksSchema, MetaSchema } from "@/types/metaPagination";
import { z } from "zod";





export const LineApiSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Line name is required'),
    location: z.string().nullable(),
    latestStockin: stockInApiSchema.nullable(),
})

const LineApiListSchema = z.array(LineApiSchema)

export const LineApiResponseSchema = z.object({
    message: z.string(),
    data: LineApiListSchema,
    links: LinksSchema,
    meta: MetaSchema,
    status: z.boolean()
})

export type LineApi = z.infer<typeof LineApiSchema>
export type LineApiList = z.infer<typeof LineApiListSchema>
export type LineApiResponse = z.infer<typeof LineApiResponseSchema>