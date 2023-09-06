import React, { useEffect, useState } from 'react'
import rootStore from '../../store/RootStore/root-store'
import { OrderCourierType } from '../../api/couierApi'
import { routerConstants } from '../../constants/routerConstants'
import OrderCourierViewer from '../../components/list-viewer/OrderCourierViewer'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { renderEmptyContainer } from '../../components/list-viewer/empty-list'
import { StatusType } from '../../api/ordersApi'
import Button from '../../components/Button'
import { colors } from '../../assets/colors/colors'
import {
	addDays,
	addMonths,
	addWeeks,
	format,
	setHours,
	setMinutes,
	startOfDay,
	subDays,
	subMonths,
} from 'date-fns'

enum PeriodEnum {
	DAY_1 = '1Day',
	DAYS_7 = '7Days',
	MONTH_1 = '1Month',
}

type TakenCourierOrdersProps = {
	navigation: NavigationProp<ParamListBase>
}
const CompletedOrdersS = observer(({ navigation }: TakenCourierOrdersProps) => {
	const { CourierOrderService, CourierOrderStore } = rootStore
	const { takenCourierOrders, setSelectedOrder } = CourierOrderStore
	const [currentActiveBtn, setCurrentActiveBtn] = useState<PeriodEnum>(PeriodEnum.DAY_1)
	const [refreshing, setRefreshing] = useState(false)
	const onRefresh = () => {
		setRefreshing(true)
		CourierOrderService.getTakenCourierOrders({ status: StatusType.Completed }).finally(() => {
			setRefreshing(false)
		})
	}

	const orderViews = ({ item }: { item: OrderCourierType }) => {
		const onPressTakeOrder = () => {
			setSelectedOrder(item)
			navigation.navigate(routerConstants.COURIER_PICK_ORDER)
		}
		return (
			<OrderCourierViewer
				isCompletedOrder={true}
				isMyOrder={true}
				onPressTakeOrder={onPressTakeOrder}
				order={item}
			/>
		)
	}
	useEffect(() => {
		onPressShowHistory(PeriodEnum.DAY_1)
	}, [])
	const onPressShowHistory = (period: PeriodEnum) => {
		let startDate
		let endDate
		const currentDate = new Date()
		if (period === PeriodEnum.DAY_1) {
			startDate = setMinutes(setHours(startOfDay(currentDate), 0), 0)
			endDate = currentDate
		} else if (period === PeriodEnum.DAYS_7) {
			startDate = setMinutes(setHours(startOfDay(subDays(currentDate, 6)), 0), 0)
			endDate = currentDate
		} else if (period === PeriodEnum.MONTH_1) {
			startDate = setMinutes(setHours(startOfDay(subMonths(currentDate, 1)), 0), 0)
			endDate = currentDate
		}

		const isoStartDate = startDate.toISOString()
		const isoEndDate = endDate.toISOString()
		CourierOrderService.getTakenCourierOrders({
			status: StatusType.Completed,
			startDate: isoStartDate,
			endDate: isoEndDate,
		})
		setCurrentActiveBtn(period)
	}
	const activeBtnStyle = { borderWidth: 1, borderColor: colors.green }
	return (
		<BaseWrapperComponent>
			<Box w={'100%'} flex={1}>
				<Box alignItems={'center'} mt={2}>
					<Text fontSize={28} fontWeight={'700'}>
						Completed order
					</Text>
					<Box mt={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
						<Box>
							<Button
								styleText={{ color: colors.black }}
								backgroundColor={colors.grayLight}
								styleContainer={currentActiveBtn === PeriodEnum.DAY_1 && activeBtnStyle}
								onPress={() => onPressShowHistory(PeriodEnum.DAY_1)}
								title={'1 day'}
							/>
						</Box>
						<Box ml={1}>
							<Button
								styleText={{ color: colors.black }}
								backgroundColor={colors.grayLight}
								styleContainer={currentActiveBtn === PeriodEnum.DAYS_7 && activeBtnStyle}
								onPress={() => onPressShowHistory(PeriodEnum.DAYS_7)}
								title={'7 days'}
							/>
						</Box>
						<Box ml={1}>
							<Button
								styleText={{ color: colors.black }}
								backgroundColor={colors.grayLight}
								styleContainer={currentActiveBtn === PeriodEnum.MONTH_1 && activeBtnStyle}
								onPress={() => onPressShowHistory(PeriodEnum.MONTH_1)}
								title={'1 month'}
							/>
						</Box>
					</Box>
				</Box>
				<Box mt={2} alignItems={'center'} flex={1} w={'100%'}>
					<FlatList
						data={takenCourierOrders ?? []}
						renderItem={orderViews}
						scrollEnabled={true}
						keyExtractor={(item, index) => index?.toString()}
						style={{ width: '100%' }}
						contentContainerStyle={!takenCourierOrders.length && styles.contentContainerOrder}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
						ListEmptyComponent={() => renderEmptyContainer(500, 'No orders.')}
					/>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})
const styles = StyleSheet.create({
	contentContainerOrder: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
export default CompletedOrdersS;
