import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import orderStore from "../../store/OrderStore/order-store";
import rootStore from "../../store/RootStore/root-store";
import {Box, Text} from "native-base";
import ArrowBack from "../../components/ArrowBack";
import arrowLeftBack from "../../assets/images/arrow-left.png";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {colors} from "../../assets/colors/colors";
import {FlatList, StyleSheet} from "react-native";
import EmptyList from "../../components/list-viewer/empty-list";

import {ApiOrderType} from "../../api/ordersApi";
import OrderViewer from "../../components/list-viewer/OrderViewer";
import {observer} from "mobx-react-lite";
import PopUpOrderDetails from "../../components/modalPopUp/PopUpOrderDetails";
import {routerConstants} from "../../constants/routerConstants";

const renderEmptyContainer = (height, text) => {
    const onPressLink = () => {
    }
    return (
        <EmptyList
            height={height}
            text={text}
            onPressLink={onPressLink}
        />
    )
}
type OrdersSProps = {
    navigation: NavigationProp<ParamListBase>
}
const OrdersS = observer(({navigation}: OrdersSProps) => {
    const {orders} = orderStore
    const {OrderService} = rootStore
    useEffect(() => {
        OrderService.getOrders()
    }, [])

    const onPressGoBack = () => {
        navigation.navigate(routerConstants.MAIN)
    }
    const [isShowPopupDetails, setIsShowPopupDetails] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<ApiOrderType>()

    const onPressRepeat = () => {

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
                // selectedSubCategoryId={selectedSubCategoryId}
                onPressDetails={onPressDetails}
                order={item}
            />
        )
    }
    const ordersLength = orders?.length
    return (
        <>
            <BaseWrapperComponent backgroundColor={colors.white} isKeyboardAwareScrollView={true}>
                <Box flexDirection={'row'} mt={5} justifyContent={'space-between'} alignItems={'center'}>
                    <Box mb={5} position={'absolute'} left={5}>
                        <ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack}/>
                    </Box>
                    <Box w={'100%'} alignItems={'center'}>
                        <Text fontSize={28} fontWeight={'700'}>Orders</Text>
                    </Box>
                </Box>
                <Box mt={5} alignItems={'center'}>
                    <FlatList
                        data={orders ?? []}
                        renderItem={orderViews}
                        keyExtractor={(item, index) => item?._id.toString()}
                        style={{width: '100%'}}
                        contentContainerStyle={
                            !ordersLength &&
                            styles.contentContainerOrder
                        }
                        ListEmptyComponent={() => renderEmptyContainer(0, '')}
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
