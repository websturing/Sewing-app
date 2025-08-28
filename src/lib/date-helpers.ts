
export const date = new Date()
export const currentActualYear = date.getFullYear()
export const currentActualMonth = date.getMonth()


/**
 * Function 
 * @param yearRange 
 * @returns 
 */

export function yearDynamicList(yearRange: number) {
    const startYear = currentActualYear - yearRange
    const endYear = currentActualYear;
    const years = [];

    for (let year = endYear; year >= startYear; year--) {
        years.push({
            label: year.toString(),
            value: year
        });
    }

    return years;
}