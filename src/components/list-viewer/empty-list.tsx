import React from 'react'
import { Box, Text } from 'native-base'

import { StyleProp, TextStyle } from 'react-native'
import {colors} from "../../assets/colors/colors";
import Link from "../Link";

type EmptyListProps = {
	text: string
	textLink: string
	onPressLink: () => void
	styleLink?: StyleProp<TextStyle>
	styleText?: StyleProp<TextStyle>
}
const EmptyList = ({ text, onPressLink, textLink, styleText, styleLink }: EmptyListProps) => {
	return (
		<Box alignItems={'center'}>
			<Text fontSize={18} color={colors.gray}>
				{text}
			</Text>

			<Link styleText={styleText} styleLink={styleLink} text={textLink} onPress={onPressLink} />
		</Box>
	)
}

export default EmptyList
