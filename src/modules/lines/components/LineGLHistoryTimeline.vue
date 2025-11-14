<template>
    <div>
        <div v-if="isHistoryFound">
            <n-timeline>
                <n-timeline-item v-for="(history, index) in lineHistoryGLNumber" :key="history.glNo"
                    :type="index == 0 ? 'success' : 'default'">

                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-semibold">{{ history.glNo }}</p>
                            <div class="flex gap-2 text-sm text-gray-500">
                                <p>Color : {{ history.totalColors }}</p>
                                <p>Cut Pieces : {{ history.totalPcs }}</p>
                            </div>
                            <p class="text-xs text-blue-400">{{ history.updatedAt }}</p>
                        </div>
                        <div class="hover:text-blue-500 cursor-pointer" @click="navigateToDetailGLNumber(history.glNo)">
                            <n-icon :component="ArrowForwardIosFilled" :size="18" />
                        </div>
                    </div>

                </n-timeline-item>
            </n-timeline>
        </div>
        <div v-else>
            <n-empty description="No History GL Number Found">
            </n-empty>
        </div>

    </div>
</template>

<script lang="ts" setup>
import type { LineHistoryGLNumberApi } from '@/modules/lines/schemas/line.api.schema';
import { ArrowForwardIosFilled } from '@vicons/material';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Props {
    lineHistoryGLNumber?: LineHistoryGLNumberApi[];
}

const props = withDefaults(defineProps<Props>(), {
    lineHistoryGLNumber: () => [] as LineHistoryGLNumberApi[]
});

const isHistoryFound = computed(() => {
    return props.lineHistoryGLNumber && props.lineHistoryGLNumber.length > 0;
});

const navigateToDetailGLNumber = (glNo: string) => {
    router.push({ name: 'gls-detail', params: { id: glNo } });
};

</script>