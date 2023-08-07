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

        // временно
        case StatusType.Canceled:
            return placedImg
        default:
            return placedImg
    }
}


const OrderStatusesS = observer(() => {
    const {order, statusOrder, setStatus} = orderStore

    useEffect(() => {
        const socket = io('https://weedo-demo-production.up.railway.app/');

        socket.on('connect', () => {
            console.log('Подключено к серверу Socket.IO');
        });
        socket.on(`orderStatusUpdated:${'64d0a29c781be0e0ae61184a'}`, (data: { orderId: string, status: StatusType }) => {
            setStatus(data.status)
        })
        /*return () => {
            socket.disconnect();
        };*/

    }, []);

    const onPressClose = () => {

    }
    const isCanceled = statusOrder === StatusType.Canceled
    return (
        <BaseWrapperComponent backgroundColor={colors.white} isKeyboardAwareScrollView={!isCanceled}>
            <Box paddingX={5} mt={5} justifyContent={'space-evenly'} flex={1}>
                <Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                    <Box flex={9} justifyContent={'center'} alignItems={'center'}>
                        <Text fontSize={18} fontWeight={'500'}>Simply crafted store</Text>
                    </Box>
                    <Box flex={1}>
                        <TouchableOpacity onPress={onPressClose}>
                            <Image alt={'close'} source={closeImg}/>
                        </TouchableOpacity>
                    </Box>
                </Box>
                {
                    isCanceled ? (
                        <Box flex={2} justifyContent={'center'} alignItems={'center'}>
                            <Text mb={5} fontSize={23} fontWeight={'700'}>The store canceled the order</Text>
                            <Button styleContainer={styles.styleContainerBtn} onPress={onPressClose} title={'Go to orders '}  />
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
                                <Text fontSize={24} fontWeight={'600'}>Order placed</Text>
                                <Text color={colors.gray}>
                                    Some text details about this delivery stage</Text>
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
