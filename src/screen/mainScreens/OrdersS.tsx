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
import { isCurrentTimeWorkStoreRange } from "../../utils/utils";
import { alertStoreClosed } from "../../components/list-viewer/utils";
import AuthStore from "../../store/AuthStore/auth-store";
import { useTranslation } from "react-i18next";
import { Skeleton } from "moti/skeleton";
import { SkeletonCommonProps } from "../../utils/common";
import SkeletonExpo from "moti/build/skeleton/expo";
import Spacer from "../../components/Specer";

type OrdersSProps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}
const OrdersS = observer(({ navigation, route }: OrdersSProps) => {
	const isRoutHistory = route.name === routerConstants.HISTORY
	const isFromStatusesScreen = route?.params?.from === 'statuses'
	const {t} = useTranslation(['orders', 'common']);
	const { setToCartStore } = cartStore
	const { orders, setClearOrders, totalOrders } = orderStore
	const { isAuth } = AuthStore
	const { OrderService } = rootStore
	const [isShowPopupDetails, setIsShowPopupDetails] = useState<boolean>(false)
	const [selectedOrder, setSelectedOrder] = useState<ApiOrderType>()

	const [page, setPage] = useState(1)
	const [isLoadingData, setLoadingData] = useState(false)
	const [isLoadDataOrders, setIsLoadDataOrders] = useState(false)
	const isLastOrders = !!(totalOrders && orders.length) && totalOrders <= orders.length
	const ordersLength = orders?.length

	const limit = 50
	const offset = (page - 1) * limit
	const onRefreshHandler = () => {
		setLoadingData(true)
		OrderService.getOrders({
			limit: ordersLength,
		})
			.then((data) => {})
			.finally(() => {
				setLoadingData(false)
			})
	}
	const requestAPI = () => {
		if(!isAuth) return
		setLoadingData(true)
		OrderService.getOrders({
			limit,
			offset,
		})
			.then((data) => {
				if (!!data.results?.length) {
					setPage((prevState) => prevState + 1)
				}
			})
			.finally(() => {
				setLoadingData(false)
				setIsLoadDataOrders(true)
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
		const isOpenStoreNow = isCurrentTimeWorkStoreRange(item?.store?.workingHours)
		if(!isOpenStoreNow) {
			alertStoreClosed()
			return
		}
		const filterDeletedProduct = item.products.filter((product) => !product.product.isDeleted)
		if (!filterDeletedProduct.length) return
		const getProductsForOrder = filterDeletedProduct.map((product) => {
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
		if ((isRoutHistory && item.status === StatusType.Canceled) || !item?.store?.name) return
		return (
			<OrderViewer onPressRepeat={onPressRepeat} onPressDetails={onPressDetails} order={item} />
		)
	}, [isRoutHistory])

	const renderFooter = () => (
		<Box style={styles.footerText}>
			{isLoadingData && <ActivityIndicator size={'small'} color={colors.green} />}
			{isLastOrders && orders.length >= totalOrders
				? orders.length > 20 && (
						<Text color={colors.gray} fontWeight={'500'} fontSize={13}>
							No more orders at the moment
						</Text>
				  )
				: !isLoadingData && (
						<TouchableOpacity onPress={requestAPI}>
							<Text color={colors.green} fontSize={20} fontWeight={'500'}>
								{t('loadMore')}
							</Text>
						</TouchableOpacity>
				  )}
		</Box>
	)
	useEffect(() => {
		requestAPI()
	}, [])

	return (
		<>
			<BaseWrapperComponent
				//onRefreshHandler={onRefreshHandler}
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
							{!isRoutHistory ? t('history') : t('orders')}
						</Text>
					</Box>
				</Box>
				<Box mt={5} alignItems={'center'} flex={1} w={'100%'}>
					{
						isLoadDataOrders ? 	<FlatList
							scrollEnabled={false}
							data={orders}
							renderItem={orderViews}
							keyExtractor={(item, index) => item._id?.toString()}
							style={{ width: '100%' }}
							contentContainerStyle={!ordersLength && styles.contentContainerOrder}
							ListFooterComponent={orders.length ? renderFooter : null}
							ListEmptyComponent={() =>
								renderEmptyContainer(0, t('youHaveNotOrders'))
							}
						/> : (
							<Box paddingX={4}>
								<Skeleton.Group show={true}>
									<Skeleton height={90} width={'100%'} show={true} { ...SkeletonCommonProps }>
										<Box alignItems={'flex-end'} height={85} flexDirection={'row'} justifyContent={'space-evenly'}>
											<Skeleton height={30} width={150} {...SkeletonCommonProps} />
											<Skeleton height={30} width={150} {...SkeletonCommonProps} />
										</Box>
									</Skeleton>
								</Skeleton.Group>
								<Spacer height={8} />
								<Skeleton.Group show={true}>
									<Skeleton height={90} width={'100%'} show={true} { ...SkeletonCommonProps }>
										<Box alignItems={'flex-end'} height={85} flexDirection={'row'} justifyContent={'space-evenly'}>
											<Skeleton height={30} width={150} {...SkeletonCommonProps} />
											<Skeleton height={30} width={150} {...SkeletonCommonProps} />
										</Box>
									</Skeleton>
								</Skeleton.Group>
								<Spacer height={8} />
								<Skeleton.Group show={true}>
									<Skeleton height={90} width={'100%'} show={true} { ...SkeletonCommonProps }>
										<Box alignItems={'flex-end'} height={85} flexDirection={'row'} justifyContent={'space-evenly'}>
											<Skeleton height={30} width={150} {...SkeletonCommonProps} />
											<Skeleton height={30} width={150} {...SkeletonCommonProps} />
										</Box>
									</Skeleton>
								</Skeleton.Group>
								<Spacer height={8} />
							</Box>
						)
					}

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
