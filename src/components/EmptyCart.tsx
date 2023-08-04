import React from 'react';
import {Box, Image, Text} from "native-base";
import cartEmpty from "../assets/images/cartEmpty.png";

export const EmptyCart = () => {
    return (
        <>
            <Box mt={5} alignItems={'center'}>
                <Text fontSize={28}  fontWeight={'700'}>Cart</Text>
            </Box>
            <Box flex={1} alignItems={'center'} justifyContent={'center'}>
                <Image w={340} h={263} source={cartEmpty} alt={'cart'}/>
                <Text fontSize={24} fontWeight={'700'}>Your shopping cart is{'\n'} empty... for now</Text>
            </Box>
        </>
    );
};

export default EmptyCart;
