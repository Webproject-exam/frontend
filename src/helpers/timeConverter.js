import { isToday, isTomorrow, isYesterday, formatDistanceToNow, subDays } from 'date-fns'

/**
 * Converts a date into natural langage.
 * @param { Number | Date } date date to convert
 * @returns {number} 'today' | 'tomorrow' | 'yesterday' | 'the day after tomorrow' | formatDistanceToNow(date)
 */
function myTimeConverter(date) {

    if (isToday(date))
        return "today";

    if (isTomorrow(date))
        return "tomorrow";

    if (isYesterday(date))
        return "yesterday";

    if (isToday(subDays(date, 2)))
        return "the day after tomorrow";

    return formatDistanceToNow(date, { addSuffix: true })
}

export { myTimeConverter };