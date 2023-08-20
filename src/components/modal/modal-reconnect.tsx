import React from 'react';
import logo from '../../assets/images/logoWeeDo.png'
import {Modal} from "react-native";
import {Box, Text, Image} from "native-base";
import Button from "../Button";
import {colors} from "../../assets/colors/colors";

type ModalReconnectProps = {
    visible: boolean
    checkInternetConnection: () => void
}
const ModalReconnect = ({visible, checkInternetConnection}: ModalReconnectProps) => {
    const onPressReconnect = () => {
        checkInternetConnection()
    }
    return (
        <Modal animationType={'fade'} visible={visible}>
            <Box paddingX={5} alignItems={'center'} mt={2} flex={1} justifyContent={'space-evenly'}>
                <Image w={200} h={260} alt={'logo'} source={logo}/>
                <Text fontSize={22} fontWeight={'700'}>Check the internet connection</Text>
                <Box w={'100%'}>
                    <Button backgroundColor={colors.green} onPress={onPressReconnect} title={'Reconnect'}/>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalReconnect;
