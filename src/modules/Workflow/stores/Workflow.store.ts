import { workflowsApi } from '@/modules/Workflow/api/Workflow.api';
import { WorkFlowWithStepResponseSchema, type WorkFlowWithSteps } from '@/modules/Workflow/schemas/Workflow.api.schema';
import { ApiResponseSchema } from '@/types/api.schema';
import { defineStore } from 'pinia';

export const useWorkflowStore = defineStore('workflowStore', {
    state: () => ({
        workflowWithSteps: {} as WorkFlowWithSteps,
    }),
    actions: {
        async fetchWorkFlowById(id: number) {
            try {
                const results = await workflowsApi.getWorkflowById(id)
                const validate = WorkFlowWithStepResponseSchema.parse(results);

                this.workflowWithSteps = validate.data
                return ApiResponseSchema.parse({
                    success: true,
                    message: results.message ?? "Succesfully Retrived Data",
                });
            } catch (error: any) {
                const message = error?.response?.data?.message || "Something went wrong";
                return ApiResponseSchema.parse({ success: false, message });
            }
        },
    }
});