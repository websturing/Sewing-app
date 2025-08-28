import { useActivitiesStore } from "@module/activities/stores/activities.store";
import { debounce } from 'lodash';
import type { SelectOption } from 'naive-ui';
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";


export function useActivitiesSearch() {
    const store = useActivitiesStore()
    const { search } = storeToRefs(store)
    const year = ref<number>(new Date().getFullYear())
    const month = ref<number>(new Date().getMonth() + 1)


    /**
     * Filter from getters
     */

    const handleDebouncedSearch = debounce((val: string) => {
        store.searchOrFetch(val);
    }, 300);

    watch(search, (val) => {
        handleDebouncedSearch(val);
    });

    /**
     * Month, Year Range
     */

    /** YEAR */
    const currentActualYear = ref(new Date().getFullYear())
    const yearRange = ref(5)
    const yearList = computed(() => {
        const startYear = currentActualYear.value - yearRange.value;
        const endYear = currentActualYear.value;
        const years = [];

        for (let year = endYear; year >= startYear; year--) {
            years.push({
                label: year.toString(),
                value: year
            });
        }

        return years;
    })

    /** MONTH */
    const monthList: SelectOption[] = [
        { label: 'Januari', value: 1 },
        { label: 'Februari', value: 2 },
        { label: 'Maret', value: 3 },
        { label: 'April', value: 4 },
        { label: 'Mei', value: 5 },
        { label: 'Juni', value: 6 },
        { label: 'Juli', value: 7 },
        { label: 'Agustus', value: 8 },
        { label: 'September', value: 9 },
        { label: 'Oktober', value: 10 },
        { label: 'November', value: 11 },
        { label: 'Desember', value: 12 }
    ];

    /** formater */


    return {
        search,
        month,
        monthList,
        yearList,
        year
    }


}