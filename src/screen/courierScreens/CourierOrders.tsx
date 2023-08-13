import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box, Text} from "native-base";
import {FlatList, RefreshControl, StyleSheet, TouchableOpacity} from "react-native";
import {renderEmptyContainer} from "../../components/list-viewer/empty-list";
import {ApiOrderType} from "../../api/ordersApi";
import OrderViewer from "../../components/list-viewer/OrderViewer";
import OrderCourierViewer from "../../components/list-viewer/OrderCourierViewer";
import AuthStore from "../../store/AuthStore/auth-store";

const CourierOrders = () => {
    const {logOut} = AuthStore
    const [refreshing, setRefreshing] = useState(false);
    const onPressHiddenOrders = () => {

    }
    const onRefresh = () => {
        setRefreshing(true)
        /*  OrderService.getOrders().finally(() => {
              setRefreshing(false)
          })*/
    };

    const orderViews = ({item}: { item: any }) => {
        const onPressDetails = () => {

        }

        return (
            <OrderCourierViewer order={item}/>
        )
    }
  /*  useEffect(() => {
        logOut()
    }, [])*/
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box>
                <Box paddingX={5} w={'100%'} alignItems={'center'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Text fontSize={28} fontWeight={'700'}>Placed orders</Text>
                    </Box>
                    <Box>
                        <TouchableOpacity onPress={onPressHiddenOrders}>
                            <Text fontSize={15} borderBottomWidth={1} fontWeight={'500'}>{`Hidden (${3})`}</Text>
                        </TouchableOpacity>
                    </Box>
                </Box>

                <Box mt={5} alignItems={'center'} flex={1} w={'100%'}>
                    <FlatList
                        data={[1,2,3,4]}
                        renderItem={orderViews}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => item?.toString()}
                        style={{width: '100%'}}
                      /*  contentContainerStyle={
                            !ordersLength &&
                            styles.contentContainerOrder
                        }*/
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        ListEmptyComponent={() => renderEmptyContainer(0, 'No orders.')}
                    />
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    contentContainerOrder: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default CourierOrders;
