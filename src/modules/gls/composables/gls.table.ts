import { useGlTableStore } from '@/modules/gls/stores/glsTable.store'
import { useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

export function useGLTable() {
    const toast = useMessage()
    const store = useGlTableStore()
    const { data, loading, meta } = storeToRefs(store)

    // ✅ pindahkan state UI ke composable
    const search = ref('')
    const localResult = ref<any[]>([])
    const isSearching = ref(false)


    /**
        * HANDLERS
        */


    const handleFetch = async (notify = true) => {
        const { success, message } = await store.fetch({
            search: search.value || undefined,
        })
        if (notify) {
            success ? toast.success(message) : toast.error(message)
        }
    }

    // auto fetch on search change
    watch(search, async (term) => {
        if (!term) {
            localResult.value = []
            isSearching.value = false
            await handleFetch(false)
            return
        }

        const cached = store.data.filter((e) =>
            e.glNo?.toLowerCase().includes(term.toLowerCase())
        )

        if (cached.length > 0) {
            localResult.value = cached
            isSearching.value = true
        } else {
            await handleFetch(false)

            // ✅ setelah fetch, cek hasil dari store
            if (store.data.length === 0) {
                localResult.value = []
                isSearching.value = false
            } else {
                // kalau fetch ada hasil, tampilkan langsung dari store
                localResult.value = store.data
                isSearching.value = true
            }
        }
    })


    const visibleData = computed(() =>
        isSearching.value ? localResult.value : data.value
    )

    return {
        meta,
        data: visibleData,
        search,
        loading,
        handleFetch
    }
}
