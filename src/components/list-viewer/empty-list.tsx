import React from 'react'
import { Box, Text } from 'native-base'
import {Dimensions, StyleProp, TextStyle} from 'react-native'
import {colors} from "../../assets/colors/colors";

type EmptyListProps = {
	text: string
	height: number
	onPressLink: () => void
	styleLink?: StyleProp<TextStyle>
	styleText?: StyleProp<TextStyle>
}
const EmptyList = ({ text, onPressLink, styleText, styleLink, height }: EmptyListProps) => {

	return (
		<Box alignItems={'center'} flex={1} w={'100%'} justifyContent={'center'}  height={height}>
			<Text fontSize={18} color={colors.gray}>
				{text}
			</Text>
		</Box>
	)
}

export default EmptyList
export const renderEmptyContainer = (height, text) => {
	const onPressLink = () => {
	}
	return (
		<EmptyList
			height={height}
			text={text}
			onPressLink={onPressLink}
		/>
	)
}
