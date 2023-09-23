import React, { useEffect, useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import orderStore from '../../store/OrderStore/order-store'
import rootStore from '../../store/RootStore/root-store'
import { Box, Text } from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import arrowLeftBack from '../../assets/images/arrow-left.png'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { colors } from '../../assets/colors/colors'
import { FlatList, StyleSheet } from 'react-native'
import { ApiOrderType, StatusType } from '../../api/ordersApi'
import OrderViewer from '../../components/list-viewer/OrderViewer'
import { observer } from 'mobx-react-lite'
import PopUpOrderDetails from '../../components/modalPopUp/PopUpOrderDetails'
import { routerConstants } from '../../constants/routerConstants'
import cartStore from '../../store/CartStore/cart-store'
import { renderEmptyContainer } from '../../components/list-viewer/empty-list'

type OrdersSProps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}
const OrdersS = observer(({ navigation, route }: OrdersSProps) => {
	const isRoutHistory = route.name === routerConstants.HISTORY
	const isFromStatusesScreen = route?.params?.from === 'statuses'

	const { setToCartStore } = cartStore
	const { orders, setClearOrders, totalOrders } = orderStore
	const { OrderService } = rootStore
	const [isShowPopupDetails, setIsShowPopupDetails] = useState<boolean>(false)
	const [selectedOrder, setSelectedOrder] = useState<ApiOrderType>()

	const [page, setPage] = useState(1)
	const [isLoadingData, setLoadingData] = useState(false)

	const ordersLength = orders?.length
	const requestAPI = () => {
		setLoadingData(true)
		const offset = (page - 1) * 40
		OrderService.getOrders({
			status: isRoutHistory ? StatusType.Completed : null,
			limit: 40,
			offset,
		}).finally(() => {
			setLoadingData(false)
		})
	}

	useEffect(() => {
		requestAPI()
	}, [page])

	useEffect(() => {
		return () => {
			setPage(1)
			setClearOrders()
		}
	}, [])

	const onPressGoBack = () => {
		navigation.navigate(isFromStatusesScreen ? routerConstants.HOME : routerConstants.PROFILE_USER)
	}
	const onPressRepeat = (item: ApiOrderType) => {
		const getProductsForOrder = item.products.map((product) => {
			return { amount: product.amount, ...product.product }
		})
		setToCartStore({
			idStore: item.store._id,
			products: getProductsForOrder,
			storeName: item.store.name,
			totalSum: item.totalPrice,
			deliviryTime: item.store.deliveryTime,
		})
		navigation.navigate(routerConstants.CART)
	}
	const onClosePopUpAboutStore = () => {
		setIsShowPopupDetails(false)
	}
	const orderViews = ({ item }: { item: ApiOrderType }) => {
		if (item.status === StatusType.Completed && !isRoutHistory) return
		const onPressDetails = () => {
			setSelectedOrder(item)
			setIsShowPopupDetails(true)
		}

		return (
			<OrderViewer
				onPressRepeat={() => onPressRepeat(item)}
				onPressDetails={onPressDetails}
				order={item}
			/>
		)
	}
	const isLastOrders = !!(totalOrders && orders.length) && totalOrders <= orders.length

	const renderFooter = () => (
		<Box style={styles.footerText}>
			{/*{isLoadingData && <Loading visible={isLoadingData} />}*/}
			{isLastOrders && orders.length >= 10 && (
				<Text color={colors.gray} fontWeight={'500'} fontSize={15}>
					No more orders at the moment
				</Text>
			)}
		</Box>
	)

	const fetchMoreData = () => {
		if (isLastOrders || isLoadingData) return
		setPage(page + 1)
	}
	return (
		<>
			<BaseWrapperComponent backgroundColor={colors.white} isKeyboardAwareScrollView={false}>
				<Box flexDirection={'row'} mt={5} justifyContent={'space-between'} alignItems={'center'}>
					{!isRoutHistory && (
						<Box mb={5} position={'absolute'} left={5}>
							<ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack} />
						</Box>
					)}

					<Box w={'100%'} alignItems={'center'}>
						<Text fontSize={28} fontWeight={'700'}>
							{' '}
							{isRoutHistory ? 'History' : 'Orders'}
						</Text>
					</Box>
				</Box>
				<Box mt={5} alignItems={'center'} flex={1} w={'100%'}>
					<FlatList
						data={orders}
						renderItem={orderViews}
						keyExtractor={(item, index) => item._id?.toString()}
						style={{ width: '100%' }}
						contentContainerStyle={!ordersLength && styles.contentContainerOrder}
						ListFooterComponent={orders.length ? renderFooter : null}
						ListEmptyComponent={() =>
							renderEmptyContainer(0, 'You haven’t placed\n any orders yet.')
						}
						onEndReached={fetchMoreData}
						onEndReachedThreshold={0.5}
					/>
				</Box>
			</BaseWrapperComponent>
			<PopUpOrderDetails
				onPressRepeat={onPressRepeat}
				order={selectedOrder}
				show={isShowPopupDetails}
				onClose={onClosePopUpAboutStore}
			/>
		</>
	)
})
const styles = StyleSheet.create({
	footerText: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 2,
	},
	contentContainerOrder: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
export default OrdersS
