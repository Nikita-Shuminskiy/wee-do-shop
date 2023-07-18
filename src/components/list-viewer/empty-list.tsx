import React from 'react'
import { Box, Text } from 'native-base'
import {Dimensions, StyleProp, TextStyle} from 'react-native'
import {colors} from "../../assets/colors/colors";

type EmptyListProps = {
	text: string
	onPressLink: () => void
	styleLink?: StyleProp<TextStyle>
	styleText?: StyleProp<TextStyle>
}
const EmptyList = ({ text, onPressLink, styleText, styleLink }: EmptyListProps) => {
	return (
		<Box alignItems={'center'} justifyContent={'flex-start'}  height={Dimensions.get('window').height}>
			<Text fontSize={18} color={colors.gray}>
				{text}
			</Text>
		</Box>
	)
}

export default EmptyList
