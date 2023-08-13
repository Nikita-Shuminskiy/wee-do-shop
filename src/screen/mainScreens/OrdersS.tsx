import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import orderStore from "../../store/OrderStore/order-store";
import rootStore from "../../store/RootStore/root-store";
import {Box, Text} from "native-base";
import ArrowBack from "../../components/ArrowBack";
import arrowLeftBack from "../../assets/images/arrow-left.png";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {colors} from "../../assets/colors/colors";
import {FlatList, RefreshControl, StyleSheet} from "react-native";
import {ApiOrderType, StatusType} from "../../api/ordersApi";
import OrderViewer from "../../components/list-viewer/OrderViewer";
import {observer} from "mobx-react-lite";
import PopUpOrderDetails from "../../components/modalPopUp/PopUpOrderDetails";
import {routerConstants} from "../../constants/routerConstants";
import cartStore from "../../store/CartStore/cart-store";
import {renderEmptyContainer} from "../../components/list-viewer/empty-list";


type OrdersSProps = {
    navigation: NavigationProp<ParamListBase>
    route: any
}
const OrdersS = observer(({navigation, route}: OrdersSProps) => {
    const isRoutHistory = route.name === routerConstants.HISTORY
    const {orders} = orderStore
    const {OrderService} = rootStore
    const getOrders = () => {
        OrderService.getOrders(isRoutHistory ? StatusType.Completed : null)
    }
    const {setToCartStore} = cartStore
    useEffect(() => {
        getOrders()
    }, [])

    const onPressGoBack = () => {
        navigation.navigate(routerConstants.PROFILE_USER)
    }
    const [isShowPopupDetails, setIsShowPopupDetails] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<ApiOrderType>()

    const onPressRepeat = (item: ApiOrderType) => {
        const getProductsForOrder = item.products.map((product) => {
            return {amount: product.amount, ...product.product}
        })
        setToCartStore({
            idStore: item.store._id,
            products: getProductsForOrder,
            storeName: item.store.name,
            totalSum: item.totalPrice
        })
        navigation.navigate(routerConstants.CART)
    }
    const onClosePopUpAboutStore = () => {
        setIsShowPopupDetails(false)
    }

    const orderViews = ({item}: { item: ApiOrderType }) => {
        const onPressDetails = () => {
            setSelectedOrder(item)
            setIsShowPopupDetails(true)
        }

        return (
            <OrderViewer
                onPressRepeat={() => onPressRepeat(item)}
                // selectedSubCategoryId={selectedSubCategoryId}
                onPressDetails={onPressDetails}
                order={item}
            />
        )
    }
    const ordersLength = orders?.length
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true)
        OrderService.getOrders().finally(() => {
            setRefreshing(false)
        })
    };
    return (
        <>
            <BaseWrapperComponent backgroundColor={colors.white} isKeyboardAwareScrollView={false}>
                <Box flexDirection={'row'} mt={5} justifyContent={'space-between'} alignItems={'center'}>
                    {
                        !isRoutHistory && <Box mb={5} position={'absolute'} left={5}>
                            <ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack}/>
                        </Box>
                    }

                    <Box w={'100%'} alignItems={'center'}>
                        <Text fontSize={28} fontWeight={'700'}> {isRoutHistory ? 'History' : 'Orders'}</Text>
                    </Box>
                </Box>
                <Box mt={5} alignItems={'center'} flex={1} w={'100%'}>
                    <FlatList
                        data={orders ?? []}
                        renderItem={orderViews}
                        keyExtractor={(item, index) => index?.toString()}
                        style={{width: '100%'}}
                        contentContainerStyle={
                            !ordersLength &&
                            styles.contentContainerOrder
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        ListEmptyComponent={() => renderEmptyContainer(0, 'You haven’t placed\n any orders yet.')}
                    />
                </Box>
            </BaseWrapperComponent>
            <PopUpOrderDetails onPressRepeat={onPressRepeat}
                               order={selectedOrder}
                               show={isShowPopupDetails}
                               onClose={onClosePopUpAboutStore}/>
        </>
    );
})
const styles = StyleSheet.create({
    contentContainerOrder: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default OrdersS;
