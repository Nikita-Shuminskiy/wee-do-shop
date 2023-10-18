import React, { memo } from 'react'
import { Box, Image, Text } from 'native-base'
import { FlatList, StyleSheet } from 'react-native'
import ModalPopup from '../pop-up'
import { colors } from '../../assets/colors/colors'
import { ApiOrderType, StatusType } from '../../api/ordersApi'
import Button from '../Button'
import { renderEmptyContainer } from '../list-viewer/empty-list'
import testImg from '../../assets/images/test.png'
import { ProductType } from '../../api/productApi'
import { DELIVERY_PRICE, getFormatDateToString, getTotalPriceOrder } from '../../utils/utils'
import { formatProductPrice } from '../MapViews/utils'

const orderViews = ({ item }: { item: { amount: number; product: ProductType } }) => {
	return (
		<Box
			mb={2}
			pb={2}
			borderBottomWidth={1}
			flexDirection={'row'}
			alignItems={'center'}
			justifyContent={'space-between'}
			borderColor={colors.grayLight}
		>
			<Box flexDirection={'row'} flex={1}>
				<Image
					resizeMode="cover"
					borderRadius={16}
					style={{
						width: 47,
						height: 47,
						aspectRatio: 47 / 47,
					}}
					source={{ uri: item?.product?.image }}
					alt={'img-product'}
				/>
				<Box ml={2}>
					<Text fontSize={12} fontWeight={'500'}>
						{item?.product?.name}
					</Text>
					<Text fontSize={12} maxWidth={'70%'} fontWeight={'500'}>
						{item?.product?.effect}{' '}
						<Text color={colors.red}>{item?.product?.isDeleted && 'Product not available'}</Text>
					</Text>
					<Text fontSize={12} fontWeight={'500'}>
						x{item?.amount}
					</Text>
				</Box>
			</Box>
			<Box>
				<Text fontSize={14} fontWeight={'500'}>
					฿ {formatProductPrice(item?.product?.price)}
				</Text>
			</Box>
		</Box>
	)
}
type PopUpOrderDetailsProps = {
	show: boolean
	isFromCourier?: boolean
	order: ApiOrderType
	onClose: () => void
	onPressRepeat?: (order: ApiOrderType) => void
}

const PopUpOrderDetails = memo(
	({ show, onClose, onPressRepeat, order, isFromCourier }: PopUpOrderDetailsProps) => {
		const totalPriceOrder = getTotalPriceOrder(order?.products ?? [])

		const isFreeDelivery = Number(formatProductPrice(totalPriceOrder ?? 0)) >= 1500

		return (
			<ModalPopup visible={show} style={{ padding: 2 }} onClose={onClose}>
				<Box alignItems={'center'}>
					<Box mb={2} alignItems={'center'}>
						<Text
							fontWeight={'700'}
							color={order?.rejectReason ? colors.red : colors.black}
							fontSize={28}
						>
							{order?.status}
						</Text>
						{order?.rejectReason && (
							<Text fontWeight={'500'} fontSize={13}>
								Reason: {order.rejectReason}
							</Text>
						)}
					</Box>
					<Box style={styles.container}>
						<Box flexDirection={'row'} justifyContent={'space-between'}>
							<Text fontWeight={'600'} fontSize={16}>
								{order?.store?.name}
							</Text>
							<Text fontWeight={'600'} fontSize={16}>
								฿{formatProductPrice(totalPriceOrder)}
							</Text>
						</Box>
						<Text fontWeight={'600'} color={colors.gray} fontSize={12}>
							{getFormatDateToString(order?.createdAt)}
						</Text>
						{order?.status === StatusType.Completed && (
							<Box mt={4}>
								<Button
									backgroundColor={colors.green}
									styleContainer={styles.containerBtn}
									onPress={() => onPressRepeat(order)}
									title={'Repeat order'}
								/>
							</Box>
						)}
					</Box>
					<Box style={styles.container} alignItems={'center'}>
						<FlatList
							scrollEnabled={false}
							data={order?.products ?? []}
							renderItem={orderViews}
							keyExtractor={(item, index) => index?.toString()}
							style={{ width: '100%' }}
							contentContainerStyle={!order?.products.length && styles.contentContainerOrder}
							ListEmptyComponent={() => renderEmptyContainer(0, 'No details')}
						/>
					</Box>
					<Box style={styles.container}>
						<Box alignItems={'center'}>
							<Text fontWeight={'700'} fontSize={16}>
								Delivery and Payment
							</Text>
						</Box>
						<Box flexDirection={'row'} justifyContent={'space-between'}>
							<Text fontWeight={'500'} fontSize={16}>
								Delivery
							</Text>
							<Text fontWeight={'500'} fontSize={16}>
								{isFreeDelivery ? 'free' : `฿ ${formatProductPrice(order?.price?.deliveryPrice)}`}
							</Text>
						</Box>
					</Box>
					<Box style={styles.container}>
						<Box flexDirection={'row'} justifyContent={'space-between'}>
							<Text fontWeight={'500'} fontSize={16}>
								Total
							</Text>
							<Text fontWeight={'500'} fontSize={16}>
								฿{formatProductPrice(order?.totalPrice)}
							</Text>
						</Box>
					</Box>
				</Box>
			</ModalPopup>
		)
	}
)
const styles = StyleSheet.create({
	contentContainerOrder: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textBtn: {
		color: colors.black,
	},
	containerBtn: {},
	container: {
		width: '97%',
		borderRadius: 16,
		marginBottom: 15,
		padding: 10,
		backgroundColor: colors.white,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 20,
		elevation: 5,
	},
})
export default PopUpOrderDetails
