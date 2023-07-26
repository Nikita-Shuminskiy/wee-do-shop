import regex from './helpers/regex'
import {WorkingHoursType} from "../api/storesApi";

export const validateEmail = (email: string) => {
    return regex.email.test(email.trim())
}
export const getCurrentDay = (workingHoursStores: WorkingHoursType) => {
    if (!workingHoursStores) return ''
    const daysOfWeek = ['monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'];

    const today = new Date();
    const currentDayOfWeek = today.getDay()

    const currentDay = daysOfWeek[currentDayOfWeek];
    const currentHourWorkStores = workingHoursStores[currentDay];
    const untilWorksHoursStore = currentHourWorkStores.slice(-5);
    return untilWorksHoursStore


}
