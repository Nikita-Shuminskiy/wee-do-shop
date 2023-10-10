import regex from './helpers/regex'
import { WorkingHoursType } from '../api/storesApi'
import { format, getHours, getMinutes, parseISO } from 'date-fns'
import { ProductType } from '../api/productApi'
import * as Updates from 'expo-updates'
import { createAlert } from '../components/Alert'

export const validateEmail = (email: string) => {
	return regex.email.test(email.trim())
}
export const capitalizeFirstLetter = (str: string) => {
	const capitalizedString = str.charAt(0).toUpperCase() + str.slice(1)
	return capitalizedString
}
export const getCurrentDayName = () => {
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	const today = new Date()
	const currentDayOfWeek = today.getUTCDay()
	const currentDay = daysOfWeek[currentDayOfWeek]
	return currentDay.toLowerCase()
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
	return `Will ${open ? 'open' : 'close'} in ` + time ?? ''
}

export function isCurrentTimeInRange(workingHoursStores: WorkingHoursType, isInfo = false): any {
	if (!workingHoursStores) return ''
	const date = new Date()
	const currentDayName = getCurrentDayName()

	const daysOfWeek: (keyof WorkingHoursType)[] = [
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday',
	]

	// Находим индекс текущего дня недели
	const currentDayIndex = daysOfWeek.indexOf(currentDayName as keyof WorkingHoursType)
	const nextDayIndex = (currentDayIndex + 1) % 7 // Вычисляем индекс следующего дня, учитывая, что неделя состоит из 7 дней
	const nextDayName = daysOfWeek[nextDayIndex]

	const currentHourWorkStores = workingHoursStores[currentDayName]
	if (!currentHourWorkStores) {
		return false // Если для текущего дня нет указанного времени
	}

	if (currentHourWorkStores === 'Closed') {
		return isInfo ? 'Closed' : false
	}

	const [startTime, endTime] = currentHourWorkStores?.split(' - ')
	const [startTimeNextDay, endTimeNextDay] = workingHoursStores[nextDayName]?.split(' - ')
	const currentHour = getHours(date)
	const currentMinute = getMinutes(date)

	const [startHour, startMinute] = startTime?.split(':').map(Number)
	const [endHour, endMinute] = endTime?.split(':').map(Number)

	if (currentHour > startHour && currentHour < endHour) {
		if (isInfo) {
			return getInfoTime(false, endTime)
		}
		return true // Текущее время полностью совпадает с указанным диапазоном времени
	}
	if (currentHour === startHour && currentMinute >= startMinute) {
		if (isInfo) {
			return getInfoTime(false, endTime)
		}

		return true
	}
	if (currentHour === endHour && currentMinute <= endMinute) {
		if (isInfo) {
			return getInfoTime(false, endTime)
		}
		return true
	}

	if ((startHour >= endHour || startHour >= endHour) && currentHour > startHour) {
		if (isInfo) {
			return getInfoTime(false, endTime)
		}
		return true
	}

	if (isInfo) {
		if (startTimeNextDay === 'Closed') return 'Closed'

		return getInfoTime(true, startTimeNextDay)
	}
	return false // Текущее время НЕ совпадает с указанным диапазоном времени
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
export const checkNewVersionApp = async () => {
	try {
		const update = await Updates.checkForUpdateAsync()
		const onPresUpdate = async () => {
			await Updates.fetchUpdateAsync()
			await Updates.reloadAsync()
		}
		if (update.isAvailable) {
			createAlert({
				title: 'Message',
				message: 'A new version is available, update the app',
				buttons: [
					{ text: 'Update ', style: 'default', onPress: onPresUpdate },
					{ text: 'Later ', style: 'cancel' },
				],
			})
		}
	} catch (e) {
		console.log('error', e)
	}
}
