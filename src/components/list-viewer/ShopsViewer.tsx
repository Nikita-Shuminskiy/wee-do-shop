import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import motorcycle from '../../assets/images/moto.png'
import test from '../../assets/images/testShops.png'
import { isCurrentTimeInRange } from '../../utils/utils'
import { StoreType } from '../../api/storesApi'
import * as Animatable from 'react-native-animatable'

type ShopsViewerType = {
	stores: StoreType
	onPress: () => void
}

const ShopsViewer = ({ stores, onPress }: ShopsViewerType) => {
	const [isLoaded, setIsLoaded] = useState(false)

	const { width } = Dimensions.get('window')
	const productWidth = (width - 15) / 2
	return (
		<TouchableOpacity onPress={onPress} style={{ minWidth: productWidth, maxWidth: productWidth }}>
			{!isLoaded && (
				<Animatable.View
					animation="pulse"
					iterationCount="infinite"
					style={{
						position: 'absolute',
						zIndex: 100,
						width: 170,
						height: 103,
						aspectRatio: 170 / 103,
						borderRadius: 16,
						backgroundColor: colors.grayWhite,
					}}
				/>
			)}

			<ImageBackground
				borderRadius={16}
				source={{ uri: stores.image }}
				style={{
					width: 170,
					height: 103,
					aspectRatio: 170 / 103,
				}}
				onLoad={() => setIsLoaded(true)}
			>
				<Box
					position={'absolute'}
					p={1}
					top={2}
					left={2}
					borderWidth={1}
					zIndex={10}
					w={66}
					h={19}
					borderColor={colors.green}
					flexDirection={'row'}
					borderRadius={16}
					alignItems={'flex-start'}
					justifyContent={'center'}
					backgroundColor={'black'}
				>
					<Image source={motorcycle} style={{ width: 14, height: 9 }} alt={'moto'} />
					<Text ml={2} textAlign={'center'} color={colors.white} fontSize={7} fontWeight={'500'}>
						{stores?.deliveryTime} min
					</Text>
				</Box>
				<Box flex={1} alignItems={'center'} justifyContent={'center'}>
					<Text fontSize={19} fontWeight={'700'} color={colors.white}>
						{stores.name}
					</Text>
				</Box>
				<Box
					position={'absolute'}
					bottom={0}
					right={0}
					backgroundColor={colors.green}
					borderRadius={16}
					borderTopRightRadius={0}
					paddingY={1}
					paddingX={3}
				>
					<Text color={colors.white} fontWeight={'600'} fontSize={8}>
						{isCurrentTimeInRange(stores?.workingHours, true)}
					</Text>
				</Box>
			</ImageBackground>
		</TouchableOpacity>
	)
}

export default ShopsViewer
