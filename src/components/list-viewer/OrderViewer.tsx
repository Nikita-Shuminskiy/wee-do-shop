import React from 'react';
import {StyleSheet} from "react-native";
import {ApiOrderType, StatusType} from "../../api/ordersApi";
import {colors} from "../../assets/colors/colors";
import {Box, Text} from "native-base";
import Button from "../Button";
import {getFormatDateToString} from "../../utils/utils";
import {formatProductPrice} from "../MapViews/utils";
import {useNavigation} from "@react-navigation/native";
import {routerConstants} from "../../constants/routerConstants";
import orderStore from "../../store/OrderStore/order-store";

type OrderViewerProps = {
    order: ApiOrderType
    onPressDetails: () => void
}
const OrderViewer = ({order, onPressDetails}: OrderViewerProps) => {
    const {setOrderData, setStatus} = orderStore
  const navigation = useNavigation<any>()
    const onPressRepeat = () => {

    }
    const onPressCheckStatus = () => {
        setOrderData(order)
        setStatus(order.status)
        navigation.navigate(routerConstants.ORDER_STATUSES)
    }
    const isCompletedStatuses = order?.status === StatusType.Completed
    return (<Box style={styles.container}>
            <Box flexDirection={'row'} justifyContent={'space-between'}>
                <Text fontWeight={'600'} fontSize={16}>{order?.store?.name}</Text>
                <Text fontWeight={'600'} fontSize={16}>฿{formatProductPrice(order.totalPrice)}</Text>
            </Box>
            <Box flexDirection={'row'} mt={1} justifyContent={'space-between'}>
                <Text fontWeight={'600'} color={colors.gray}
                      fontSize={12}>{getFormatDateToString(order?.createdAt)}</Text>
                <Text fontWeight={'600'} fontSize={14} color={colors.green}>{order.status}</Text>
            </Box>
            <Box flexDirection={'row'} mt={2} justifyContent={'space-between'}>
                <Button backgroundColor={'#E7E7E7'} styleText={styles.textBtn}
                        styleContainer={!isCompletedStatuses && styles.containerBtn}
                        onPress={onPressDetails} title={`Order details (${order.products?.length}+)`}/>
                {
                    isCompletedStatuses &&
                    <Button backgroundColor={colors.green} styleContainer={styles.containerBtn} onPress={onPressRepeat}
                            title={'Repeat order'}/>
                }
                {
                    !isCompletedStatuses &&
                    <Button backgroundColor={colors.green} styleContainer={styles.containerBtn} onPress={onPressCheckStatus}
                            title={'Check status'}/>
                }

            </Box>
        </Box>

    );
};
const styles = StyleSheet.create({
    textBtn: {
        color: colors.black
    },
    containerBtn: {
        maxWidth: 160,
        width: '100%'
    },
    container: {
        borderRadius: 20,
        marginBottom: 15,
        margin: 10,
        padding: 10,
        backgroundColor: colors.white,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.00,
        elevation: 24
    }
})
export default OrderViewer;
