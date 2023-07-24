import React, {useState} from 'react';
import {Box, Image, Pressable, Text} from "native-base";
import productImg from '../../assets/images/productTest.png'
import {Dimensions, ImageBackground, StyleSheet, TouchableOpacity} from "react-native";
import {colors} from "../../assets/colors/colors";
import motorcycle from "../../assets/images/moto.png";
import test from "../../assets/images/test.png";
import relaxImg from "../../assets/images/relaxTagImg.png";
import Button from "../Button";
import InputNumber from "../InputNumber";
import {ProductType} from "../../api/productApi";
import {CartType, ProductCartType} from "../../store/CartStore/cart-store";

type StoreViewerProps = {
    product: ProductType
    onPressProduct: () => void
    saveProductToCart: (valueProduct: number) => void
    currentCartStore: CartType
}
const ProductViewer = ({product, onPressProduct, saveProductToCart, currentCartStore}: StoreViewerProps) => {
    const {width} = Dimensions.get('window');
    const productWidth = (width - 15) / 2;
    const currentValueToCartProduct = currentCartStore?.products.find(cart => cart._id === product?._id)

    const onPressProductHandler = () => {
        saveProductToCart(1)
    }
    const onChangeValueNumber = (valueProduct: number) => {
        saveProductToCart(valueProduct)
    }

    return (
        <Pressable style={{alignItems: 'center', paddingHorizontal: 5, minWidth: productWidth, maxWidth: productWidth}}
                   onPress={onPressProduct}>
            <Box style={styles.shadow}
                 borderRadius={16}
                 alignItems={'center'}
                 w={'100%'}
                 mb={5}>
                <Box>
                    <Box w={20}
                         position={'absolute'}
                         p={1}
                         top={2}
                         left={0}
                         zIndex={10}
                         backgroundColor={'transparent'}>
                        <Text backgroundColor={'transparent'}
                              color={colors.white}
                              borderColor={colors.white}
                              borderRadius={16}
                              textAlign={'center'}
                              borderWidth={1}>
                            {product.effect}
                        </Text>
                    </Box>
                    <Box w={'100%'}>
                        <Image alt={'image-store'} width={200} borderTopRightRadius={16} borderTopLeftRadius={16}
                               source={productImg}/>
                    </Box>
                </Box>
                <Box paddingY={1}
                     paddingX={2}
                     w={'100%'}
                     minWidth={'100%'}
                     justifyContent={'space-evenly'}
                     borderBottomRightRadius={16}
                     borderBottomLeftRadius={16}>
                    <Text
                        fontSize={14}
                        fontWeight={'700'}
                        color={colors.balck}>{product?.name}</Text>
                    <Box mt={5} height={50}>
                        {
                            !currentValueToCartProduct?.productValue ? <Button styleText={styles.styleTextBtn}
                                                                               backgroundColor={colors.grayDarkLight}
                                                                               onPress={onPressProductHandler}
                                                                               title={`฿ ${product?.price}`}/> :
                                <InputNumber values={currentValueToCartProduct?.productValue}
                                             onChangeValue={onChangeValueNumber}/>
                        }

                    </Box>
                </Box>
            </Box>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    styleTextBtn: {
        fontWeight: '600',
        fontSize: 16,
        color: colors.black
    },
    shadow: {
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 7,
    },
});
export default ProductViewer;
