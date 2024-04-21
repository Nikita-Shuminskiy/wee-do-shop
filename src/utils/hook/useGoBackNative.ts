import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { useIsFocused } from "@react-navigation/native";


const useGoBackNative = (handleBackPress) => {
	const isFocused = useIsFocused()
	useEffect(() => {
		if (isFocused) {
			BackHandler.addEventListener('hardwareBackPress', handleBackPress)
		} else {
			BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
		}
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
		}
	}, [isFocused]);
}


export default useGoBackNative
