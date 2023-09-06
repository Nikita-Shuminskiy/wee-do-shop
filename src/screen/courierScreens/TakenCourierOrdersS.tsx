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
import { StatusType } from '../../api/ordersApi'

type TakenCourierOrdersProps = {
	navigation: NavigationProp<ParamListBase>
}

const TakenCourierOrdersS = observer(({ navigation }: TakenCourierOrdersProps) => {
	const { CourierOrderService, CourierOrderStore } = rootStore
	const { takenCourierOrders, setSelectedOrder } = CourierOrderStore
	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = () => {
		setRefreshing(true)
		CourierOrderService.getTakenCourierOrders().finally(() => {
			setRefreshing(false)
		})
	}
	const orderViews = ({ item }: { item: OrderCourierType }) => {
		if (item.status === StatusType.Completed) return
		const onPressTakeOrder = () => {
			setSelectedOrder(item)
			navigation.navigate(routerConstants.COURIER_PICK_ORDER)
		}
		return <OrderCourierViewer isMyOrder={true} onPressTakeOrder={onPressTakeOrder} order={item} />
	}
	useEffect(() => {
		CourierOrderService.getTakenCourierOrders()
	}, [])

	return (
		<BaseWrapperComponent>
			<Box w={'100%'} flex={1}>
				<Box alignItems={'center'} mt={2}>
					<Text fontSize={28} fontWeight={'700'}>
						My Orders
					</Text>
				</Box>
				<Box mt={5} alignItems={'center'} flex={1} w={'100%'}>
					<FlatList
						data={takenCourierOrders.filter(el => el.status !== StatusType.Completed)}
						renderItem={orderViews}
						keyExtractor={(item, index) => item._id?.toString()}
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
export default TakenCourierOrdersS;
