<template>
    <div>
        <tr>
            <td v-for="i in props.tdLoop" :key="i"> <n-skeleton text /></td>
        </tr>
    </div>
</template>
<script setup lang="ts">

interface Props {
    tdLoop?: number;
    trLoop?: number
}

const props = withDefaults(defineProps<Props>(), {
    tdLoop: 5,
    trLoop: 10,
})
</script>