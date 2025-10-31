import { z } from "zod";



export const GLCombineSizesSchema = z.object({
    id: z.number(),
    cuttingGlColorId: z.number(),
    size: z.string(),
    orderQty: z.number(),
    cutQty: z.number(),
    stockOutQty: z.number(),
    replacementQty: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    sewingStockinQty: z.number(),
    sewingStockoutQty: z.number()


})

export const GLCombineColorsSchema = z.object({
    id: z.number(),
    cuttingGlSummaryId: z.number(),
    color: z.string(),
    type: z.string(),
    orderQty: z.number(),
    cutQty: z.number(),
    stockOutQty: z.number(),
    replacementQty: z.number(),
    lastSyncAt: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    sewingTotalStockinQty: z.number(),
    sewingTotalStockoutQty: z.number(),
    sizes: z.array(GLCombineSizesSchema)

})


export const GLCombineSchema = z.object({
    id: z.number(),
    glNumber: z.string(),
    orderQty: z.number(),
    cutQty: z.number(),
    stockOutQty: z.number(),
    replacementQty: z.number(),
    lastSyncAt: z.string(),
    sewingTotalStockinQty: z.number(),
    sewingTotalStockoutQty: z.number(),
    colors: z.array(GLCombineColorsSchema)
})

export const GLCombineResponseSchema = z.object({
    status: z.boolean(),
    message: z.string(),
    data: GLCombineSchema
})

export type GLCombineColor = z.infer<typeof GLCombineColorsSchema>
export type GLCombineSize = z.infer<typeof GLCombineSizesSchema>
export type GLCombine = z.infer<typeof GLCombineSchema>
export type GLCombineResponse = z.infer<typeof GLCombineResponseSchema>