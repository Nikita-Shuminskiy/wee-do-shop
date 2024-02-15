import React from 'react'
import {
	Image,
	ImageSourcePropType,
	ImageStyle,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
} from 'react-native'
import { colors } from '../assets/colors/colors'

type LinkProps = {
	onPress: () => void
	text?: string,
	img?: ImageSourcePropType
	styleLink?: StyleProp<TextStyle>
	styleText?: StyleProp<TextStyle>
	styleImg?: StyleProp<ImageStyle>
}
const Link = ({ onPress, text, styleLink,styleImg, styleText, img, ...rest }: LinkProps) => {
	return (
		<TouchableOpacity style={[styles.link, styleLink]} onPress={onPress} {...rest}>
			{
				img ? <Image style={styleImg} source={img}/> : <Text style={[styles.text, styleText]}>{text}</Text>
			}
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	link: {
		width: 'auto',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 5,
		marginBottom: 5,
	},
	text: {
		fontSize: 13,
		color: colors.black,
	},
})

export default Link
