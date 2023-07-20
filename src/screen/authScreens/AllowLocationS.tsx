import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box, Image, Text} from "native-base";
import location from '../../assets/images/locationBig.png'
import {StyleSheet} from "react-native";
import arrowLeft from "../../assets/images/arrow-left.png";
import Button from "../../components/Button";
import {colors} from "../../assets/colors/colors";
import ArrowBack from "../../components/ArrowBack";
import {routerConstants} from "../../constants/routerConstants";
import {allowLocation} from "../../components/MapViews/utils";

const AllowLocationS = ({navigation}) => {

    const onPressGoBack = () => {
        navigation.goBack()
    }
    const onPressAllowLocation = async () => {
      await allowLocation()
    }
    const onPressEnterLocation = () => {
        navigation.navigate(routerConstants.AUTOCOMPLETE_MAP)
    }
    return (
        <>
            <BaseWrapperComponent>
                <Box mt={10} mb={5}>
                    <ArrowBack goBackPress={onPressGoBack} img={arrowLeft}/>
                </Box>
                <Box alignItems={'center'} justifyContent={'space-evenly'} flex={1} paddingX={10}>
                    <Box w={'100%'}>
                        <Image w={350} h={264} alt={'logo'} source={location} mt={5} mb={5}/>
                        <Text textAlign={'center'} alignItems={'center'}>Find shops near you
                            By allowing location access, you can search for shops near you and receive more accurate
                            delivery</Text>
                    </Box>
                    <Box w={'100%'}>
                        <Box>
                            <Button backgroundColor={colors.green} onPress={onPressAllowLocation}
                                    title={'Allow location access'}/>
                        </Box>
                        <Box mt={5}>
                            <Button backgroundColor={'transparent'} styleText={{color: colors.black}}
                                    onPress={onPressEnterLocation}
                                    title={'Enter my location'}/>
                        </Box>
                    </Box>
                </Box>
            </BaseWrapperComponent>

        </>
    );
};
const styles = StyleSheet.create({})


export default AllowLocationS;
