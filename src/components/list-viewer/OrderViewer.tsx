import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { ApiOrderType, StatusType } from "../../api/ordersApi";
import { colors } from "../../assets/colors/colors";
import { Box, Text } from "native-base";
import Button from "../Button";
import { getFormatDateToString, isCurrentTimeWorkStoreRange, splittingWord } from "../../utils/utils";
import { formatProductPrice } from "../MapViews/utils";
import { useNavigation } from "@react-navigation/native";
import { routerConstants } from "../../constants/routerConstants";
import orderStore from "../../store/OrderStore/order-store";
import rootStore from "../../store/RootStore/root-store";
import { useTranslation } from "react-i18next";

type OrderViewerProps = {
	order: ApiOrderType
	onPressDetails: (order: ApiOrderType) => void
	onPressRepeat: (order: ApiOrderType) => void
}
const OrderViewer = memo(({ order, onPressDetails, onPressRepeat }: OrderViewerProps) => {
	const {t} = useTranslation(['orders', 'common', 'order_statuses']);
	const { setStatus } = orderStore
	const { OrderService } = rootStore
	const isStatusCanceled = order.status === StatusType.Canceled
	//const { status } = useOrderDataStatus({ orderId: order._id })
	const navigation = useNavigation<any>()

	const onPressCheckStatus = () => {
		OrderService.getOrder(order._id).then((data) => {
			setStatus(data.status)
			navigation.navigate(routerConstants.ORDER_STATUSES)
		})
	}
	const isCompletedStatuses = order.status === StatusType.Completed
	return (
		<Box style={styles.container}>
			<Box flexDirection={'row'} justifyContent={'space-between'}>
				<Text fontWeight={'600'} fontSize={16}>
					{order?.store?.name}
				</Text>
				<Text fontWeight={'600'} fontSize={16}>
					฿{formatProductPrice(order?.totalPrice)}
				</Text>
			</Box>
			<Box flexDirection={'row'} mt={1} justifyContent={'space-between'}>
				<Text fontWeight={'600'} color={colors.gray} fontSize={12}>
					{getFormatDateToString(order?.createdAt)}
				</Text>
				<Text
					fontWeight={'600'}
					fontSize={14}
					color={
						order.status === StatusType.Canceled
							? colors.red
							: order.status === StatusType.Completed
							? colors.green
							: '#556c60'
					}
				>
					{t(`order_statuses:${order.status}`)}
				</Text>
			</Box>
			<Box flexDirection={'row'} mt={2} justifyContent={'space-between'}>
				<Button
					backgroundColor={'#E7E7E7'}
					styleText={styles.textBtn}
					styleContainer={{
						maxWidth: !isStatusCanceled ? 150 : null,
						width: '100%',
					}}
					onPress={() => onPressDetails(order)}
					title={`${t('orderDetails')} (${order.products?.length}+)`}
				/>
				{isCompletedStatuses && !isStatusCanceled && (
					<Button
						backgroundColor={colors.green}
						styleContainer={styles.containerBtn}
						onPress={() => onPressRepeat(order)}
						title={t('repeatOrder')}
					/>
				)}
				{!isCompletedStatuses && !isStatusCanceled && (
					<Button
						backgroundColor={colors.green}
						styleContainer={styles.containerBtn}
						onPress={onPressCheckStatus}
						title={t('checkStatus')}
					/>
				)}
			</Box>
		</Box>
	)
})
const styles = StyleSheet.create({
	textBtn: {
		color: colors.black,
	},
	containerBtn: {
		maxWidth: 140,
		flex: 1,
		width: '100%',
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
export default OrderViewer
