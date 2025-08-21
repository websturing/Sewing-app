<template>
    <div>
        <n-card title="Recent Activity">
            <template #header-extra>
                <n-button text>
                    <template #icon>
                        <n-icon>
                            <AlbumsOutline />
                        </n-icon>
                    </template>
                    All Activity
                </n-button>
            </template>
            <n-timeline>
                <n-timeline-item content="Oops" />
                <n-timeline-item type="success" title="Success" content="success content" time="2018-04-03 20:46" />
                <n-timeline-item type="error" content="Error content" time="2018-04-03 20:46" />
                <n-timeline-item type="warning" title="Warning" content="warning content" time="2018-04-03 20:46" />
                <n-timeline-item type="info" title="Info" content="info content" time="2018-04-03 20:46"
                    line-type="dashed" />
                <n-timeline-item content="Oops" />
            </n-timeline>
        </n-card>
    </div>
</template>
<script setup lang="ts">
import { AlbumsOutline } from '@vicons/ionicons5';
</script>