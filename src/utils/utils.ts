import regex from './helpers/regex'
import { WorkingHoursType } from '../api/storesApi'
import { addDays, format, getDay, getHours, getMinutes, parseISO } from 'date-fns'
import { ProductType } from '../api/productApi'
import { createAlert } from '../components/Alert'
import { log } from 'expo-updates/build-cli/utils/log'

export const validateEmail = (email: string) => {
	return regex.email.test(email.trim())
}
export const capitalizeFirstLetter = (str: string) => {
	const capitalizedString = str.charAt(0).toUpperCase() + str.slice(1)
	return capitalizedString
}
const daysOfWeek: (keyof WorkingHoursType)[] = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
]
export const getCurrentDayName = () => {
	const date = new Date()
	const currentDayOfWeek = getDay(date)
	const currentDay = daysOfWeek[currentDayOfWeek]
	return currentDay.toLowerCase()
}

export const getFormatDateToString = (dateString: string) => {
	if (!dateString) return ''
	const date = parseISO(dateString)

	return format(date, 'd MMMM HH:mm')
}
export const deliveryPrice = 70
export const splittingWord = (str) => {
	const words = str?.match(/[A-Z][a-z]+/g)

	if (!words) {
		return ''
	}

	const transformedWords = words.map((word, index) => {
		if (index === 0) {
			return word
		} else {
			return word.toLowerCase()
		}
	})

	return transformedWords.join(' ')
}
export const getTotalPriceOrder = (
	products: {
		amount: number
		product: ProductType
	}[]
) => {
	return products?.reduce((acc, product) => {
		return acc + product?.amount * product?.product?.price
	}, 0)
}

export const getCurrentUntilTimeStoreTo = (workingHoursStores: WorkingHoursType) => {
	if (!workingHoursStores) return ''
	const currentDay = getCurrentDayName()
	const currentHourWorkStores = workingHoursStores[currentDay]
	if (currentHourWorkStores === 'Closed') return 'Closed today'
	const utilTimeStore = currentHourWorkStores?.slice(-5) // get time work(to)
	return utilTimeStore
}
const getInfoTime = (open: boolean, time?: string) => {
	if (time === 'Closed') return 'Closed'
	return `Will ${open ? 'open' : 'close'} at ` + time ?? ''
}
const date = new Date()
const nextDayName = daysOfWeek[addDays(date, 1).getDay()]
const prevDayName = daysOfWeek[addDays(date, -1).getDay()]
const currentDayName = getCurrentDayName()

export const test = {
	sunday: 'Closed',
	monday: '09:00 - 03:30',
	tuesday: '01:30 - 13:00',
	wednesday: '09:30 - 02:00',
	thursday: '09:00 - 03:00',
	friday: '09:00 - 21:00',
	saturday: '10:00 - 23:00',
}
const currentHour = '05'
const currentMinute = '09'

export function isCurrentTimeInRange(workingHoursStores: WorkingHoursType, isInfo = false): any {
	if (!workingHoursStores) return ''
	const currentDayIndex = getDay(date)
	const [startTimeNextDay, endTimeNextDay] = workingHoursStores[nextDayName]?.split(' - ')
	const currentHourWorkStores = workingHoursStores[currentDayName]
	const currentHourWorkStoresPrevDay = workingHoursStores[prevDayName]
	const [startTimePrevDay, endTimePrevDay] = currentHourWorkStoresPrevDay?.split(' - ')
	const [startHourPrevDay, startMinutePrevDay] = startTimePrevDay?.split(':')
	const [endHourPrevDay, endMinutePrevDay] = endTimePrevDay?.split(':')
	// is closed will closed
	const isCurrentDayClosed = !currentHourWorkStores || currentHourWorkStores === 'Closed'
	const isPrevDayAfterMidnight =
		Number(startHourPrevDay + startMinutePrevDay) > Number(endHourPrevDay + endMinutePrevDay)

	const isCurrentTimeMoreThenPrevEndHour =
		Number(currentHour + currentMinute) > Number(endHourPrevDay + endMinutePrevDay)

	const [startTime, endTime] = currentHourWorkStores?.split(' - ')
	const [startHour, startMinute] = startTime?.split(':')
	const isCurrentTimeLessThenCurrentDayStartHour =
		currentHourWorkStores === 'Closed' ||
		Number(currentHour + currentMinute) < Number(startHour + startMinute)
	/*	console.log(Number(startHour + startMinute))
	console.log(currentMinute)*/
	/*	console.log(isCurrentDayClosed, 'isCurrentDayClosed')
	console.log(isPrevDayAfterMidnight, 'isPrevDayAfterMidnight')
	console.log(isCurrentTimeMoreThenPrevEndHour, 'isCurrentTimeMoreThenPrevEndHour')
	console.log(isCurrentTimeLessThenCurrentDayStartHour, 'isCurrentTimeLessThenCurrentDayStartHour')*/
	//current hour = 02
	/*	monday: '09:00 - 03:30',
      tuesday: '09:00 - 02:30',
      wednesday: '09:00 - 02:00',*/
	if (
		(isPrevDayAfterMidnight && isCurrentTimeMoreThenPrevEndHour && isCurrentDayClosed) ||
		(!isPrevDayAfterMidnight && isCurrentDayClosed) ||
		(isCurrentTimeLessThenCurrentDayStartHour && isCurrentTimeMoreThenPrevEndHour)
	) {
		console.log('isClosed')
		if (isInfo) return getInfoTime(true, startTimeNextDay)
		return false
	}
	console.log('ok')
	/*	const [startTime, endTime] = currentHourWorkStores?.split(' - ')
  const [startHour, startMinute] = startTime?.split(':').map(Number)
  const [endHour, endMinute] = endTime?.split(':').map(Number)*/
	/*if (startHour > endHour) {
    // Режим работы переходит через полночь
    if (
      currentHour > startHour ||
      (currentHour === startHour && currentMinute >= startMinute) ||
      currentHour < endHour ||
      (currentHour === endHour && currentMinute < endMinute)
    ) {
      // Время находится в интервале между началом и концом рабочего дня
      return isInfo ? getInfoTime(false, endTime) : true
    } else {
      // Время находится за пределами рабочего интервала
      return isInfo ? getInfoTime(true, startTimeNextDay) : false
    }
  } else {
    // Режим работы не переходит через полночь
    if (
      (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
      (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute))
    ) {
      // Время находится в интервале между началом и концом рабочего дня
      return isInfo ? getInfoTime(false, endTime) : true
    } else {
      // Время находится за пределами рабочего интервала
      return isInfo ? getInfoTime(true, startTime) : false
    }
  }*/
}
