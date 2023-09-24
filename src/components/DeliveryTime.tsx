import React from 'react'
import { Image } from 'react-native'
import motorcycle from '../assets/images/moto.png'
import { Text } from 'native-base'
import { colors } from '../assets/colors/colors'
import { LinearGradient } from 'expo-linear-gradient'

const DeliveryTime = ({ time, styleImg, styleGradient, fontSizeText }: any) => {
	return (
		<LinearGradient
			colors={['rgba(73,74,79,0.51)', '#699315']}
			start={[0, 0.5]}
			end={[1, 0.5]}
			style={{
				flex: 1,
				borderRadius: 50,
				paddingVertical: 6,
				paddingHorizontal: 5,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				...styleGradient,
			}}
		>
			<Image
				source={motorcycle}
				style={{ width: 18, height: 19, resizeMode: 'center', ...styleImg }}
				alt={'moto'}
			/>
			<Text ml={2} color={colors.white} fontSize={fontSizeText ?? 13} fontWeight={'500'}>
				{time} min
			</Text>
		</LinearGradient>
	)
}

export default DeliveryTime
