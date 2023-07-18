import React from 'react';
import {Box, Image, Text} from "native-base";
import productImg from '../../assets/images/productTest.png'
import {Dimensions, ImageBackground, TouchableOpacity} from "react-native";
import {colors} from "../../assets/colors/colors";
import motorcycle from "../../assets/images/moto.png";
import test from "../../assets/images/test.png";
import relaxImg from "../../assets/images/relaxTagImg.png";
import Button from "../Button";

type StoreViewerProps = {
    store: any
    onPress: any
}
const StoreViewer = ({store, onPress}: StoreViewerProps) => {
    const itemWidth = Dimensions.get('window').width / 2;
    const onPressProductHandler = () => {

    }
    return (
        <TouchableOpacity style={{alignItems: 'center', width: itemWidth}} onPress={onPress}>
            <Box backgroundColor={'rgba(203,203,203,0.27)'}
                 borderRadius={16}
                 alignItems={'flex-start'} justifyContent={'space-between'} m={1}
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
                     borderBottomRightRadius={16}
                     borderBottomLeftRadius={16}>
                    <Text ml={2}
                          fontSize={14}
                          fontWeight={'700'}
                          color={colors.balck}>Gary Payton And Family</Text>
                    <Box mt={2}>
                        <Button styleText={{color: colors.black}}
                                backgroundColor={colors.grayDarkLight}
                                onPress={onPressProductHandler} title={'฿ 900 '}/>
                    </Box>
                </Box>
            </Box>
        </TouchableOpacity>
    );
};

export default StoreViewer;
