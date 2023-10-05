import { useState } from 'react'

export const useRefreshing = (updateFunc) => {
	const [refreshing, setRefreshing] = useState(false)
	const onRefresh = () => {
		setRefreshing(true)
		updateFunc().finally(() => {
			setRefreshing(false)
		})
	}
	return {
		refreshing,
		onRefresh,
	}
}
