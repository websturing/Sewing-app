import { LinksSchema, MetaSchema } from "@/types/metaPagination";
import { z } from "zod";

export const GlApiSchema = z.object({
    id: z.number().optional(),
    glNumber: z.string().min(1, 'Line name is required'),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
})

const GlApiListSchema = z.array(GlApiSchema)

export const GlApiResponseSchema = z.object({
    message: z.string(),
    data: GlApiListSchema,
    links: LinksSchema,
    meta: MetaSchema,
    status: z.boolean()
})

export type GlApi = z.infer<typeof GlApiSchema>
export type GlApiList = z.infer<typeof GlApiListSchema>
export type GlApiResponse = z.infer<typeof GlApiResponseSchema>



/**
 * GL NUMBERS DB
 */

export const GLSchema = z.object({
    glNo: z.string(),
    totalBundle: z.number(),
    totalPcs: z.number(),
    totalColors: z.number(),
    totalSizes: z.number(),
    lastUpdated: z.string(),
    lineNames: z.string()
});

export const GlResponseSchema = z.object({
    status: z.boolean(),
    message: z.string(),
    data: z.array(GLSchema),
    links: LinksSchema,
    meta: MetaSchema,
})

export type GLs = z.infer<typeof GLSchema>
export type GlResponse = z.infer<typeof GlResponseSchema>


/** CUTTING INTEGRATION */
// Schema untuk summary object
const summarySchema = z.object({
    orderQty: z.number().int().nonnegative(),
    cutQty: z.number().int().nonnegative(),
});

// Schema untuk size breakdown item
const sizeBreakdownSchema = z.object({
    size: z.string(),
    orderQty: z.number().int().nonnegative(),
    cutQty: z.number().int().nonnegative(),
});

// Schema untuk laying planning item
const layingPlanningSchema = z.object({
    id: z.number().optional(),
    color: z.string(),
    type: z.string(),
    summary: summarySchema,
    sizeBreakdown: z.array(sizeBreakdownSchema),
});

// Schema untuk GL summary
const glSummarySchema = z.object({
    orderQty: z.number().int().nonnegative(),
    cutQty: z.number().int().nonnegative(),
});

// Schema untuk GL size breakdown item
const glSizeBreakdownSchema = z.object({
    size: z.string(),
    orderQty: z.number().int().nonnegative(),
    cutQty: z.number().int().nonnegative(),
});

// Schema untuk summary by GL
const summaryByGlSchema = z.object({
    glNumber: z.string(),
    layingPlannings: z.array(layingPlanningSchema),
    glSummary: glSummarySchema,
    glSizeBreakdown: z.array(glSizeBreakdownSchema),
});

// Schema untuk summary by color
const summaryByColorSchema = z.object({
    color: z.string(),
    type: z.enum(['BODY', 'COMBINASI']),
    summary: summarySchema,
    sizeBreakdown: z.array(sizeBreakdownSchema),
});

// Schema untuk grand total
const grandTotalSchema = z.object({
    orderQty: z.number().int().nonnegative(),
    cutQty: z.number().int().nonnegative(),
});

// Schema untuk filters applied
const filtersAppliedSchema = z.object({
    glNumbers: z.array(z.string()),
});

// Schema untuk metadata
const SummaryGlMetadataSchema = z.object({
    totalGlCount: z.number().int().positive(),
    totalColorCount: z.number().int().positive(),
    totalLayingPlannings: z.number().int().positive(),
    generatedAt: z.string(),
    lastUpdated: z.string(),
    filtersApplied: filtersAppliedSchema,
});

// Main response schema
export const summaryGlApiResponseSchema = z.object({
    message: z.string(),
    status: z.number(),
    data: z.object({
        summaryByGl: z.array(summaryByGlSchema),
        summaryByColor: z.array(summaryByColorSchema),
        grandTotal: grandTotalSchema,
        metadata: SummaryGlMetadataSchema,
    }),
});

// Type inference dari schema
export type SummaryGlApiResponse = z.infer<typeof summaryGlApiResponseSchema>;
export type SummaryByGl = z.infer<typeof summaryByGlSchema>;
export type SummaryByColor = z.infer<typeof summaryByColorSchema>;
export type LayingPlanning = z.infer<typeof layingPlanningSchema>;
export type GrandTotalGl = z.infer<typeof grandTotalSchema>;
export type SizeBreakdown = z.infer<typeof sizeBreakdownSchema>;
export type SummaryGlMetadata = z.infer<typeof SummaryGlMetadataSchema>;