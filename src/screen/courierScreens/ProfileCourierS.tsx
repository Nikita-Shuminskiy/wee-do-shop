import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import AuthStore from "../../store/AuthStore/auth-store";
import {Box, Image, Text} from "native-base";
import Button from "../../components/Button";
import {colors} from "../../assets/colors/colors";
import logo from '../../assets/images/logoWeeDo.png'

const ProfileCourierS = () => {
    const {logOut, user} = AuthStore
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box paddingX={5} mt={5} justifyContent={'space-between'} w={'100%'} flex={1}>
                <Box alignItems={'center'}>
                    <Image w={200} h={260} alt={'logo-we-do'} source={logo}/>
                    <Text fontSize={28} mt={2} fontWeight={'700'}>Profile</Text>
                </Box>
                <Box w={'100%'} justifyContent={'flex-start'} mt={10} flex={1}>
                    <Text color={colors.gray} fontSize={15} mb={2} fontWeight={'500'}>First name: <Text
                        color={colors.black}>{user.firstName}</Text> </Text>
                    <Text color={colors.gray} fontSize={15} mb={2} fontWeight={'500'}>Last name: <Text
                        color={colors.black}>{user.lastName}</Text></Text>
                    <Text color={colors.gray} fontSize={15} fontWeight={'500'}>Phone: <Text
                        color={colors.black}>{user.phone}</Text></Text>
                </Box>
                <Box>
                    <Button backgroundColor={colors.green} onPress={logOut} title={'Log out'}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
};

export default ProfileCourierS;
