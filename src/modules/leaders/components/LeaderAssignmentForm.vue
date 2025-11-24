<template>
    <div class="flex flex-col gap-5 !w-[500px]">

        <div class="mb-5">
            <p class="text-xl font-semibold">Leader Assignment Form</p>
            <p>A dedicated form interface for assigning leaders to specific production lines.</p>
        </div>

        <div class="flex gap-2 items-end">
            <BaseSelectWithError name="userId" :options="options" label="Leaders" v-model="value"
                placeholder="Select Leader" />

            <BaseSelectWithError name="lineId" :options="options" multiple label="Lines" v-model="values"
                placeholder="Select Lines" />
            <div class="flex flex-col">
                <label id="isActive" class="mb-2 font-semibold">Is Active</label>
                <n-switch :round="false" size="large" />
            </div>
        </div>

        <div class="bg-gray-50 border border-gray-200 p-3 rounded-lg">
            <p class="text-xs text-gray-400">Selected Lines</p>
            <div class="flex gap-2 flex-wrap mt-2">
                <n-tag v-for="id in values" :key="id" size="small" type="info" round>
                    {{options.find(o => o.value === id)?.label}}
                </n-tag>
            </div>
        </div>

        <div class="flex gap-2 justify-end">
            <BaseButton label="Reset" type="error" quaternary />
            <BaseButton label="Assign Leader" :icon="SaveArrowRight20Filled" icon-placement="right" type="primary" />
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseSelectWithError from '@/components/BaseSelectWithError.vue';
import { SaveArrowRight20Filled } from '@vicons/fluent';

import { ref } from 'vue';
const value = ref(null)
const values = ref(null)
const options = [
    {
        label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
        value: 'song0',
        disabled: true
    },
    {
        label: 'Drive My Car',
        value: 'song1'
    },
    {
        label: 'Norwegian Wood',
        value: 'song2'
    },
    {
        label: 'You Won\'t See',
        value: 'song3',
        disabled: true
    },
    {
        label: 'Nowhere Man',
        value: 'song4'
    },
    {
        label: 'Think For Yourself',
        value: 'song5'
    },
    {
        label: 'The Word',
        value: 'song6'
    },
    {
        label: 'Michelle',
        value: 'song7',
        disabled: true
    },
    {
        label: 'What goes on',
        value: 'song8'
    },
    {
        label: 'Girl',
        value: 'song9'
    },
    {
        label: 'I\'m looking through you',
        value: 'song10'
    },
    {
        label: 'In My Life',
        value: 'song11'
    },
    {
        label: 'Wait',
        value: 'song12'
    }
]
</script>