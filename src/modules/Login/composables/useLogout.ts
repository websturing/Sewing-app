
import { useAuthStore } from '@/stores/auth';
import { nextTick, ref } from 'vue';
const isModal = ref(false);

export function useLogout() {
    const auth = useAuthStore();

    const toggleModal = async () => {
        isModal.value = true;
        await nextTick()
        console.log('Modal should be visible')
        console.log('Modal toggled:', isModal.value);
    };

    return {
        isModal,
        toggleModal,
        async logout() {
            try {
                await auth.logout();
                window.location.reload();
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }

    }
}