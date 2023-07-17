import React from 'react';
import {Box, Text, Pressable, Image} from "native-base";
import {colors} from "../../assets/colors/colors";
import {LinearGradient} from "expo-linear-gradient";
import test from '../../assets/images/test.png'
import dot from '../../assets/images/dot.png'
import {TouchableOpacity} from "react-native";
import motorcycle from '../../assets/images/motorcycle.png'

const StoresViewer = ({data}) => {
    return (
        <TouchableOpacity style={{ alignItems: 'center',flex: 1 }}>
            <Box backgroundColor={'rgba(203,203,203,0.27)'}
                 borderRadius={16} w={324}
                 alignItems={'center'} justifyContent={'space-between'} m={1}
                 borderColor={colors.green}>
                <Box>
                    <Box w={24}
                         position={'absolute'}
                         p={1}
                         top={2}
                         left={0}
                         borderWidth={1}
                         zIndex={10}
                         borderColor={colors.green}
                         flexDirection={'row'}
                         borderRadius={16}
                         alignItems={'center'}
                         justifyContent={'center'}
                         backgroundColor={'transparent'}>
                        <Image source={motorcycle} alt={'moto'}/>
                        <Text ml={2} color={colors.white} fontSize={16} fontWeight={'500'}> 30min</Text>
                    </Box>
                    <Image alt={'image-store'} borderRadius={16} source={test}/>
                    <Box position={'absolute'}
                         bottom={0}
                         right={0}
                         backgroundColor={colors.green}
                         borderRadius={16} borderRightRadius={0} paddingY={1} paddingX={3} >
                        <Text color={colors.white} fontWeight={'600'} fontSize={14}>Open until 23:00</Text>
                    </Box>
                </Box>
                <Box paddingY={2} borderBottomRightRadius={16}
                     borderBottomLeftRadius={16} w={'100%'}>
                    <Text ml={3}  fontSize={18} fontWeight={'700'} color={colors.balck}>Simply Crafted Store</Text>
                    <Box ml={4} flexDirection={'row'} alignItems={'center'}>
                        <Image alt={'dot'} mr={1} source={dot}/>
                        <Text fontWeight={'500'} >Flowers, prerolls, muffins</Text>
                    </Box>
                </Box>
            </Box>
        </TouchableOpacity>
    );
};

export default StoresViewer;
