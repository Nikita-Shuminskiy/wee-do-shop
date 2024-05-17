import React, { useEffect } from "react";
import { Box, Text } from 'native-base'
import { observer } from 'mobx-react-lite'
import orderStore from '../../../store/OrderStore/order-store'
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import placedImg from '../../../assets/images/orderImg/placed.png'
import preparedImg from '../../../assets/images/orderImg/prepared.png'
import waitingForPickImg from '../../../assets/images/orderImg/waitingForPick.png'
import courierImg from '../../../assets/images/orderImg/courier.png'
import arrivedImg from '../../../assets/images/orderImg/arrived.png'
import confirmed from '../../../assets/images/orderImg/confirmed.png'
import { Image, Linking, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../../assets/colors/colors'
import { CourierType, StatusType } from '../../../api/ordersApi'
import io from 'socket.io-client'
import OrderStatusBar from '../../../components/OrderStatusBar'
import Button from '../../../components/Button'
import { NavigationProp, ParamListBase, useIsFocused } from "@react-navigation/native";
import { routerConstants } from '../../../constants/routerConstants'
import { BASE_URL } from '../../../api/config'
import { splittingWord } from '../../../utils/utils'
import { Feather } from '@expo/vector-icons'
import airplaneImg from '../../../assets/images/statuses/airplane.png'
import bagImg from '../../../assets/images/statuses/bag.png'
import testImg from '../../../assets/images/statuses/test.png'
import heartImg from '../../../assets/images/statuses/heart.png'
import stormImg from '../../../assets/images/statuses/storm.png'
import { useTranslation } from "react-i18next";

const renderImgForStatuses = (status: StatusType) => {
	switch (status) {
		case StatusType.Placed:
			return placedImg
		case StatusType.Confirmed:
			return preparedImg
		case StatusType.WaitingForPickUp:
			return waitingForPickImg
		case StatusType.OnTheWay:
			return courierImg
		case StatusType.Completed:
			return arrivedImg
		case StatusType.Canceled:
			return confirmed
		default:
			return placedImg
	}
}
const renderHeaderDescriptionForStatuses = (status: StatusType, translate: any) => {
	switch (status) {
		case StatusType.Placed:
			return (
				<>
					<Image source={bagImg} style={{ width: 20, height: 20 }} />
					<Text ml={1} fontSize={13} flex={1}  fontWeight={500}>
						{translate('weExpanding')}
					</Text>
				</>
			)
		case StatusType.Confirmed:
			return (
				<>
					<Image source={stormImg} style={{ width: 20, height: 20 }} />
					<Text ml={1}  fontSize={13} flex={1}  fontWeight={500}>
						{translate('readyToBring')}
					</Text>
				</>
			)
		case StatusType.WaitingForPickUp:
			return (
				<>
					<Image source={testImg} style={{ width: 20, height: 20 }} />
					<Text ml={1} fontSize={13} flex={1} fontWeight={500}>
						{translate('wePackGoods')}
					</Text>
				</>
			)
		case StatusType.OnTheWay:
			return (
				<>
					<Image source={airplaneImg} style={{ width: 20, height: 20 }} />
					<Text ml={1} fontSize={13} flex={1}  fontWeight={500}>
						{translate('willDeliver')}
					</Text>
				</>
			)
		case StatusType.Completed:
			return (
				<>
					<Image source={heartImg} style={{ width: 20, height: 20 }} />
					<Text ml={1} fontSize={13} flex={1}  fontWeight={500}>
						{translate('thankYouBeing')}
					</Text>
				</>
			)
		case StatusType.Canceled:
			return (
				<>
					<Image source={stormImg} style={{ width: 20, height: 20 }} />
					<Text ml={1} fontSize={13} flex={1}  fontWeight={500}>
						{translate('orderCanceled')}
					</Text>
				</>
			)
		default:
			return null
	}
}
const renderDescriptionForStatuses = (status: StatusType, textReason?: string, translate?: any) => {
	switch (status) {
		case StatusType.Placed:
			return (
				<>
					<Text fontSize={24} fontWeight={'600'}>
						{translate('order')} {translate(status)}
					</Text>
					<Text color={colors.gray}>{translate('storeReceived')}</Text>
				</>
			)
		case StatusType.Confirmed:
			return (
				<>
					<Text fontSize={24} fontWeight={'600'}>
						{translate('order')} {translate(status)}
					</Text>
					<Text color={colors.gray}>{translate('storeApproved')}</Text>
				</>
			)
		case StatusType.WaitingForPickUp:
			return (
				<>
					<Text fontSize={24} fontWeight={'600'}>
						{translate('order')} {translate(status)}
					</Text>
					<Text color={colors.gray}>{translate('courierPicks')}</Text>
				</>
			)
		case StatusType.OnTheWay:
			return (
				<>
					<Text fontSize={24} fontWeight={'600'}>
						{translate('order')} {translate(status)}
					</Text>
					<Text color={colors.gray}>{translate('courierOnThe')}</Text>
				</>
			)
		case StatusType.Completed:
			return (
				<>
					<Text fontSize={24} fontWeight={'600'}>
						{translate('order')} {translate(status)}
					</Text>
					<Text color={colors.gray}>{translate('orderDelivered')}</Text>
				</>
			)
		case StatusType.Canceled:
			return (
				<>
					<Text fontSize={24} color={colors.red} fontWeight={'600'}>
						{translate(status)}
					</Text>
					<Text color={colors.gray}>{translate('storeComment')}: {textReason}</Text>
				</>
			)
		default:
			console.log(splittingWord(status), 'default');
			return (
				<>
					<Text fontSize={24} fontWeight={'600'}>
						{splittingWord(status)}
					</Text>
					<Text color={colors.gray}>{translate('orderLoading')}</Text>
				</>
			)
	}
}

type OrderStatusesSProps = {
	navigation: NavigationProp<ParamListBase>
}
const OrderStatusesS = observer(({ navigation }: OrderStatusesSProps) => {
	const {t} = useTranslation(['order_statuses', 'common']);
	const { order, statusOrder, setStatus, setCourierToOrder, setRejectReason, rejectReason } =
		orderStore
	console.log(order._id, 'OrderStatusesS');
	useEffect(() => {
		const socket = io(BASE_URL)
		socket.on('connect', () => {})
		socket.on(
			`orderStatusUpdated:${order._id}`,
			(data: {
				orderId: string
				status: StatusType
				courier: CourierType
				rejectReason: string
			}) => {
				if (data?.rejectReason) {
					setRejectReason(data.rejectReason)
				}
				if (data?.courier) {
					setCourierToOrder(data.courier)
				}
				setStatus(data.status)
			}
		)
	}, [])
	const onPressClose = () => {
		navigation.navigate(routerConstants.ORDERS, { from: 'statuses' })
	}
	const isCanceled = statusOrder === StatusType.Canceled

	const handlePhonePress = async () => {
		try {
			const url = `tel:${order.courier.phone}`
			await Linking.openURL(url)
		} catch (e) {
			console.log('error open tel book')
		}
	}

	const onPressGoToStores = () => {
		navigation.navigate(routerConstants.MAIN)
	}

	return (
		<BaseWrapperComponent backgroundColor={colors.white} isKeyboardAwareScrollView={true}>
			<Box paddingX={5} mt={5} justifyContent={'space-evenly'} flex={1}>
				<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<Box alignItems={'center'}>
						<Text fontSize={22} fontWeight={'500'}>
							{order?.store?.name}
						</Text>
					</Box>

					<Box alignItems={'center'}>
						<TouchableOpacity onPress={onPressClose}>
							<Text fontSize={16} fontWeight={'500'}>
								{t('goHistory')}
							</Text>
						</TouchableOpacity>
					</Box>
				</Box>
				{!isCanceled && (
					<Box
						mt={5}
						paddingY={4}
						paddingX={2}
						backgroundColor={`rgba(237, 248, 216, 1)`}
						borderRadius={16}
						flexDirection={'row'}
						alignItems={'flex-start'}
						justifyContent={'flex-start'}
					>
						{renderHeaderDescriptionForStatuses(statusOrder, t)}
					</Box>
				)}
				<Box mt={3} alignItems={'center'}>
					{renderDescriptionForStatuses(statusOrder, rejectReason, t)}
				</Box>
				<Box mt={2} alignItems={'center'} justifyContent={'center'}>
					<Image
						alt={'img'}
						resizeMode={'contain'}
						style={{ width: 200, height: 300 }}
						source={renderImgForStatuses(statusOrder)}
					/>
				</Box>
				{!isCanceled && (
					<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-evenly'} mt={2}>
						<OrderStatusBar status={statusOrder} />
					</Box>
				)}

				{!isCanceled && order?.courier && (
					<Box mt={2}>
						<Text fontSize={18} color={colors.black} fontWeight={'600'}>
							{t('yourCourier')}
						</Text>

						<Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
							<Box>
								<Text fontSize={15} color={colors.gray}>
									{order.courier?.firstName} {order.courier?.lastName}
								</Text>
								<TouchableOpacity onPress={handlePhonePress}>
									<Text fontSize={15} color={colors.blueLightMedium}>
										{order.courier?.phone}
									</Text>
								</TouchableOpacity>
							</Box>
							<TouchableOpacity onPress={handlePhonePress}>
								<Feather name="phone" size={26} color={colors.blueLightMedium} />
							</TouchableOpacity>
						</Box>
					</Box>
				)}
			</Box>
			<Box
				style={Platform.OS === 'android' && styles.shadow}
				mt={3}
				borderTopRightRadius={16}
				borderTopLeftRadius={16}
				height={90}
				flex={1}
				justifyContent={'center'}
				w={'100%'}
			>
				<Box w={'100%'} height={54} paddingX={5}>
					<Button
						title={t('backToHome')}
						styleText={{ color: colors.black, fontSize: 14, fontWeight: 600 }}
						backgroundColor={colors.grayLightWhite}
						styleContainer={styles.styleContainer}
						onPress={onPressGoToStores}
					></Button>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})


const styles = StyleSheet.create({
	styleContainerBtn: {
		backgroundColor: colors.green,
		width: '100%',
	},
	shadow: {
		backgroundColor: colors.white,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 18,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10.0,
		elevation: 24,
	},
	styleContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 54,
	},
})

export default OrderStatusesS
