import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'

const useGoBackNative = (handleBackPress) => {
	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

		return () => {
			backHandler.remove()
		}
	}, [])
}

export default useGoBackNative
