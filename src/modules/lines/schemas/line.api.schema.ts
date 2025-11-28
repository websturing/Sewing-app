import { stockInApiSchema } from "@/modules/stock-in/schemas/stockin.api.schema";
import { LinksSchema, MetaSchema } from "@/types/metaPagination";
import { z } from "zod";



export const LineApiSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Line name is required'),
    location: z.string().nullable(),
    latestStockin: stockInApiSchema.nullable(),
})


export const LineDetailApiSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Line name is required'),
    location: z.string().nullable(),
})

export const LineGlsizeSchema = z.object({
    size: z.string(),
    bundle: z.number().int().nonnegative(),
    pcs: z.string().or(z.number()), // bisa string atau number
    defect: z.string().or(z.number()) // bi
});

export const lineGlColorSchema = z.object({
    color: z.string(),
    totalBundle: z.number().int().nonnegative(),
    totalPcs: z.number().int().nonnegative(),
    totalDefect: z.number().int().nonnegative(),
    sizes: z.array(LineGlsizeSchema)
});

export const LineGlSummarySchema = z.object({
    glNo: z.string(),
    totalColors: z.number().int().positive(),
    totalPcs: z.number().int().nonnegative(),
    colors: z.array(lineGlColorSchema)
})


export const LineDetailApiResponseSchema = z.object({
    message: z.string(),
    data: z.object({
        line: LineDetailApiSchema,
        stockinSummary: z.array(LineGlSummarySchema)
    }),
    status: z.boolean()
})

export const LinleHistoryGLNumberApiSchema = LineGlSummarySchema.extend({
    updatedAt: z.string().nullable().optional()
}).omit({
    colors: true
})

export const LineHistoryGLNumberApiResponseSchema = z.object({
    message: z.string(),
    data: z.array(LinleHistoryGLNumberApiSchema),
    status: z.boolean()
})




export type LineDetail = z.infer<typeof LineDetailApiSchema>
export type LineStockInSummary = z.infer<typeof LineGlSummarySchema>
export type LineHistoryGLNumberApi = z.infer<typeof LinleHistoryGLNumberApiSchema>





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


/**
    * LINES DEVICES 
    *
    * Relation Lines Devices and Devices
**/

export const LineDeviceApiSchema = z.object({
    id: z.number().optional(),
    lineName: z.string().nullable().optional(),
    deviceId: z.number().nullable().optional(),
    deviceName: z.string().nullable().optional(),
    deviceMacAddress: z.string().nullable().optional(),
    deviceDescription: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
})

export const LineDevicesApiResponseSchema = z.object({
    message: z.string(),
    data: z.array(LineDeviceApiSchema),
    status: z.boolean()
})

export type LineDeviceApi = z.infer<typeof LineDeviceApiSchema>
export type LineDevicesApiResponse = z.infer<typeof LineDevicesApiResponseSchema>