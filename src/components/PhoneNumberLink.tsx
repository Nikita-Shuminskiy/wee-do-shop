import { Linking, TouchableOpacity } from 'react-native'
import { Text } from 'native-base'
import React from 'react'
import { colors } from '../assets/colors/colors'

export const PhoneNumberComponent = ({ phoneNumber }) => {
	const handlePhonePress = async () => {
		try {
			const url = `tel://${phoneNumber}`
			await Linking.openURL(url)
		} catch (e) {
			console.log('error open tel book')
		}
	}

	return (
		<TouchableOpacity onPress={handlePhonePress}>
			<Text fontSize={15} color={colors.blueLightMedium}>
				{phoneNumber}
			</Text>
		</TouchableOpacity>
	)
}
