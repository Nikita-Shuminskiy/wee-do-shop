import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import motorcycle from '../../assets/images/moto.png'
import test from '../../assets/images/testShops.png'
import { getCurrentDayName, isCurrentTimeWorkStoreRange } from "../../utils/utils";
import { StoreType } from '../../api/storesApi'
import * as Animatable from 'react-native-animatable'
import DeliveryTime from '../DeliveryTime'
import { getInfoAboutStoreWorkTime } from './utils'
import { useTranslation } from "react-i18next";

type ShopsViewerType = {
	stores: StoreType
	onPress: () => void
}

const ShopsViewer = ({ stores, onPress }: ShopsViewerType) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const {t} = useTranslation(['shops', 'common']);
	const { width } = Dimensions.get('window')
	const productWidth = (width - 15) / 2 - 15
	const isOpenStoreNow = isCurrentTimeWorkStoreRange(stores?.workingHours)
	const getTimeWorkStore = stores?.workingHours[getCurrentDayName()]
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{ minWidth: productWidth, maxWidth: productWidth, marginRight: 5, marginBottom: 10 }}
		>
			{!isLoaded && (
				<Animatable.View
					animation="pulse"
					iterationCount="infinite"
					style={{
						position: 'absolute',
						zIndex: 100,
						width: productWidth,
						height: 103,
						aspectRatio: productWidth / 103,
						borderRadius: 16,
						backgroundColor: colors.grayWhite,
					}}
				/>
			)}

			<ImageBackground
				borderRadius={16}
				source={{ uri: stores.image }}
				style={{
					width: productWidth,
					height: 103,
					aspectRatio: productWidth / 103,
				}}
				onLoad={() => setIsLoaded(true)}
			>
				{
					stores?.deliveryTime && <Box position={'absolute'} top={2} left={2} zIndex={10} w={66} h={19}>
						<DeliveryTime
							t={t}
							styleGradient={{ paddingVertical: 1, paddingHorizontal: 2 }}
							styleImg={{ width: 14, height: 9 }}
							fontSizeText={8}
							time={stores?.deliveryTime}
						/>
					</Box>
				}

				<Box flex={1} alignItems={'center'} justifyContent={'center'}>
					<Text fontSize={19} fontWeight={'700'} style={styles.textWithShadow} color={colors.white}>
						{stores.name}
					</Text>
				</Box>
				<Box
					position={'absolute'}
					bottom={0}
					right={0}
					backgroundColor={!isOpenStoreNow ? colors.red : colors.green}
					borderRadius={16}
					borderTopRightRadius={0}
					paddingY={1}
					paddingX={3}
				>
					<Text color={colors.white} fontWeight={'600'} fontSize={8}>
						{getTimeWorkStore}
					</Text>
				</Box>
			</ImageBackground>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	textWithShadow: {
		fontWeight: 'bold',
		textShadowColor: 'black', // Цвет тени
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 2,
	},
})
export default ShopsViewer
