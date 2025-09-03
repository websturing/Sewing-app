
import type { StepsProps } from "naive-ui"
import { ref } from "vue"

export function useStepWizard(totalSteps: number) {
    const current = ref<number>(1)
    const currentStatus = ref<StepsProps['status']>('process')

    const next = async (validators: Array<() => Promise<boolean>>) => {
        const stepIndex = current.value - 1
        if (validators[stepIndex]) {
            const valid = await validators[stepIndex]()
            if (!valid) return
        }

        if (current.value < totalSteps) {
            current.value++
        }
    }

    const prev = () => {
        if (current.value > 1) current.value--
    }

    return { current, currentStatus, next, prev }
}
