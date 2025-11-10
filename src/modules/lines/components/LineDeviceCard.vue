<template>
    <div class="flex flex-col gap-5 border border-gray-200 px-2  py-4 rounded-lg shadow-sm">

        <n-collapse arrow-placement="right">
            <n-collapse-item v-for="(device, index) in props.lineDevices" :key="index" :name="index">
                <template #header>
                    <div class="!w-full">
                        <div class="flex items-center gap-4">

                            <div class="bg-blue-50 pl-3 pr-3 pt-3 pb-2 rounded-xl">
                                <n-icon size="24" class="text-blue-700">
                                    <DeviceMeetingRoomRemote24Filled />
                                </n-icon>
                            </div>
                            <div class="flex flex-col">
                                <p class="text-lg font-semibold">{{ device.deviceName }}</p>
                                <p class="text-gray-400">{{ device.deviceDescription }}</p>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="bg-gray-50 p-5 rounded-lg">
                    <table>
                        <tr>
                            <td>Mac Address</td>
                            <td>&nbsp;&nbsp; : &nbsp;&nbsp;</td>
                            <td>{{ device.deviceMacAddress }}</td>
                        </tr>
                        <tr>
                            <td>Last Updated</td>
                            <td>&nbsp;&nbsp; : &nbsp;&nbsp;</td>
                            <td>{{ device.updatedAt }}</td>
                        </tr>
                    </table>
                </div>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>
<script setup lang="ts">
import type { LineDeviceApi } from '@/modules/lines/schemas/line.api.schema';
import { DeviceMeetingRoomRemote24Filled } from '@vicons/fluent';

interface Props {
    lineDevices: LineDeviceApi[]
}

const props = withDefaults(defineProps<Props>(), {
    lineDevices: () => [] as LineDeviceApi[]
})

</script>