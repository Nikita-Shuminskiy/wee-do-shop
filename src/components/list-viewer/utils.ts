import { isCurrentTimeInRange } from '../../utils/utils'
import { WorkingHoursType } from '../../api/storesApi'

export const getInfoAboutStoreWorkTime = (workingHours: WorkingHoursType) => {
	const currentTimeInRangeResult = isCurrentTimeInRange(workingHours, true)

	const isWilOpen =
		currentTimeInRangeResult?.indexOf('Will open in') !== -1 ||
		currentTimeInRangeResult?.indexOf('Closed') !== -1

	return {
		currentTimeInRangeText: currentTimeInRangeResult,
		isWilOpen,
	}
}
