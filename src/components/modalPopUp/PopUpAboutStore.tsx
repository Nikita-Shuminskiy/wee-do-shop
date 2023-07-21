import React from 'react';
import {Box, Text} from "native-base";
import {StyleSheet} from 'react-native';
import ModalPopup from "../pop-up";
import {colors} from "../../assets/colors/colors";
import {StoreType} from "../../api/storesApi";
import Link from "../Link";
import {Feather, Fontisto, Ionicons, SimpleLineIcons} from '@expo/vector-icons';
import MapView, {Marker} from "react-native-maps";

type PopUpAboutStoreProps = {
    show: boolean
    currentStore: StoreType
    onClose: () => void
}
const PopUpAboutStore = ({
                             show,
                             onClose,
                             currentStore
                         }: PopUpAboutStoreProps) => {

    const onPressLink = () => {

    }

    return (
        <ModalPopup visible={show} onClose={onClose}>
            <Box flex={1} w={'100%'} alignItems={'flex-start'} justifyContent={'space-between'}>
                <Text fontSize={22} fontWeight={'700'} mb={2}>{currentStore?.name}</Text>
                <Text mb={2}>{currentStore?.description}</Text>
                <Box flexDirection={'row'} alignItems={'center'}>
                    <SimpleLineIcons name="location-pin" size={24} color={'#BABABA'}/>
                    <Text ml={2} mb={2}>{currentStore?.address}</Text>
                </Box>
                <Box flexDirection={'row'} alignItems={'center'}>
                    <Ionicons name="time-outline" size={27} color={'#BABABA'}/>
                    <Text ml={2} mb={2}>{currentStore?.workingHours}</Text>
                </Box>
                <Box flexDirection={'row'} alignItems={'center'}>
                    <Fontisto name="world-o" size={24} color={'#BABABA'}/>
                    <Text ml={2} mb={2}>{currentStore?.website}</Text>
                </Box>
                <Box flexDirection={'row'} alignItems={'center'}>
                    <Feather name="phone-call" size={24} color={'#BABABA'}/>
                    <Text ml={2} mb={2}>{currentStore?.phone}</Text>
                </Box>
                <Box w={'100%'} flexGrow={1} h={300}>
                    <MapView
                        style={{ width: '100%',
                            height: '100%',}}
                        initialRegion={{
                            latitude: 46.729553,
                            longitude: -94.6858998,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: 46.729553,
                                longitude: -94.6858998,
                            }}
                            title={'121'}
                        />
                    </MapView>
                </Box>
                <Link styleText={styles.styleTextLink} onPress={onPressLink} text={'Legal information'}/>
            </Box>
        </ModalPopup>
    );
};
const styles = StyleSheet.create({
    styleTextLink: {
        color: colors.black
    }
});
/*{"address": {"formatted_address": "Minnesota, USA", "name": "Minnesota"}, "location": {"latitude": 46.729553, "longitude": -94.6858998}, "positionMarker": {"latitude": 46.7295
53, "longitude": -94.6858998}}
*/
export default PopUpAboutStore;
