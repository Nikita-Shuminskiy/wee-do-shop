import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Box, Image, Text} from "native-base";
import ArrowBack from "../../components/ArrowBack";
import arrowLeft from "../../assets/images/arrow-left.png";
import logoImg from "../../assets/images/logoWeeDo.png";
import Link from "../../components/Link";
import {Linking} from "react-native";

type TermServiceSProps = {
    navigation: NavigationProp<ParamListBase>
}
const TermServiceS = ({navigation}: TermServiceSProps) => {
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
                <Text fontSize={16} fontWeight={'600'}>Terms of Service for Food, Beverage, and Non-Alcoholic Product Delivery App for Thailand, without
                    In-App Payment</Text>

                <Text fontSize={22} fontWeight={'600'}> 1. Introduction</Text>

                <Text>
                    Welcome to our food, beverage, and non-alcoholic product delivery app! Please carefully read these
                    Terms
                    of Service before using our app. By clicking "Accept" or using our app, you agree to these Terms of
                    Service. If you do not agree, please do not use the app.
                </Text>

                <Text fontSize={22} fontWeight={'600'}> 2. App Description</Text>

                <Text>
                    Our app provides the capability to browse menus and place orders for food, beverages, and
                    non-alcoholic
                    products from various restaurants and suppliers in Thailand. In addition, accessories, cosmetics,
                    and
                    related items may also be available for purchase.
                </Text>

                <Text fontSize={22} fontWeight={'600'}> 3. User Accounts</Text>

                <Text>
                    To use our app, you may need to create an account. You agree to provide accurate and complete
                    information during registration and to update this information in case of changes. You are
                    responsible
                    for the security of your account and password, as well as for all actions taken using your account.
                </Text>

                <Text fontSize={22} fontWeight={'600'}> 4. Orders and Delivery</Text>

                <Text>
                    To place an order through our app, you select your preferred restaurant or supplier, add items to
                    your
                    cart, and place the order. Payment for the order and delivery is handled directly with the
                    restaurant or
                    supplier, according to their terms.
                </Text>

                <Text fontSize={22} fontWeight={'600'}> 5. Liability</Text>

                <Text>We do not assume responsibility for the quality of products, services, delivery, or payment
                    provided by
                    restaurants or suppliers. Any complaints related to orders should be discussed directly with the
                    respective restaurant or supplier.</Text>

                <Text fontSize={22} fontWeight={'600'}>6. Usage Restrictions</Text>

                <Text>
                    You agree to use our app for lawful purposes only. Uploading or distributing malicious software,
                    engaging in fraudulent activities, infringing copyrights, or violating other laws is prohibited.
                </Text>

                <Text fontSize={22} fontWeight={'600'}> 7. Privacy</Text>

                <Text> We respect your privacy. Please review our Privacy Policy to understand how we collect, use, and
                    protect
                    your personal information.</Text>

                <Text fontSize={22} fontWeight={'600'}>8. Changes to Terms of Service</Text>

                <Text>
                    We reserve the right to change or update these Terms of Service at any time. Changes become
                    effective
                    upon posting the updated Terms within the app. Your continued use of the app after changes will be
                    considered your acceptance of the new Terms.
                </Text>

                <Text fontSize={22} fontWeight={'600'}>9.Contact</Text>

                <Text>
                    If you have questions or concerns regarding our Terms of Service, you can contact us at <Link onPress={handleEmailLinkPress} styleLink={{borderBottomWidth: 1 }} text={'weedoshop420@gmail.com '}/>{'\n'}
                    Thank you for choosing our food, beverage, and non-alcoholic product delivery app for Thailand!
                </Text>
                <Text fontSize={18} fontWeight={'600'}>Effective Date: August 14, 2023</Text>
            </Box>
        </BaseWrapperComponent>
    );
};

export default TermServiceS;
