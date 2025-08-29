// utils/dynamic-icon.ts
import * as Antd from "@vicons/antd"
import * as Carbon from "@vicons/carbon"
import * as FA from "@vicons/fa"
import * as Fluent from "@vicons/fluent"
import * as IonIcons4 from "@vicons/ionicons4"
import * as IonIcons5 from "@vicons/ionicons5"
import * as Material from "@vicons/material"
import * as Tabler from "@vicons/tabler"

import { NIcon } from "naive-ui"
import { h } from "vue"

// urutan prioritas pencarian icon
const iconSets: Record<string, any>[] = [
    IonIcons5,
    IonIcons4,
    Fluent,
    Antd,
    Material,
    FA,
    Tabler,
    Carbon,
]

export const getDynamicIcon = (name: string) => {
    let iconComp: any = null

    for (const set of iconSets) {
        if (set[name]) {
            iconComp = set[name]
            break
        }
    }

    // fallback default
    if (!iconComp) {
        console.warn(`Icon not found in any set: ${name}, fallback ke SettingsOutline`)
        iconComp = IonIcons5.SettingsOutline
    }

    return () => h(NIcon, null, { default: () => h(iconComp) })
}
