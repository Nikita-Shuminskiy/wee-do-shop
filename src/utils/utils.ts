import regex from './helpers/regex'
import {WorkingHoursType} from "../api/storesApi";

export const validateEmail = (email: string) => {
    return regex.email.test(email.trim())
}
export const capitalizeFirstLetter = (str: string) => {
    const capitalizedString = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalizedString
}
export const getCurrentDayName = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const currentDayOfWeek = today.getUTCDay()
    const currentDay = daysOfWeek[currentDayOfWeek];
    return currentDay.toLowerCase()
}


export const getCurrentUntilTimeStoreTo = (workingHoursStores: WorkingHoursType) => {
    if (!workingHoursStores) return ''

    const currentDay = getCurrentDayName()
    const currentHourWorkStores = workingHoursStores[currentDay];
    const utilTimeStore = currentHourWorkStores?.slice(-5); // get time work(to)
    return utilTimeStore
}

export function isCurrentTimeInRange(workingHoursStores: WorkingHoursType, isInfo = false) {
    if (!workingHoursStores) return ''
    const date = new Date();
    const currentDayName = getCurrentDayName()
    const currentHourWorkStores = workingHoursStores[currentDayName];
    if (!currentHourWorkStores) {
        return false; // Если для текущего дня нет указанного времени
    }
    const [startTime, endTime] = currentHourWorkStores.split(' - ');
    const currentHour = date.getUTCHours()
    const currentMinute = date.getUTCMinutes()
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    if (
        currentHour > startHour &&
        currentHour < endHour
    ) {
        if (isInfo) {
            return 'Open until ' + endTime;
        }
        return true; // Текущее время полностью совпадает с указанным диапазоном времени
    } else if (
        currentHour === startHour &&
        currentMinute >= startMinute
    ) {
        if (isInfo) {
            return 'Open until ' + endTime;
        }
        return true; // Текущее время полностью совпадает с началом диапазона
    } else if (
        currentHour === endHour &&
        currentMinute <= endMinute
    ) {
        if (isInfo) {
            return 'Open until ' + endTime;
        }
        return true; // Текущее время полностью совпадает с концом диапазона
    }
    if (isInfo) {
        return 'Closes ' + endTime
    }
    return false; // Текущее время НЕ совпадает с указанным диапазоном времени
}
