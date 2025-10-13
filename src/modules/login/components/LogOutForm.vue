<template>
    <div>
        <n-modal v-model:show="isModal" preset="dialog" title="Dialog" content="Are you sure you want to proceed?"
            positive-text="Confirm" negative-text="Cancel" @positive-click="logout" @negative-click="">
        </n-modal>
    </div>
</template>
<script setup lang="ts">
import { useLogout } from "@/modules/login/composables/useLogout";



const { isModal, logout } = useLogout()
</script>