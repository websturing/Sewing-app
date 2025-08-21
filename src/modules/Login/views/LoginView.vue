<template>
    <div class="min-h-screen flex flex-col lg:flex-row">
        <!-- Kolom Form -->
        <div class="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
            <div class="p-10 w-full max-w-md">
                <h1 class="text-3xl font-bold text-gray-800">Sign In</h1>
                <p class="mt-2 mb-6 text-lg text-gray-600">Enter your email and password to sign in</p>
                <LoginForm />
            </div>
        </div>

        <!-- Kolom Gambar -->
        <div class="flex-1 p-4 lg:p-3">
            <div class="login-container h-full rounded-lg overflow-hidden">
                <div class="login-overlay flex flex-col items-center justify-center h-full">
                    <h1 class="text-white text-2xl font-bold drop-shadow-md text-center">
                        "Stitch Your Imagination"
                    </h1>
                    <p class="text-white text-lg">Where every thread tells a story, and every design becomes reality.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoginForm from '@/modules/Login/components/LoginForm.vue';
</script>

<style scoped>
.login-container {
    background-image: url('@image/bg-login.jpg');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
}

.login-overlay {
    background: linear-gradient(310deg,
            rgba(94, 114, 228, 0.4) 0%,
            /* Tambahkan opacity (contoh: 0.8) */
            rgba(130, 94, 228, 0.7) 100%);
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
}
</style>