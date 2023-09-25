import { isCurrentTimeInRange } from '../../utils/utils'
import { WorkingHoursType } from '../../api/storesApi'

export const getInfoAboutStoreWorkTime = (workingHours: WorkingHoursType) => {
	const currentTimeInRangeText = isCurrentTimeInRange(workingHours, true)
	const isWilOpen =
		isCurrentTimeInRange(workingHours, true).indexOf('Will open in') !== -1 ||
		isCurrentTimeInRange(workingHours, true).indexOf('Closed') !== -1
	return {
		currentTimeInRangeText,
		isWilOpen,
	}
}
