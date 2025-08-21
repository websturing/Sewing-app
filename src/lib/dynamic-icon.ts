// utils/dynamic-icon.ts
import * as IonIcons from "@vicons/ionicons5"
import { NIcon } from "naive-ui"
import { h } from "vue"

export const getDynamicIcon = (name: string) => {
    const iconComp = (IonIcons as any)[name]

    // fallback kalau nggak ketemu
    if (!iconComp) {
        console.warn(`Icon not found: ${name}, fallback ke SettingsOutline`)
        return () => h(NIcon, null, { default: () => h(IonIcons.SettingsOutline) })
    }

    return () => h(NIcon, null, { default: () => h(iconComp) })
}
