import React from "react"
import {Box, Image, Text} from "native-base"
import cartEmpty from "../assets/images/cartEmpty.png"
import {useTranslation} from "react-i18next"
import {colors} from "../assets/colors/colors"
import Button from "./Button"
import {StyleSheet} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {routerConstants} from "../constants/routerConstants"
import emptyCart from '../assets/images/emptyCart.png'

export const EmptyCart = () => {
	const navigation = useNavigation<any>()
	const {t} = useTranslation(['cart', 'common']);
	const onPress = () => {
		navigation.navigate(routerConstants.HOME)
	}
	return (
		<>
			<Box mt={5} alignItems={'center'}>
				<Text fontSize={22} fontWeight={'700'}>
					{t('cart')}
				</Text>
			</Box>
			<Box flex={1} alignItems={'center'} justifyContent={'space-evenly'}>
			<Text fontSize={26} textAlign={'center'} fontWeight={'bold'} color={colors.green}>
				{t('common:TheresNothingHere')}
			</Text>
				<Image w={200} h={200} source={emptyCart} alt={'cart'} />
				<Button
					styleText={styles.textBtn}
					styleContainer={styles.styleContainerBtn}
					backgroundColor={colors.green}
					onPress={onPress}
					title={t('common:backToStore')}
				/>
			</Box>
		</>
	)
}
const styles = StyleSheet.create({
	textBtn: {
		fontWeight: 'bold',
		fontSize: 18,
		color: colors.white,
	},
	styleContainerBtn: {
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: 160,
		height: 50
	},
})

export default EmptyCart
