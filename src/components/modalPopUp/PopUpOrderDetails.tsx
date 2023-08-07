import React from 'react';
import {Box, Image, Text} from "native-base";
import {FlatList, StyleSheet} from 'react-native';
import ModalPopup from "../pop-up";
import {colors} from "../../assets/colors/colors";
import {ApiOrderType, StatusType} from "../../api/ordersApi";
import Button from "../Button";
import EmptyList from "../list-viewer/empty-list";
import testImg from '../../assets/images/test.png'
import {ProductType} from "../../api/productApi";
import {getFormatDateToString} from "../../utils/utils";
import {formatProductPrice} from "../MapViews/utils";

type PopUpOrderDetailsProps = {
    show: boolean
    order: ApiOrderType
    onClose: () => void
    onPressRepeat: () => void
}

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
const orderViews = ({item}: { item: { amount: number; product: ProductType } }) => {
    return (
        <Box mb={2} pb={2} borderBottomWidth={1} flexDirection={'row'} alignItems={'center'}
             justifyContent={'space-between'}
             borderColor={colors.grayLight}>
            <Box flexDirection={'row'}>
                <Image w={47} h={47} borderRadius={16} source={testImg} alt={'img-product'}/>
                <Box ml={2}>
                    <Text fontSize={12} fontWeight={'500'}>{item.product.name}</Text>
                    <Text fontSize={12} fontWeight={'500'}>{item.product.effect}</Text>
                    <Text fontSize={12} fontWeight={'500'}>x{item.amount}</Text>
                </Box>
            </Box>
            <Box>

                <Text fontSize={14} fontWeight={'500'}>฿ {formatProductPrice(item.product.price)}</Text>
            </Box>
        </Box>
    )
}
const PopUpOrderDetails = ({
                               show,
                               onClose,
                               onPressRepeat,
                               order
                           }: PopUpOrderDetailsProps) => {

    return (
        <ModalPopup style={{padding: 0}} visible={show} onClose={onClose}>
            <Box alignItems={'center'} p={2}>
                <Box mb={2} alignItems={'center'}>
                    <Text fontWeight={'700'} fontSize={28}>
                        {order?.status}
                    </Text>
                </Box>
                <Box style={styles.container}>
                    <Box flexDirection={'row'} justifyContent={'space-between'}>
                        <Text fontWeight={'600'} fontSize={16}>Simply Crafted Store</Text>
                        <Text fontWeight={'600'} fontSize={16}>฿{formatProductPrice(order?.totalPrice)}</Text>
                    </Box>
                    <Text fontWeight={'600'} color={colors.gray}
                          fontSize={12}>{getFormatDateToString(order?.createdAt)}</Text>
                    {
                        order?.status === StatusType.Completed && <Box mt={4}>
                            <Button backgroundColor={colors.green} styleContainer={styles.containerBtn}
                                    onPress={onPressRepeat}
                                    title={'Repeat order'}/>
                        </Box>
                    }

                </Box>
                <Box style={styles.container} alignItems={'center'}>
                    <FlatList
                        data={order?.products ?? []}
                        renderItem={orderViews}
                        keyExtractor={(item, index) => index?.toString()}
                        style={{width: '100%'}}
                        contentContainerStyle={
                            !order?.products.length &&
                            styles.contentContainerOrder
                        }
                        ListEmptyComponent={() => renderEmptyContainer(0, 'No details')}
                    />
                </Box>
                <Box style={styles.container}>
                    <Box alignItems={'center'}>
                        <Text fontWeight={'700'} fontSize={16}>Delivery and Payment</Text>
                    </Box>
                    <Box flexDirection={'row'} justifyContent={'space-between'}>
                        <Text fontWeight={'500'} fontSize={16}>Delivery</Text>
                        <Text fontWeight={'500'} fontSize={16}>0</Text>
                    </Box>
                </Box>
                <Box style={styles.container}>
                    <Box flexDirection={'row'} justifyContent={'space-between'}>
                        <Text fontWeight={'500'} fontSize={16}>Total</Text>
                        <Text fontWeight={'500'} fontSize={16}>฿{formatProductPrice(order?.totalPrice)}</Text>
                    </Box>
                </Box>
            </Box>
        </ModalPopup>
    );
};
const styles = StyleSheet.create({
    contentContainerOrder: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        color: colors.black
    },
    containerBtn: {},
    container: {
        width: '99%',
        borderRadius: 16,
        marginBottom: 15,
        padding: 10,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 20,
        elevation: 7,
    }
})
export default PopUpOrderDetails;
