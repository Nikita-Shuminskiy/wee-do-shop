import React, {useEffect, useState} from 'react'
import MapView, {Marker} from 'react-native-maps'
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Box, Image} from 'native-base'
import arrowLeft from "../assets/images/arrow-left.png";
import * as Location from 'expo-location';
import rootStore from "../store/RootStore/root-store";
import {LoadingEnum} from "../store/types/types";
import ArrowBack from "./ArrowBack";

export const MapViews = ({visible, close}) => {
    const {Notification} = rootStore
    const onPressGoBack = () => {
        close()
    }
    const [location, setLocation] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);

    useEffect(() => {
        (async () => {
            Notification.setIsLoading(LoadingEnum.fetching)
            try {
                let {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Permission to access location was denied');
                    return;
                }
                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);
            } catch (e) {
                close()
                console.log('error')
            } finally {
                Notification.setIsLoading(LoadingEnum.success)
            }
        })();
    }, []);
    if (!location) {
        return <View style={styles.container}/>;
    }
    const handleMapPress = (event) => {
        const {latitude, longitude} = event.nativeEvent.coordinate;
        setMarkerPosition({latitude, longitude});
    };
    console.log(markerPosition)
    return <Modal visible={visible}>
        <Box style={styles.container}>
            <Box mt={5} zIndex={10} mb={5} position={'absolute'} left={5}>
                <ArrowBack goBackPress={onPressGoBack} img={arrowLeft}/>
            </Box>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location?.coords.latitude,
                    longitude: location?.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {markerPosition && (
                    <Marker
                        coordinate={markerPosition}
                        title="Custom Location"
                    />
                )}
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title="My Location"
                />
            </MapView>
        </Box>
    </Modal>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
})
