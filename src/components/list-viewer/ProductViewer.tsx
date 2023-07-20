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

type StoreViewerProps = {
    store: any
    //  cartProductValue: number
    onPressProduct: () => void
    saveProductToCart: (valueProduct: number) => void
}
const ProductViewer = ({store, onPressProduct, saveProductToCart}: StoreViewerProps) => {
    const [currentCartStore, setCurrentCardStore] = useState(0)
    const {height, width} = Dimensions.get('window');
    const itemWidth = (width - 15) / 2;
    const onPressProductHandler = () => {
        setCurrentCardStore(1)
        saveProductToCart(1)
    }
    const onChangeValueNumber = (valueProduct: number) => {
        setCurrentCardStore(valueProduct)
        saveProductToCart(valueProduct)
    }
    return (
        <Pressable style={{alignItems: 'center', minWidth: itemWidth, maxWidth: itemWidth}} onPress={onPressProduct}>
            <Box style={styles.shadow}
                 borderRadius={16}
                 alignItems={'center'}
                 justifyContent={'space-between'}
                 m={1}
                 borderColor={colors.green}>
                <Box>
                    <Box w={24}
                         position={'absolute'}
                         p={1}
                         top={2}
                         left={0}
                         zIndex={10}
                         backgroundColor={'transparent'}>
                        <Image source={relaxImg} borderRadius={16} alt={'degree'}/>
                    </Box>
                    <Image alt={'image-store'} borderRadius={16} source={productImg}/>
                </Box>
                <Box paddingY={2}
                     w={'100%'}
                     justifyContent={'space-evenly'}
                     borderBottomRightRadius={16}
                     borderBottomLeftRadius={16}>
                    <Text ml={2}
                          fontSize={14}
                          fontWeight={'700'}
                          color={colors.balck}>Gary Payton And Family</Text>
                    <Box mt={5} height={50}>
                        {
                            !currentCartStore ? <Button styleText={styles.styleTextBtn}
                                                        backgroundColor={colors.grayDarkLight}
                                                        onPress={onPressProductHandler} title={'฿ 900 '}/> :
                                <InputNumber values={currentCartStore} onChangeValue={onChangeValueNumber}/>
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
export default ProductViewer;
