import React, {useState} from 'react';
import {Box, Image, Text} from "native-base";
import photoTest from "../../assets/images/photoTest.png";
import {StyleSheet} from 'react-native';
import ModalPopup from "../pop-up";
import {colors} from "../../assets/colors/colors";
import Button from "../Button";
import SliderComponent from "../Slider";
import InputNumber from "../InputNumber";
import {ProductType} from "../../api/productApi";
import CartStore, {CartType, ProductCartType} from "../../store/CartStore/cart-store";
import {formatProductPrice} from "../MapViews/utils";


type PopUpProductProps = {
    show: boolean
    currentValueToCartProduct: ProductCartType
    onClose: () => void
    product: ProductType
    saveProductValueToCard: (productValue: number) => void
    totalSumCart: string
}
const PopUpProduct = ({
                          show,
                          onClose,
                          product,
                          currentValueToCartProduct,
                          saveProductValueToCard,
                          totalSumCart
                      }: PopUpProductProps) => {

    const onPressShowMore = () => {

    }
    const onPressGoToCardHandler = () => {

    }
    const saveInputNumberValue = (productValue: number) => {
        saveProductValueToCard(productValue)
    }
    const saveSliderValue = (productValue: number) => {
        saveProductValueToCard(productValue)
    }

    return (
        <>
            <ModalPopup visible={show} onClose={onClose}>
                <Box flex={1} w={'100%'} justifyContent={'space-between'}>
                    <Image source={photoTest} alt={'photoProduct'}/>
                    <Text mb={2} mt={2} fontSize={16} fontWeight={'600'}> {product?.name}</Text>
                    <Text mb={2}>{product?.description}</Text>
                    <Box>
                        {/* <Text fontWeight={'500'}>-THC 15%</Text>
                        <Text fontWeight={'500'}>-CBD 12%</Text>
                        <Text fontWeight={'500'}>-Energizing</Text>
                        <Text fontWeight={'500'}>-Uplifting</Text>*/}
                        <Text fontWeight={'500'}>{product?.effect}</Text>
                    </Box>
                    {/*  <Box flex={1} w={'25%'}>
                        <Link styleLink={{backgroundColor: colors.grayDarkLight, borderRadius: 16}}
                              onPress={onPressShowMore} text={'Show more'}/>
                    </Box>*/}
                    <Box mt={2} w={'100%'} flex={1}>
                        <Box mb={4} flexDirection={'row'} flex={1} w={'100%'} justifyContent={'space-between'}>
                            <Text>Price: 1g</Text>
                            <Text>฿ {formatProductPrice(product?.price)}</Text>
                        </Box>
                        <SliderComponent valueSlider={currentValueToCartProduct?.productValue ?? 0}
                                         onChangeValue={saveSliderValue}/>
                    </Box>
                </Box>
            </ModalPopup>
            {show && <Box
                justifyContent={'space-evenly'}
                style={styles.shadow}
                zIndex={9999}
                height={91}
                flexDirection={'row'}
                alignItems={'center'}>
                <Box w={'40%'}>
                    <InputNumber values={currentValueToCartProduct?.productValue ?? 0} onChangeValue={saveInputNumberValue}/>
                </Box>
                <Box minWidth={150}>
                    <Button backgroundColor={colors.green} styleContainer={styles.styleContainerBtn}
                            styleText={styles.styleTextBtn} onPress={onPressGoToCardHandler}
                            title={`Go to cart ฿${totalSumCart ?? ''}`}/>
                </Box>
            </Box>}

        </>
    );
};
const styles = StyleSheet.create({
    styleContainerBtn: {},
    styleTextBtn: {
        fontWeight: '600',
        fontSize: 16
    },
    container: {
        width: 200,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20.00,
        elevation: 24
    },
});
export default PopUpProduct;
