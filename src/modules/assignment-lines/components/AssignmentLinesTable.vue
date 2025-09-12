<template>
    <div class="flex flex-col gap-5">
        <div class="flex gap-10">
            <div class="flex-1">
                <BaseAdvanceFilter v-model="search" v-model:dateRange="dateRange" @click:export="handleExportModal"
                    @click:refresh="handleFetch" />
            </div>
            <div class="">
                <BaseButton label="Create Assignment" :icon="CreateFilled" type="primary" @click="handleCreate" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseAdvanceFilter from '@/components/BaseAdvanceFilter.vue';
import BaseButton from '@/components/BaseButton.vue';
import { CreateFilled } from '@vicons/material';
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const search = ref<string>('')
const dateRange = ref<[number, number] | null>(null);

const handleFetch = () => {
    console.log('fetching data with search:', search.value, 'and dateRange:', dateRange.value);
}
const handleExportModal = () => {
    console.log('exporting data with search:', search.value, 'and dateRange:', dateRange.value);
}

const handleCreate = () => {
    router.push({ name: 'assignment-lines-form' });
}

</script>