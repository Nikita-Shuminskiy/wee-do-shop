import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Box, Image, Text} from "native-base";
import ArrowBack from "../../components/ArrowBack";
import arrowLeft from "../../assets/images/arrow-left.png";
import logoImg from "../../assets/images/logoWeeDo.png";
import {Linking, TouchableOpacity} from "react-native";
import Link from "../../components/Link";

type PrivacyPolicySProps = {
    navigation: NavigationProp<ParamListBase>
}
const PrivacyPolicyS = ({navigation}: PrivacyPolicySProps) => {
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
            <Box paddingX={5} mb={2} alignItems={'center'}>
                <Text fontSize={22} fontWeight={'600'}> Privacy Policy for weDoo Store

                    Effective Date: August 14, 2023</Text>

                <Text fontSize={22} fontWeight={'600'}> 1. Introduction</Text>

                <Text>
                    This Privacy Policy describes how the weDoo Store (referred to as "store", "we", "our") collects,
                    uses,
                    and protects your personal data when you use our store. We uphold high standards of privacy and
                    strive
                    to provide robust protection for your personal information.
                </Text>

                <Text fontSize={22} fontWeight={'600'}>2. Collected Data</Text>

                <Text>
                    We only collect necessary data that helps us provide you with quality service and conduct our
                    operations. Your data may include the following:
                </Text>

                <Text>
                    Name and contact information (e.g., email address, phone number).
                    Payment and delivery information.
                    Details of selected products and orders.
                </Text>
                <Text fontSize={22} fontWeight={'600'}> 3. Data Usage</Text>

                <Text>
                    We use your personal data solely for purposes related to the functioning of the weDoo Store:
                </Text>

                <Text>
                    Processing and fulfilling your orders and payments.
                    Arranging the delivery of ordered products.
                    Providing quality customer service.
                    Sharing information about order status and promotions.
                    Enhancing store operations, analyzing trends, and preferences.
                </Text>
                <Text fontSize={22} fontWeight={'600'}>4. Data Storage</Text>

                <Text>
                    We store your personal data for the duration necessary to achieve the aforementioned purposes and to
                    comply with applicable legal requirements. We take appropriate measures to protect your data from
                    unauthorized access, loss, or disclosure.
                </Text>

                <Text fontSize={22} fontWeight={'600'}>5. Data Disclosure</Text>

                <Text>
                    We do not share your personal data with third parties except when necessary for order fulfillment
                    and
                    servicing (e.g., delivery partners). We may also disclose information if required by law or to
                    protect
                    our rights and interests.
                </Text>

                <Text fontSize={22} fontWeight={'600'}>6. Your Rights</Text>

                <Text>
                    You have certain rights regarding your personal data:

                    Right to access your data and obtain a copy of the information.
                    Right to rectify inaccurate data.
                    Right to erase data (in certain cases).
                    Right to restrict data processing (in certain cases).
                    Right to object to processing based on legitimate grounds.
                    Right to data portability (in certain cases).
                </Text>
                <Text fontSize={22} fontWeight={'600'}>7. Contact Us</Text>

                <Text>
                    If you have any questions about our Privacy Policy or the processing of your data, please contact us
                    at <Link onPress={handleEmailLinkPress} styleLink={{borderBottomWidth: 1 }} text={'weedoshop420@gmail.com'}/>
                </Text>

                <Text fontSize={22} fontWeight={'600'}> 8. Changes to Privacy Policy</Text>

                <Text>
                    We reserve the right to make changes to this Privacy Policy. Any changes will be posted on this
                    page,
                    and we recommend checking for updates periodically.
                </Text>

                <Text>
                    We value your trust and are committed to protecting your personal data. Thank you for choosing the
                    weDoo
                    Store!
                </Text>

                <Text fontSize={18} fontWeight={'600'}>Effective Date: August 14, 2023</Text>
            </Box>
        </BaseWrapperComponent>
    );
};

export default PrivacyPolicyS;
