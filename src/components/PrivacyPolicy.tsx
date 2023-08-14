import React from 'react';
import {Box} from "native-base";
import Link from "./Link";
import {StyleSheet} from "react-native";
import {colors} from "../assets/colors/colors";
import {useNavigation} from "@react-navigation/native";
import {routerConstants} from "../constants/routerConstants";

const PrivacyPolicy = () => {
    const navigation = useNavigation<any>()
    const onPressTerms = () => {
        navigation.navigate(routerConstants.TERM_SERVICE)
    }
    const onPressLegal = () => {
        navigation.navigate(routerConstants.LEGAL_INFORMATION)
    }
    const onPressPrivacy = () => {
        navigation.navigate(routerConstants.PRIVACY_POLICE)
    }
    return (
        <Box justifyContent={'space-between'} w={'100%'}>
            <Box flexDirection={'row'} mt={10} justifyContent={'space-between'}>
                <Link styleText={styles.LinkText} styleLink={styles.link} onPress={onPressTerms}
                      text={'Terms of service'}/>
                <Link styleText={styles.LinkText} styleLink={styles.link} onPress={onPressLegal}
                      text={'Legal information'}/>
                <Link styleText={styles.LinkText} styleLink={styles.link} onPress={onPressPrivacy}
                      text={'Privacy police'}/>
            </Box>
        </Box>
    );
};
const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: '500'
    },
    LinkText: {
        color: colors.green,
        fontSize: 14,
        fontWeight: '500'
    },
    link: {
        borderColor: colors.green,
        borderBottomWidth: 1,

    }
})
export default PrivacyPolicy;
