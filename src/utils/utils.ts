import regex from './helpers/regex'
import {WorkingHoursType} from "../api/storesApi";
import {format, parseISO} from 'date-fns'
import {ProductType} from "../api/productApi";

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
    if (currentHourWorkStores === 'Closed') return 'Closed today'
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

    if (currentHourWorkStores === 'Closed') {
        return isInfo ? 'Closed' : false
    }
    const [startTime, endTime] = currentHourWorkStores?.split(' - ');
    const currentHour = date.getHours()
    const currentMinute = date.getMinutes()
    const [startHour, startMinute] = startTime?.split(':').map(Number);
    const [endHour, endMinute] = endTime?.split(':').map(Number);

    if (
        currentHour > startHour &&
        currentHour < endHour
    ) {
        if (isInfo) {
            return 'Will close in  ' + endTime;
        }
        return true; // Текущее время полностью совпадает с указанным диапазоном времени
    } else if (
        currentHour === startHour &&
        currentMinute >= startMinute
    ) {
        if (isInfo) {
            return 'Will close in ' + endTime;
        }
        return true; // Текущее время полностью совпадает с началом диапазона
    } else if (
        currentHour === endHour &&
        currentMinute <= endMinute
    ) {
        if (isInfo) {
            return 'Will close in ' + endTime;
        }
        return true; // Текущее время полностью совпадает с концом диапазона
    }
    if (isInfo) {
        return 'Will open in  ' + endTime
    }
    return false; // Текущее время НЕ совпадает с указанным диапазоном времени
}

export const getFormatDateToString = (dateString: string) => {
    if (!dateString) return ''
    const date = parseISO(dateString);

    const formattedDate = format(date, "d MMMM HH:mm");

    return formattedDate
}
export const deliveryPrice = 100
export const splittingWord = (str) => {
    const words = str?.match(/[A-Z][a-z]+/g);

    if (!words) {
        return "";
    }

    const transformedWords = words.map((word, index) => {
        if (index === 0) {
            return word;
        } else {
            return word.toLowerCase();
        }
    });

    return transformedWords.join(" ");
}
export const getTotalPriceOrder = (products: {
    amount: number,
    product: ProductType
}[]) => {
    return products?.reduce((acc, product) => {
        return acc + product.amount * product.product.price
    }, 0)
}
