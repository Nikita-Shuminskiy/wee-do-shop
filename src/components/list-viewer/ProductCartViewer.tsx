import React from 'react';
import {Box, Image, Text} from "native-base";
import InputNumber from "../InputNumber";
import productImg from "../../assets/images/productTest.png";
import {ProductCartType} from "../../store/CartStore/cart-store";
import {Ionicons} from '@expo/vector-icons';
import {colors} from "../../assets/colors/colors";
import {TouchableOpacity} from "react-native";
import {formatProductPrice} from "../MapViews/utils";

type ProductCartViewerType = {
    product: ProductCartType
    onChangeValueNumber: (value: number) => void
    onPressRemoveProduct: () => void
}
const ProductCartViewer = ({product, onChangeValueNumber, onPressRemoveProduct}: ProductCartViewerType) => {
    const productPrice = formatProductPrice(product?.price)
    return (
        <Box flexDirection={'row'} paddingY={2} justifyContent={'space-between'} >
            <Box flexDirection={'row'} alignItems={'center'}>
                <Image alt={'image-store'}  borderRadius={16}
                       source={{uri: product.image}}
                       style={{
                           width: 70,
                           height: 70,
                           aspectRatio: 70 / 70,
                           borderRadius: 16,
                       }}
                       resizeMode="cover"/>
                <Box alignItems={'flex-start'} ml={4}>
                    <Text fontSize={16} fontWeight={'400'}>{product.name}</Text>
                    <Box w={120}>
                        <InputNumber values={product?.amount}
                                     onChangeValue={onChangeValueNumber}/>
                    </Box>
                </Box>
            </Box>

            <Box justifyContent={'space-between'} alignItems={'flex-end'}>
                <Text  fontSize={16} fontWeight={'400'}>฿{' '}{productPrice}</Text>
                <Box height={35}>
                    <TouchableOpacity onPress={onPressRemoveProduct}>
                        <Ionicons name="close" size={24} color={colors.gray}/>
                    </TouchableOpacity>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductCartViewer;
