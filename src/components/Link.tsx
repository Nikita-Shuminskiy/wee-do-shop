import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native'
import { colors } from '../assets/colors/colors'

type LinkProps = {
	onPress: () => void
	text: string
	styleLink?: StyleProp<TextStyle>
	styleText?: StyleProp<TextStyle>
}
const Link = ({ onPress, text, styleLink, styleText, ...rest }: LinkProps) => {
	return (
		<TouchableOpacity style={[styles.link, styleLink]} onPress={onPress} {...rest}>
			<Text style={[styles.text, styleText]}>{text}</Text>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	link: {
		marginTop: 10,
	},
	text: {
		fontSize: 18,
		color: colors.white,
	},
})

export default Link
