import React from 'react';
import ModalPopup from "./pop-up";
import {Box, Image, Text} from "native-base";
import {OrderCourierType} from "../api/couierApi";
import {deliveryPrice} from "../utils/utils";
import {formatProductPrice} from "./MapViews/utils";
import productImg from "../assets/images/productTest.png";
import {colors} from "../assets/colors/colors";
import {PhoneNumberComponent} from "./PhoneNumberLink";

type OrderUserInfoProps = {
    show: boolean
    onClose: () => void
    order: OrderCourierType
}
const OrderUserInfo = ({
                           show,
                           onClose,
                           order,
                       }: OrderUserInfoProps) => {
    const productTotalPrice = +formatProductPrice(order.totalPrice) + +deliveryPrice

    return (
        <ModalPopup visible={show} onClose={onClose}>
            <Box flex={1} w={'100%'} justifyContent={'space-between'}>
                <Box mb={1} alignItems={'center'}>
                    <Text fontSize={18} fontWeight={'500'}>Order number :{' '}{order?.number}</Text>
                </Box>
                <Box mb={2}>
                    <Box flexDirection={'row'} alignItems={'flex-start'}>
                        <Text fontSize={15}>Phone:{' '}</Text>
                        <PhoneNumberComponent phoneNumber={order.user.phone}/>
                    </Box>
                    <Text fontSize={15}>First name:{' '}{order.user.firstName}</Text>
                    <Text fontSize={15}>Last name:{' '}{order.user.lastName}</Text>
                </Box>
                <Box mb={2}>
                    <Text fontSize={22} fontWeight={'600'}>Client address</Text>
                    <Text fontSize={15}>Country:{' '}{order.user.address.fullAddress.country}</Text>
                    <Text fontSize={15}>City:{' '}{order.user.address.fullAddress.city}</Text>
                    <Text fontSize={15}>Street:{' '}{order.user.address.fullAddress.street}</Text>
                    <Text fontSize={15}>House:{' '}{order.user.address.fullAddress.house}</Text>
                    <Text fontSize={15}>Apartment:{' '}{order.user.address.fullAddress.apartment}</Text>
                </Box>
                {
                    order.products.map((product, id) => {  // тут нету sub category - category
                        return <Box flexDirection={'row'} borderBottomWidth={1} borderColor={colors.gray} paddingY={1}
                                    alignItems={'center'} justifyContent={'space-between'}>
                            <Box flexDirection={'row'} alignItems={'center'}>
                                <Image alt={'image-store'} width={10} h={10} borderRadius={16}
                                       source={productImg}/>
                                <Box alignItems={'flex-start'} ml={4}>
                                    <Text fontSize={16} fontWeight={'400'}>{product.product.name}</Text>
                                </Box>
                            </Box>
                            <Text fontSize={16} fontWeight={'400'}>x{product.amount}</Text>
                        </Box>
                    })
                }
                <Box mt={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Text fontSize={15} fontWeight={'500'}>Total price</Text>
                    <Text fontSize={15}>฿{productTotalPrice}</Text>
                </Box>
                {
                    order.comment && <Box mt={2}>
                        <Text fontSize={15}>Comment:{' '}{order.comment}</Text>
                    </Box>
                }

            </Box>
        </ModalPopup>
    );
};

export default OrderUserInfo;
