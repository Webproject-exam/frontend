import { startOfDay, isToday, isTomorrow, isYesterday, formatDistanceToNow, subDays } from 'date-fns'

/**
 * Converts a date into natural langage.
 * @param { Number | Date } date date to convert
 * @returns {number} 'today' | 'tomorrow' | 'yesterday' | 'the day after tomorrow' | formatDistanceToNow(date)
 */
function myTimeConverter(date) {

    let dateAsDay = startOfDay(date);

    if (isToday(dateAsDay)) { return "today" }

    else if (isTomorrow(dateAsDay)) { return "tomorrow" }

    else if (isYesterday(dateAsDay)) { return "yesterday" }

    else if (isToday(subDays(dateAsDay, 2))) { return "the day after tomorrow" }

    else { return formatDistanceToNow(dateAsDay, { addSuffix: true }) }
}

export { myTimeConverter };