import React from 'react';
import {Box, Image, Text} from "native-base";
import userImg from "../assets/images/userGreen.png";
import likeImg from "../assets/images/likeGreen.png";
import {TouchableOpacity} from "react-native";
import {routerConstants} from "../constants/routerConstants";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {getFormattedAddress} from "./MapViews/utils";
import {AddressType} from "../store/AuthStore/auth-store";
export type HeaderUserType = {
    navigation: NavigationProp<ParamListBase>
    address: AddressType
}
export const HeaderUser = ({navigation, address}:HeaderUserType) => {
    const formatted_address = getFormattedAddress(address)
    const onPressFavoriteHandler = () => {
        navigation.navigate(routerConstants.FAVORITE)
    }
    const onPressUserHandler = () => {
        navigation.navigate(routerConstants.PROFILE_USER)
    }
    return (
        <Box paddingX={5} mt={6} mb={2} w={'100%'} flexDirection={'row'}
             justifyContent={'space-between'}>
            <TouchableOpacity onPress={onPressUserHandler}>
                <Image source={userImg} alt={'user'}/>
            </TouchableOpacity>
            <Text fontSize={14} w={'60%'} textAlign={'center'}
                  fontWeight={'600'}>{formatted_address}</Text>
            <TouchableOpacity onPress={onPressFavoriteHandler}>
                <Image source={likeImg} alt={'like'}/>
            </TouchableOpacity>
        </Box>
    );
};

export default HeaderUser;
