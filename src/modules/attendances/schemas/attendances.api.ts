import { z } from 'zod';

export const attendanceGroupLineSchema = z.object({
    id: z.number().optional(),
    attendanceDate: z.string(),
    employeeCode: z.string(),
    lineId: z.number(),
    lineName: z.string(),
    checkInTime: z.string().nullable(),
    checkOutTime: z.string().nullable(),
    status: z.string(),
    userName: z.string(),
    deviceName: z.string().nullable(),
});


export const attendanceGroupLineResponseSchema = z.object({
    status: z.boolean(),
    message: z.string(),
    data: z.array(attendanceGroupLineSchema)
});

// Type inference untuk TypeScript
export type attendanceGroupLine = z.infer<typeof attendanceGroupLineSchema>;
export type attendanceGroupLineResponse = z.infer<typeof attendanceGroupLineResponseSchema>;