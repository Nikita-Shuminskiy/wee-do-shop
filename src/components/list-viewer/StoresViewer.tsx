import React, { memo, useState } from 'react'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import like from '../../assets/images/like.png'
import likeActive from '../../assets/images/likeActive.png'
import { Dimensions, Image, TouchableOpacity } from 'react-native'
import { StoreType } from '../../api/storesApi'
import ImageDisplay from '../ImageDisplay'
import DeliveryTime from '../DeliveryTime'
import { getInfoAboutStoreWorkTime } from './utils'
import { observer } from 'mobx-react-lite'
import StoresStore from '../../store/StoresStore/stores-store'

type StoresViewerType = {
	stores: StoreType
	isFavorite: boolean
	onPress: (store: StoreType) => void
	onPressToggleFavoriteStore: (id: string) => void
}

const StoresViewer = memo(
	({ stores, onPress, onPressToggleFavoriteStore, isFavorite }: StoresViewerType) => {
		const { width } = Dimensions.get('window')
		const productWidth = width - 20
		const { isWilOpen, currentTimeInRangeText } = getInfoAboutStoreWorkTime(stores?.workingHours)

		const onPressFavoriteStore = () => {
			onPressToggleFavoriteStore(stores._id)
		}
		return (
			<TouchableOpacity
				onPress={() => onPress(stores)}
				style={{
					flex: 1,
					borderRadius: 16,
					height: 223,
					minWidth: productWidth,
					maxWidth: productWidth,
					marginBottom: 20,
				}}
			>
				<Box
					backgroundColor={'rgba(203,203,203,0.27)'}
					borderRadius={16}
					alignItems={'flex-start'}
					justifyContent={'space-between'}
					mb={3}
					borderColor={colors.green}
				>
					<Box>
						<Box position={'absolute'} top={2} left={2} zIndex={10}>
							<DeliveryTime time={stores.deliveryTime} fontSizeText={13} />
						</Box>
						<Box position={'absolute'} p={1} zIndex={10} top={2} right={2}>
							<TouchableOpacity onPress={onPressFavoriteStore}>
								<Image
									style={{ width: 34, height: 34 }}
									source={isFavorite ? likeActive : like}
									alt={'like'}
								/>
							</TouchableOpacity>
						</Box>
						<Box width={productWidth} h={170}>
							<ImageDisplay
								alt={'image-store'}
								borderRadius={16}
								source={{ uri: stores.image }}
								style={{
									flex: 1,
									width: '100%',
									height: '100%',
									borderRadius: 16,
								}}
							/>
						</Box>
						<Box
							position={'absolute'}
							bottom={0}
							right={0}
							backgroundColor={isWilOpen ? colors.red : colors.green}
							borderRadius={16}
							borderRightRadius={0}
							paddingY={1}
							paddingX={3}
						>
							<Text color={colors.white} fontWeight={'600'} fontSize={14}>
								{currentTimeInRangeText}
							</Text>
						</Box>
					</Box>
					<Box paddingY={2} w={'100%'} borderBottomRightRadius={16} borderBottomLeftRadius={16}>
						<Text ml={3} fontSize={18} fontWeight={'700'} color={colors.balck}>
							{stores?.name}
						</Text>
						<Box ml={3} flexDirection={'row'} flexWrap={'wrap'} w={'90%'} alignItems={'center'}>
							{stores?.categories?.map((subCategory, key) => {
								const lastElem = stores?.categories?.length - 1 === key
								return (
									<Text
										key={`${subCategory._id}-${key}`}
										color={colors.gray}
										fontSize={11}
										fontWeight={'500'}
									>{`${subCategory.name}${lastElem ? '' : ', '}`}</Text>
								)
							})}
						</Box>
					</Box>
				</Box>
			</TouchableOpacity>
		)
	}
)

export default StoresViewer
