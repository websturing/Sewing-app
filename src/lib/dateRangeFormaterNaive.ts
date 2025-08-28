


/**
 * FUNCTION
 * @param timestamp 
 * @returns 
 */

export function formatDateYMD(timestamp: number | null): string {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatDateRangeYMD(range: [number, number] | null): [string, string] | null {
    if (!range) return null;
    return [formatDateYMD(range[0]), formatDateYMD(range[1])];
}
