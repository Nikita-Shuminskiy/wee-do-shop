import React from 'react'
import { Box, Image, Text } from 'native-base'
import promoCodeImg from '../../../assets/images/promoCode.png'
import arrowRightImg from '../../../assets/images/courierImages/arrow-right.png'
import {colors} from "../../../assets/colors/colors";
import {TouchableOpacity} from "react-native";

const PromoCode = ({onPress}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Box borderRadius={16} h={10} alignItems={'center'} flexDirection={'row'} paddingX={3} backgroundColor={colors.grayLightWhite}>
				<Image source={promoCodeImg} alt={'promo-img'} style={{ width: 17, height: 18 }} />
				<Box ml={4} flex={1} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<Text fontSize={12} fontWeight={'500'}>Add promo code</Text>
					<Image source={arrowRightImg} alt={'promo-img'} style={{ width: 6, height: 12 }} />
				</Box>
			</Box>
		</TouchableOpacity>
	)
}

export default PromoCode
