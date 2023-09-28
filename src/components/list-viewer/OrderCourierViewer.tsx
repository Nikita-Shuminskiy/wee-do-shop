import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Box, Text } from 'native-base'
import { formatProductPrice, getFormattedAddress } from '../MapViews/utils'
import { colors } from '../../assets/colors/colors'
import Button from '../Button'
import { OrderCourierType } from '../../api/couierApi'
import fromToImg from '../../assets/images/courierImages/fromTo.png'
import { splittingWord } from '../../utils/utils'

type OrderCourierProps = {
	order: OrderCourierType
	onPressTakeOrder: () => void
	onPressInfoOrder?: () => void
	isMyOrder?: boolean
	isCompletedOrder?: boolean
}
const OrderCourierViewer = ({
	order,
	onPressTakeOrder,
	isMyOrder = false,
	onPressInfoOrder,
	isCompletedOrder = false,
}: OrderCourierProps) => {
	const formattedAddressStore = getFormattedAddress({
		fullAddress: order.store?.address,
		location: order.store?.location,
	})
	const formattedAddressUser = getFormattedAddress(order?.user?.address)
	const productTotalPrice = formatProductPrice(order.totalPrice)
	return (
		<Box style={styles.container}>
			<Box flexDirection={'row'} justifyContent={'space-between'}>
				<Box flexDirection={'row'} flex={1} alignItems={'flex-start'}>
					<Image style={styles.imageFromTo} source={fromToImg} alt={'img'} />
					<Box ml={2}>
						<Text fontWeight={'600'} fontSize={12}>
							{formattedAddressStore}
						</Text>
						<Text fontWeight={'600'} fontSize={12}>
							{formattedAddressUser}
						</Text>
					</Box>
				</Box>
				<Box justifyContent={'space-between'} alignItems={'flex-end'}>
					<Text fontWeight={'600'} fontSize={16}>
						฿ {productTotalPrice}
					</Text>
					<Text fontWeight={'600'} color={colors.green} fontSize={12}>
						{splittingWord(order.status)}
					</Text>
				</Box>
			</Box>

			{!isCompletedOrder && (
				<Box flexDirection={'row'} mt={2} justifyContent={'space-between'}>
					<Button
						backgroundColor={colors.green}
						styleText={styles.textBtn}
						styleContainer={styles.containerBtn}
						onPress={onPressTakeOrder}
						title={isMyOrder ? 'Go to order' : 'Take order'}
					/>
					{!isMyOrder && (
						<Button
							backgroundColor={colors.grayLight}
							styleText={{ color: colors.black }}
							styleContainer={styles.containerBtn}
							onPress={onPressInfoOrder}
							title={'Order information'}
						/>
					)}
				</Box>
			)}
			{isCompletedOrder && (
				<Box mt={2}>
					<Button
						backgroundColor={colors.grayLight}
						styleText={{ color: colors.black }}
						styleContainer={styles.containerBtn}
						onPress={onPressInfoOrder}
						title={'Order information'}
					/>
				</Box>
			)}
		</Box>
	)
}
const styles = StyleSheet.create({
	imageFromTo: {
		position: 'relative',
		top: 8,
		width: 9,
		height: 27.5,
	},
	textBtn: {
		color: colors.white,
	},
	containerBtn: {
		flex: 1,
		width: '100%',
		marginRight: 5,
	},
	container: {
		borderRadius: 20,
		marginBottom: 15,
		margin: 10,
		padding: 10,
		backgroundColor: colors.white,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 18,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10.0,
		elevation: 10,
	},
})
export default OrderCourierViewer
