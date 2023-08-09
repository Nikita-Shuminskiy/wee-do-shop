import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Box, Text} from "native-base";
import AuthStore from "../../store/AuthStore/auth-store";
import Link from "../../components/Link";
import {StyleSheet} from "react-native";
import {colors} from "../../assets/colors/colors";
import {Entypo, SimpleLineIcons} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import ArrowBack from "../../components/ArrowBack";
import arrowLeftBack from "../../assets/images/arrow-left.png";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import {routerConstants} from "../../constants/routerConstants";

type UserProfileSProps = {
    navigation: NavigationProp<ParamListBase>
}
const UserProfileS = ({navigation}: UserProfileSProps) => {
    const {user, logOut} = AuthStore

    const onPressGoBack = () => {
        navigation.goBack()
    }
    const onPressLogOut = () => {
        logOut()
    }
    const onPressOrderHandler = () => {
        navigation.navigate(routerConstants.ORDERS)
    }
    const onPressGoAddress = () => {
        navigation.navigate(routerConstants.ADDRESS)
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box paddingX={2} mt={2}>
                <Box top={5} zIndex={10} position={'absolute'} left={5}>
                    <ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack}/>
                </Box>
                <Box flexDirection={'row'} mt={5} mb={10} justifyContent={'center'} alignItems={'center'}>
                    <Text fontSize={18} fontWeight={'bold'}>{user.firstName} {user.lastName}</Text>
                </Box>
                <Box flexDirection={'row'} alignItems={'center'} pb={4} mt={4} borderBottomWidth={1}
                     borderColor={colors.grayLight}>
                    <FontAwesome5 name="clipboard-list" size={18} color="black"/>
                    <Link styleText={styles.text} onPress={onPressOrderHandler}
                          text={'Orders'}/>
                </Box>
                <Box flexDirection={'row'} alignItems={'center'} pb={4} mt={4} borderBottomWidth={1}
                     borderColor={colors.grayLight}>
                    <Ionicons style={{marginLeft: -1}} name="md-location" size={18} color="black"/>
                    <Link styleText={styles.text} onPress={onPressGoAddress}
                          text={'Address'}/>
                </Box>
                <Box flexDirection={'row'} mt={4} alignItems={'center'}>
                    <Entypo name="log-out" size={18} color="black"/>
                    <Link styleText={styles.text} onPress={onPressLogOut}
                          text={'Logout'}/>
                </Box>
                <PrivacyPolicy/>
            </Box>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: '500'
    }
})
export default UserProfileS;
