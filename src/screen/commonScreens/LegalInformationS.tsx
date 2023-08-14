import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Box, Image, Text} from "native-base";
import ArrowBack from "../../components/ArrowBack";
import arrowLeft from "../../assets/images/arrow-left.png";
import logoImg from "../../assets/images/logoWeeDo.png";

type LegalInformationSProps = {
    navigation: NavigationProp<ParamListBase>
}
const LegalInformationS = ({navigation}: LegalInformationSProps) => {
    const onPressGoBack = () => {
        navigation.goBack()
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box paddingX={5} alignItems={'center'}>
                <Box mt={5} mb={5} position={'absolute'} left={5}>
                    <ArrowBack goBackPress={onPressGoBack} img={arrowLeft}/>
                </Box>
                <Image w={123} h={158} alt={'logo'} source={logoImg} mt={5} mb={5}/>
            </Box>
            <Box paddingX={5} mb={2} alignItems={'center'}>

                <Text>
                    Welcome to weDoo store – your trusted partner in the world of quality goods and pleasures! We are a
                    team
                    of enthusiasts dedicated to providing you with the finest products for your everyday comfort and
                    enjoyment.
                </Text>

                <Text>
                    Our shelves showcase a variety of products catering to diverse needs. Whether you're seeking
                    delectable
                    delicacies for the epicurean in you or practical items for daily use, we have it all to delight you
                    and
                    your loved ones.
                </Text>

                <Text>
                    If you're a connoisseur of taste, our food section is thrilled to offer you a wide array of natural
                    and
                    top-notch products. From fresh ingredients to gourmet treats, our items will make your culinary
                    endeavors truly magical. We meticulously adhere to safety and quality standards to ensure only the
                    best
                    for you.

                </Text>
                <Text>
                    Additionally, we also offer unique products for your day-to-day life. From convenient home
                    accessories
                    to practical gadgets, we have what will make your life more convenient and vibrant.
                </Text>

                <Text>
                    We value our customers and aim to provide you with exceptional service. Our friendly team is always
                    ready to assist you with product choices and answer any queries you may have.
                </Text>

                <Text>
                    The weDoo store is more than just a shopping destination, it's a place where you can find pleasure,
                    inspiration, and quality. We take pride in what we do and are delighted to offer you an
                    unforgettable
                    shopping experience. Come visit us and let us make your day special!
                </Text>
            </Box>
        </BaseWrapperComponent>
    );
};

export default LegalInformationS;
