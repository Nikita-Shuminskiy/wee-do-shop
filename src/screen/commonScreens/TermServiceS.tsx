import React, {memo} from "react"
import {BaseWrapperComponent} from "../../components/baseWrapperComponent"
import {NavigationProp, ParamListBase} from "@react-navigation/native"
import {Box, Image, Text} from "native-base"
import ArrowBack from "../../components/ArrowBack"
import arrowLeft from "../../assets/images/arrow-left.png"
import logoImg from "../../assets/images/logoWeeDo.png"
import Link from "../../components/Link"
import {Linking} from "react-native"
import {useTranslation} from "react-i18next"

type TermServiceSProps = {
    navigation: NavigationProp<ParamListBase>
}
const TermServiceS = ({navigation}: TermServiceSProps) => {
    const {t} = useTranslation(['term_service', 'common']);
    const onPressGoBack = () => {
        navigation.goBack()
    }
    const handleEmailLinkPress = async () => {
        await Linking.openURL("mailto:weedoshop420@gmail.com"); // Use Linking to open default email app
    };
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box paddingX={5} alignItems={'center'}>
                <Box mt={5} mb={5} position={'absolute'} left={5}>
                    <ArrowBack goBackPress={onPressGoBack} img={arrowLeft}/>
                </Box>
                <Image w={123} h={158} alt={'logo'} source={logoImg} mt={5} mb={5}/>
            </Box>
            <Box paddingX={5} mb={2} alignItems={'flex-start'}>
                <Text fontSize={16} fontWeight={'600'}>{t('termsForFoodWithoutInAppPayment')}</Text>
                <Text fontSize={18} fontWeight={'600'}> 1. {t('introduction')}</Text>
                <Text>
                    {t('welcomeToOurFood')}
                </Text>
                <Text fontSize={18} fontWeight={'600'}> 2. {t('appDescription')}</Text>
                <Text>
                    {t('ourAppProvidesCapability')}
                </Text>
                <Text fontSize={18} fontWeight={'600'}> 3. {t('userAccounts')}</Text>
                <Text>
                    {t('toUseOurApp')}
                </Text>
                <Text fontSize={18} fontWeight={'600'}> 4. {t('ordersAndDelivery')}</Text>
                <Text>
                    {t('toPlaceOrderThrough')}
                </Text>
                <Text fontSize={18} fontWeight={'600'}> 5. {t('liability')}</Text>
                <Text>{t('weDoNotAssume')}</Text>
                <Text fontSize={18} fontWeight={'600'}>6. {t('usageRestrictions')}</Text>
                <Text>
                    {t('youAgreeToUseOurApp')}
                </Text>
                <Text fontSize={18} fontWeight={'600'}> 7. {t('privacy')}</Text>
                <Text>{t('wePespectYourPrivacy')}</Text>
                <Text fontSize={18} fontWeight={'600'}>8. {t('changesToTerms')}</Text>
                <Text>
                    {t('weReserveTheRight')}
                </Text>

                <Text fontSize={18} fontWeight={'600'}>9. {t('contact')}</Text>
                <Text>
                    {t('youHaveQuestion')} <Link onPress={handleEmailLinkPress} styleLink={{borderBottomWidth: 1 }} text={t('common:ownerMail')}/>{'\n'}
                    {t('thankYouForChoosing')}
                </Text>
                <Text fontSize={15} fontWeight={'600'}>{t('common:effectiveDate')}</Text>
            </Box>
        </BaseWrapperComponent>
    );
};

export default memo(TermServiceS)
