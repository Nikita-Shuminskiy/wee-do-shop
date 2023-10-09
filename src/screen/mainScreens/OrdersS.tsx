import React, { useCallback, useEffect, useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import orderStore from '../../store/OrderStore/order-store'
import rootStore from '../../store/RootStore/root-store'
import { Box, Text } from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import arrowLeftBack from '../../assets/images/arrow-left.png'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { colors } from '../../assets/colors/colors'
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { ApiOrderType, StatusType } from '../../api/ordersApi'
import OrderViewer from '../../components/list-viewer/OrderViewer'
import { observer } from 'mobx-react-lite'
import PopUpOrderDetails from '../../components/modalPopUp/PopUpOrderDetails'
import { routerConstants } from '../../constants/routerConstants'
import cartStore from '../../store/CartStore/cart-store'
import { renderEmptyContainer } from '../../components/list-viewer/empty-list'
import { getTotalSumProductsCart } from '../../utils/utilsCart'
import Loading from '../../components/Loading'

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
	const isLastOrders = !!(totalOrders && orders.length) && totalOrders <= orders.length
	const ordersLength = orders?.length

	const limit = 50
	const offset = (page - 1) * limit
	const requestAPI = () => {
		setLoadingData(true)
		OrderService.getOrders({
			limit,
			offset,
		})
			.then(() => {
				setPage((prevState) => prevState + 1)
			})
			.finally(() => {
				setLoadingData(false)
			})
	}
	useEffect(() => {
		return () => {
			setPage(1)
			setClearOrders()
		}
	}, [])
	const onPressGoBack = () => {
		navigation.navigate(isFromStatusesScreen ? routerConstants.HOME : routerConstants.PROFILE_USER)
	}
	const onPressRepeat = useCallback((item: ApiOrderType) => {
		const getProductsForOrder = item.products.map((product) => {
			return { amount: product.amount, ...product.product }
		})
		const gettotalSum = getTotalSumProductsCart(getProductsForOrder)
		setToCartStore({
			idStore: item.store._id,
			products: getProductsForOrder,
			storeName: item.store.name,
			totalSum: gettotalSum,
			deliviryTime: item.store.deliveryTime,
		})
		navigation.navigate(routerConstants.CART)
	}, [])
	const onClosePopUpAboutStore = () => {
		setIsShowPopupDetails(false)
	}
	const onPressDetails = useCallback((order) => {
		setSelectedOrder(order)
		setIsShowPopupDetails(true)
	}, [])
	const orderViews = useCallback(({ item }: { item: ApiOrderType }) => {
		if (isRoutHistory && item.status === StatusType.Canceled) return

		return (
			<OrderViewer onPressRepeat={onPressRepeat} onPressDetails={onPressDetails} order={item} />
		)
	}, [])

	const renderFooter = () => (
		<Box style={styles.footerText}>
			{isLoadingData && <ActivityIndicator size={'small'} color={colors.green} />}
			{isLastOrders && orders.length >= totalOrders ? (
				<Text color={colors.gray} fontWeight={'500'} fontSize={15}>
					No more orders at the moment
				</Text>
			) : (
				!isLoadingData && (
					<TouchableOpacity onPress={fetchMoreData}>
						<Text color={colors.green} fontSize={20} fontWeight={'500'}>
							Load more
						</Text>
					</TouchableOpacity>
				)
			)}
		</Box>
	)
	const fetchMoreData = () => {
		if (isLastOrders || isLoadingData) return
		console.log('requestAPI')
		requestAPI()
	}
	const getHomeData = () => {
		OrderService.getOrders({
			limit,
			offset,
		})
	}
	useEffect(() => {
		requestAPI()
	}, [])
	return (
		<>
			<BaseWrapperComponent
				onRefreshHandler={getHomeData}
				backgroundColor={colors.white}
				isKeyboardAwareScrollView={true}
			>
				<Box flexDirection={'row'} mt={5} justifyContent={'space-between'} alignItems={'center'}>
					{!isRoutHistory && (
						<Box mb={5} zIndex={10} position={'absolute'} left={5}>
							<ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack} />
						</Box>
					)}
					<Box w={'100%'} alignItems={'center'}>
						<Text fontSize={28} fontWeight={'700'}>
							{' '}
							{!isRoutHistory ? 'History' : 'Orders'}
						</Text>
					</Box>
				</Box>
				<Box mt={5} alignItems={'center'} flex={1} w={'100%'}>
					<FlatList
						scrollEnabled={false}
						data={orders}
						renderItem={orderViews}
						keyExtractor={(item, index) => item._id?.toString()}
						style={{ width: '100%' }}
						contentContainerStyle={!ordersLength && styles.contentContainerOrder}
						ListFooterComponent={orders.length ? renderFooter : null}
						ListEmptyComponent={() =>
							renderEmptyContainer(0, 'You haven’t placed\n any orders yet.')
						}
					/>
				</Box>
			</BaseWrapperComponent>
			{isShowPopupDetails && (
				<PopUpOrderDetails
					onPressRepeat={onPressRepeat}
					order={selectedOrder}
					show={isShowPopupDetails}
					onClose={onClosePopUpAboutStore}
				/>
			)}
		</>
	)
})
const styles = StyleSheet.create({
	footerText: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentContainerOrder: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
export default OrdersS
