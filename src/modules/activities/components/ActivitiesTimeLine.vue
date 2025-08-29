<template>
    <div>
        <n-space :size="20" vertical justify="center">
            <n-timeline>
                <transition-group name="fade" tag="div">

                    <!-- First load skeleton -->
                    <template v-if="isFirstLoad && isLoading">
                        <n-timeline-item v-for="i in 5" :key="i">
                            <div class="flex gap-2 item-center">
                                <div class="flex-1">
                                    <NSkeleton animated class="mb-2" />
                                    <NSkeleton animated />
                                </div>
                                <n-card class="flex-5">
                                    <NSkeleton height="100px" animated />
                                </n-card>
                            </div>
                        </n-timeline-item>
                    </template>

                    <!-- Empty state -->
                    <template v-else-if="!isLoading && data.length === 0 && !isFirstLoad">
                        <n-empty size="huge" class="text-center" description="No activities found">
                            <template #extra>
                                <div class="space-y-2">
                                    <p class="text-gray-500" v-if="!isFirstLoad">Try adjusting your search terms or
                                        filters </p>
                                </div>
                            </template>
                        </n-empty>
                    </template>

                    <!-- Normal data -->
                    <template v-else>
                        <template v-for="(item) in data" :key="item.date">
                            <n-timeline-item :title="item.date">
                                <div v-for="p in item.items" :key="p.id" class="mb-10">
                                    <div class="flex gap-2 item-center">
                                        <div class="flex-1">
                                            <p>{{ p.causer }}</p>
                                            <p class="flex-1 mt-2 text-gray-500">{{ p.time }}</p>
                                        </div>
                                        <n-card class="flex-5">
                                            <p class="border-l-4 pl-2 mb-5">{{ p.description }}</p>
                                            <JsonViewer :value="p.properties" copyable boxed sort theme="dark" />
                                        </n-card>
                                    </div>
                                </div>
                            </n-timeline-item>
                        </template>
                    </template>

                </transition-group>
            </n-timeline>

            <center>
                <n-button class="p-20" @click="handleLoadMore" v-if="!isFirstLoad && data.length != 0">
                    Load More
                </n-button>
            </center>
        </n-space>
    </div>
</template>


<script setup lang="ts">
import { useActivities } from '../composables/useActivities';

const {
    data,
    isLoading,
    isFirstLoad,
    handleLoadMore
} = useActivities()
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>