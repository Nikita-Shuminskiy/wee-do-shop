import React, { memo } from "react";
import { Box, Image, Text } from 'native-base'
import cartEmpty from '../assets/images/cartEmpty.png'
import textImg from '../assets/images/textImg.png'
import { useTranslation } from "react-i18next";

export const EmptyCart = () => {
	const {t} = useTranslation(['cart', 'common']);
	return (
		<>
			<Box mt={5} alignItems={'center'}>
				<Text fontSize={28} fontWeight={'700'}>
					{t('cart')}
				</Text>
			</Box>
			<Box flex={1} alignItems={'center'} justifyContent={'center'}>
				<Image w={'80%'} h={100} mb={10} resizeMode={'stretch'} source={textImg} alt={'textImg'} />
				<Image w={340} h={263} source={cartEmpty} alt={'cart'} />
			</Box>
		</>
	)
}

export default memo(EmptyCart)
