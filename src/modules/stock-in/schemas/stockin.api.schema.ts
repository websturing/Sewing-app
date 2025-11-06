import { LinksSchema, MetaSchema } from '@/types/metaPagination';
import { z } from 'zod';


export const stockInApiSchema = z.object({
    id: z.number().int().positive(),
    serialNumber: z.string().min(1),
    ticketNo: z.number().int().nonnegative(),
    glNo: z.string().min(1),
    size: z.string().min(1),
    userDispatchId: z.number().int().nonnegative(),
    color: z.string().min(1),
    pcs: z.number().int().positive(),
    dateStockOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
    corId: z.number().int().positive(),
    userId: z.number().int().positive(),
    userDispatchName: z.string(),
    boxNumber: z.string().nullable(),
    lineId: z.number().int().positive(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    inputSource: z.string().min(1),
    line: z.string().optional(),
    containerScanStatus: z.string().min(1)
});

export const stockInApiResponseSchema = z.object({
    status: z.boolean(),
    data: z.array(stockInApiSchema),
    message: z.string(),
    links: LinksSchema,
    meta: MetaSchema
})

export type StockInApi = z.infer<typeof stockInApiSchema>;