import React, {useEffect} from 'react';
import {Box, Text} from "native-base";
import {observer} from "mobx-react-lite";
import orderStore from "../../store/OrderStore/order-store";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import closeImg from '../../assets/images/close.png'
import placedImg from '../../assets/images/orderImg/placed.png'
import preparedImg from '../../assets/images/orderImg/prepared.png'
import waitingForPickImg from '../../assets/images/orderImg/waitingForPick.png'
import courierImg from '../../assets/images/orderImg/courier.png'
import arrivedImg from '../../assets/images/orderImg/arrived.png'
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {colors} from "../../assets/colors/colors";
import {StatusType} from "../../api/ordersApi";
import io from 'socket.io-client';
import OrderStatusBar from "../../components/OrderStatusBar";
import Button from "../../components/Button";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {routerConstants} from "../../constants/routerConstants";
import {BASE_URL} from "../../api/config";
import {splittingWord} from "../../utils/utils";


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
            return placedImg
        default:
            return placedImg
    }
}
const renderDescriptionForStatuses = (status: StatusType) => {
    switch (status) {
        case StatusType.Placed:
            return <>
                <Text fontSize={24} fontWeight={'600'}>Order{' '}{splittingWord(status)}</Text>
                <Text color={colors.gray}>
                    The Store received the order, confirmation confirmation</Text>
            </>
        case StatusType.Confirmed:
            return <>
                <Text fontSize={24} fontWeight={'600'}>Order{' '}{splittingWord(status)}</Text>
                <Text color={colors.gray}>
                    The store approved the order</Text>
            </>
        case StatusType.WaitingForPickUp:
            return <>
                <Text fontSize={24} fontWeight={'600'}>Order{' '}{splittingWord(status)}</Text>
                <Text color={colors.gray}>
                    The courier picks up your order</Text>
            </>
        case StatusType.OnTheWay:
            return <>
                <Text fontSize={24} fontWeight={'600'}>Order{' '}{splittingWord(status)}</Text>
                <Text color={colors.gray}>
                    Courier on the way</Text>
            </>
        case StatusType.Completed:
            return <>
                <Text fontSize={24} fontWeight={'600'}>Order{' '}{splittingWord(status)}</Text>
                <Text color={colors.gray}>
                    Order delivered</Text>
            </>
        case StatusType.Canceled:
            return <>
                <Text fontSize={24} fontWeight={'600'}>{splittingWord(status)}</Text>
                <Text color={colors.gray}>
                    Order canceled, wait for a call from the store</Text>
            </>
        default:
            return placedImg
    }
}

type OrderStatusesSProps = {
    navigation: NavigationProp<ParamListBase>
}
const OrderStatusesS = observer(({navigation}: OrderStatusesSProps) => {
    const {order, statusOrder, setStatus} = orderStore
    console.log(order._id)
    useEffect(() => {
        const socket = io(BASE_URL);
        socket.on('connect', () => {
        });
        socket.on(`orderStatusUpdated:${order._id}`, (data: { orderId: string, status: StatusType }) => {
            setStatus(data.status)
        })
    }, []);

    const onPressClose = () => {
        navigation.navigate(routerConstants.ORDERS, {from: 'statuses'})
    }
    const isCanceled = statusOrder === StatusType.Canceled
    return (
        <BaseWrapperComponent backgroundColor={colors.white} isKeyboardAwareScrollView={!isCanceled}>
            <Box paddingX={5} mt={5} justifyContent={'space-evenly'} flex={1}>
                <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box alignItems={'center'}>
                        <TouchableOpacity onPress={onPressClose}>
                            <Image alt={'close'} source={closeImg}/>
                        </TouchableOpacity>
                    </Box>
                    <Box alignItems={'center'}>
                        <Text fontSize={22} fontWeight={'500'}>{order?.store?.name}</Text>
                    </Box>

                </Box>
                {
                    isCanceled ? (
                        <Box flex={2} justifyContent={'center'} alignItems={'center'}>
                            <Text fontSize={24} fontWeight={'600'}>{splittingWord(statusOrder)}</Text>
                            <Text color={colors.gray}>
                                Order canceled, wait for a call from the store</Text>
                            <Button styleContainer={styles.styleContainerBtn} onPress={onPressClose}
                                    title={'Go to orders '}/>
                        </Box>
                    ) : (
                        <>
                            <Box mt={5} alignItems={'center'} justifyContent={'center'}>
                                <Image alt={'img'}
                                       source={renderImgForStatuses(statusOrder)}/>
                            </Box>
                            <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-evenly'} mt={5}>
                                <OrderStatusBar status={statusOrder}/>
                            </Box>
                            <Box mt={5} alignItems={'center'}>
                                {renderDescriptionForStatuses(statusOrder)}
                            </Box>
                        </>
                    )
                }
            </Box>
        </BaseWrapperComponent>
    );
})

const styles = StyleSheet.create({
    styleContainerBtn: {
        backgroundColor: colors.green,
        width: '100%',
    }
})
export default OrderStatusesS;
