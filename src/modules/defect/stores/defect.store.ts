

import { defectApi } from '@/modules/defect/api/defectApi';
import {
    defectGroupGlNumberResponseSchema,
    defectGroupLineResponseSchema,
    defectSummaryGroupLineResponse,
    type DefectGroupGlNumber,
    type DefectGroupLine,
    type DefectItem,
    type DefectSummaryGroupLine
} from '@/modules/defect/schemas/defect.summaryApi';
import { ApiResponseSchema } from '@/types/api.schema';
import { defineStore } from 'pinia';



export const useDefectStore = defineStore('defect', {
    state: () => ({
        loading: false as boolean,
        error: null,
        defectData: [] as DefectItem[],
        defectGroupLines: [] as DefectGroupLine[],
        defectGroupGlNumber: [] as DefectGroupGlNumber[],
        summaryGroupLine: {} as DefectSummaryGroupLine
    }),
    actions: {
        async fetchSummaryGroupLines() {
            this.loading = true;
            this.error = null;
            try {

                const results = await defectApi.getSummaryGroupLines()
                const validate = defectSummaryGroupLineResponse.parse(results);

                this.summaryGroupLine = validate.data

                return ApiResponseSchema.parse({
                    success: true,
                    message: validate.message ?? "loaded",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },
        async fetchGroupLines() {
            this.loading = true;
            this.error = null;
            try {

                const results = await defectApi.getGroupLines()
                const validate = defectGroupLineResponseSchema.parse(results);

                this.defectGroupLines = validate.data

                return ApiResponseSchema.parse({
                    success: true,
                    message: validate.message ?? "loaded",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },
        async fetchGroupGlNumber() {
            this.loading = true;
            this.error = null;
            try {

                const results = await defectApi.getGroupGlNumber()
                const validate = defectGroupGlNumberResponseSchema.parse(results);

                this.defectGroupGlNumber = validate.data

                return ApiResponseSchema.parse({
                    success: true,
                    message: validate.message ?? "loaded",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                this.error = message;
                return ApiResponseSchema.parse({ success: false, message });
            } finally {
                this.loading = false;
            }
        },

    },
});