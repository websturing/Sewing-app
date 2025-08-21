import { getDynamicIcon } from "@/lib/dynamic-icon"
import { useAuthStore } from "@/stores/auth"
import { storeToRefs } from "pinia"
import { computed, h, ref } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"

export function useSideBar() {
    const auth = useAuthStore()
    const route = useRoute()
    const router = useRouter()

    const isCollapsed = ref(false)
    const { menu: data } = storeToRefs(auth)

    const activeKey = computed(() => {
        return route.name as string // kalau slug kamu sama dengan name
        // return route.path // kalau slug kamu sama dengan path
    })

    const menu = computed(() => {
        return (data.value ?? []).map(item => {
            if (item.children && item.children.length > 0) {
                return {
                    label: item.name,
                    key: item.slug,
                    type: "group",
                    icon: getDynamicIcon(item.icon),
                    children: item.children.map(child => ({
                        label: () =>
                            safeHasRoute(child.slug)
                                ? h(
                                    RouterLink,
                                    { to: { name: child.slug } },
                                    { default: () => child.name }
                                )
                                : h("span", {}, child.name), // fallback kalau route tidak ada
                        key: child.slug,
                        icon: getDynamicIcon(child.icon)
                    }))
                }
            }

            return {
                label: () =>
                    safeHasRoute(item.slug)
                        ? h(
                            RouterLink,
                            { to: { name: item.slug } },
                            { default: () => item.name }
                        )
                        : h("span", {}, item.name),
                key: item.slug,
                icon: getDynamicIcon(item.icon)
            }
        })
    })

    function safeHasRoute(name?: string) {
        try {
            return !!(name && router.hasRoute(name))
        } catch {
            return false
        }
    }

    return {
        isCollapsed,
        menu,
        activeKey
    }
}