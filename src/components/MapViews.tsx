import React, {useEffect, useState} from 'react'
import MapView, {Marker} from 'react-native-maps'
import {Modal, StyleSheet, TouchableOpacity, View, Image} from 'react-native'
import {Box, Text} from 'native-base'
import arrowLeft from "../assets/images/arrow-left.png";
import myLocationImg from "../assets/images/myLocation.png";
import rootStore from "../store/RootStore/root-store";
import ArrowBack from "./ArrowBack";
import {AutoCompleteDataType} from "./AddressAutocomplete";
import Button from "./Button";
import {colors} from "../assets/colors/colors";
import * as Location from 'expo-location';
import {allowLocation} from "../utils/utils";
import AuthStore from "../store/AuthStore";
import {routerConstants} from "../constants/routerConstants";
import {useNavigation} from "@react-navigation/native";

type MapViewsProps = {
    currentDataMap: AutoCompleteDataType
    visible: boolean
    close: () => void

}
export const MapViews = ({visible, close, currentDataMap}: MapViewsProps) => {
    const {setLocation} = AuthStore
    const navigation = useNavigation<any>();
    const onPressGoBack = () => {
        close()
    }
    const [myLocation, setMyLocation] = useState(null);
   // const [markerPosition, setMarkerPosition] = useState(null);
    const [address, setAddress] = useState(null);
    const [mapRef, setMapRef] = useState(null);

    useEffect(() => {
        setMyLocation(currentDataMap.location)
        //setMarkerPosition(currentDataMap.positionMarker)
        setAddress(currentDataMap.address)
    }, [])

    if (!myLocation) {
        return <View style={styles.container}/>;
    }
    const getCurrentPositionHandler = async () => {
        const status = await allowLocation()
        if(status) {
            let currentLocation = await Location.getCurrentPositionAsync({});
            const {latitude, longitude} = currentLocation.coords;
            const reverseGeocode = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            if (reverseGeocode && reverseGeocode.length > 0) {
                const { country, city, street, postalCode } = reverseGeocode[0];
                const formatted_address = `${country}, ${city}, ${street}`;
                setAddress({...address, formatted_address});
            }
            setMyLocation({latitude, longitude});
           // setMarkerPosition({latitude, longitude});
            if (mapRef) {
                mapRef.animateToRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        }
    }
    const handleMapPress = (event) => {
        const {latitude, longitude} = event.nativeEvent.coordinate;
       // setMarkerPosition({latitude, longitude});
    };
    const onPressSaveLocationHandler = () => {
        setLocation({location: myLocation, address: address})
        navigation.navigate(routerConstants.REGISTRATION)
    }
    return <Modal visible={visible}>
        <Box style={styles.container}>
            <Box mt={5} zIndex={10} mb={5} position={'absolute'} left={5}>
                <ArrowBack goBackPress={onPressGoBack} img={arrowLeft}/>
            </Box>
            <MapView
                ref={(ref) => setMapRef(ref)}
                style={styles.map}
                initialRegion={{
                    latitude: myLocation?.latitude,
                    longitude: myLocation?.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                focusable={true}
                onPress={handleMapPress}
            >
                {/* {currentDataMap.positionMarker && (
                    <Marker
                        coordinate={currentDataMap.positionMarker}
                        title={currentDataMap.address.formatted_address}
                    />
                )}*/}
                <Marker
                    coordinate={{
                        latitude: myLocation?.latitude,
                        longitude: myLocation?.longitude,
                    }}
                    title={address?.formatted_address}
                />
            </MapView>
            <Box mt={5} zIndex={10} position={'absolute'} w={'100%'} bottom={5}>
                <Box position={'absolute'} bottom={140} right={0}>
                    <TouchableOpacity onPress={getCurrentPositionHandler}>
                        <Image style={{width: 82, height: 82}} source={myLocationImg} alt={'my-location'}/>
                    </TouchableOpacity>
                </Box>
                <Text textAlign={'center'} fontSize={24}
                      fontWeight={'500'}>{address?.formatted_address}</Text>
                <Box w={'100%'} mt={5} flex={1}>
                    <Button backgroundColor={colors.green}
                            styleContainer={styles.styleContainerBtn}
                            onPress={onPressSaveLocationHandler} title={'I\'m here'}/>
                </Box>
            </Box>
        </Box>
    </Modal>
}

const styles = StyleSheet.create({
    styleContainerBtn: {
        height: 54,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10
    },
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
})
