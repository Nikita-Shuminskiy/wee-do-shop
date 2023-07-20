import React, {useState} from 'react';
import {Box, Image, Text} from "native-base";
import photoTest from "../../assets/images/photoTest.png";
import {Animated, StyleSheet, useWindowDimensions} from 'react-native';
import {TouchableOpacity} from "react-native";
import ModalPopup from "../pop-up";
import {colors} from "../../assets/colors/colors";
import Button from "../Button";
import Link from "../Link";
import SliderComponent from "../Slider";
import InputNumber from "../InputNumber";
import ShowMoreText from "../ShowMoreText";

type PopUpProductProps = {
    show: boolean
    onClose: () => void
}
const PopUpProduct = ({show, onClose}: PopUpProductProps) => {
    const [currentCart, setCurrentCart] = useState<number>()
    const onPressShowMore = () => {

    }
    const onPressGoToCardHandler = () => {

    }
    const saveInputNumberValue = (value: number) => {
        setCurrentCart(value)
    }
    const saveSliderValue = (value: number) => {
        setCurrentCart(value)
    }
    const totalSumCurrentCart = currentCart * 800
    return (
        <>
            <ModalPopup visible={show} onClose={onClose}>
                <Box flex={1} w={'100%'} justifyContent={'space-between'}>
                    <Image source={photoTest} alt={'photoProduct'}/>
                    <Text mb={2} mt={2} fontSize={16} fontWeight={'600'}>Acai Berry CBD Flower</Text>
                    <Text mb={2}>Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,</Text>
                    <Box>
                        <Text fontWeight={'500'}>-THC 15%</Text>
                        <Text fontWeight={'500'}>-CBD 12%</Text>
                        <Text fontWeight={'500'}>-Energizing</Text>
                        <Text fontWeight={'500'}>-Uplifting</Text>
                    </Box>
                    <Box flex={1} w={'25%'}>
                        <Link styleLink={{backgroundColor: colors.grayDarkLight, borderRadius: 16}}
                              onPress={onPressShowMore} text={'Show more'}/>
                    </Box>
                    <Box mt={2} w={'100%'} flex={1}>
                        <Box mb={4} flexDirection={'row'} flex={1} w={'100%'} justifyContent={'space-between'}>
                            <Text>Price: 1g</Text>
                            <Text>฿ 800 </Text>
                        </Box>
                        <SliderComponent onChangeValue={saveSliderValue}/>
                    </Box>
                </Box>
            </ModalPopup>
            {show && <Box
                justifyContent={'space-between'}
                style={styles.shadow}
                zIndex={9999}
                height={91}
                flexDirection={'row'}
                alignItems={'center'}>
                <Box w={'45%'}>
                    <InputNumber values={currentCart} onChangeValue={saveInputNumberValue}/>
                </Box>
                <Box mr={5}>
                    <Button backgroundColor={colors.green} styleText={styles.styleTextBtn} onPress={onPressGoToCardHandler}
                            title={`Go to cart ฿${totalSumCurrentCart ?? ''}`}/>
                </Box>
            </Box>}

        </>
    );
};
const styles = StyleSheet.create({
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
