import React, { memo } from "react";
import {Box} from "native-base";
import Link from "./Link";
import {StyleSheet} from "react-native";
import {colors} from "../assets/colors/colors";
import {useNavigation} from "@react-navigation/native";
import {routerConstants} from "../constants/routerConstants";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
    const {t} = useTranslation(['privacyPolice']);
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
            <Box flexDirection={'row'} mt={2} flexWrap={'wrap'} justifyContent={'space-between'}>
                <Link styleText={styles.LinkText} styleLink={styles.link} onPress={onPressTerms}
                      text={t('termsOfService')}/>
                <Link styleText={styles.LinkText} styleLink={styles.link} onPress={onPressLegal}
                      text={t('legalInfo')}/>
                <Link styleText={styles.LinkText} styleLink={styles.link} onPress={onPressPrivacy}
                      text={t('privacyPolice')}/>
            </Box>
        </Box>
    );
};
const styles = StyleSheet.create({
    LinkText: {
        color: colors.green,
        fontSize: 11,
        fontWeight: '500'
    },
    link: {
        borderColor: colors.green,
        borderBottomWidth: 1,
    }
})
export default memo(PrivacyPolicy);
