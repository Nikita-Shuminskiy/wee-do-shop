import React, { useEffect, useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { renderEmptyContainer } from '../../components/list-viewer/empty-list'
import OrderCourierViewer from '../../components/list-viewer/OrderCourierViewer'
import rootStore from '../../store/RootStore/root-store'
import { OrderCourierType } from '../../api/couierApi'
import { observer } from 'mobx-react-lite'
import { routerConstants } from '../../constants/routerConstants'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useRefreshing } from '../../utils/hook/useRefreshing'

type CourierOrdersProps = {
	navigation: NavigationProp<ParamListBase>
}

const CourierOrders = observer(({ navigation }: CourierOrdersProps) => {
	const { CourierOrderService, CourierOrderStore } = rootStore
	const { courierOrders, setSelectedOrder } = CourierOrderStore
	const onRefreshHandler = async () => {
		await CourierOrderService.getCourierOrders()
	}
	const { refreshing, onRefresh } = useRefreshing(onRefreshHandler)
	const orderViews = ({ item }: { item: OrderCourierType }) => {
		const onPressTakeOrder = () => {
			setSelectedOrder(item)
			CourierOrderService.assignCourierOrder().then((data) => {
				if (!!data) {
					navigation.navigate(routerConstants.COURIER_PICK_ORDER)
				}
			})
		}
		const onPressInfoOrder = () => {
			setSelectedOrder(item)
			navigation.navigate(routerConstants.COURIER_PICK_ORDER, { checkInfo: true })
		}
		return (
			<OrderCourierViewer
				onPressInfoOrder={onPressInfoOrder}
				onPressTakeOrder={onPressTakeOrder}
				order={item}
			/>
		)
	}
	useEffect(() => {
		CourierOrderService.getCourierOrders()
		const id = +setInterval(() => {
			CourierOrderService.getCourierOrders()
		}, 5000)
		return () => {
			clearInterval(id)
		}
	}, [])

	return (
		<BaseWrapperComponent>
			<Box w={'100%'} flex={1}>
				<Box paddingX={5} w={'100%'} alignItems={'center'}>
					<Text fontSize={28} fontWeight={'700'}>
						Orders
					</Text>
				</Box>
				<Box mt={5} alignItems={'center'} flex={1} w={'100%'}>
					<FlatList
						data={courierOrders ?? []}
						renderItem={orderViews}
						keyExtractor={(item, index) => index?.toString()}
						style={{ width: '100%' }}
						contentContainerStyle={!courierOrders.length && styles.contentContainerOrder}
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
export default CourierOrders
