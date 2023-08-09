import React, {useEffect, useState} from 'react'
import MapView, {Marker} from 'react-native-maps'
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Box, Text} from 'native-base'
import arrowLeft from "../../assets/images/arrow-left-back.png";
import myLocationImg from "../../assets/images/myLocation.png";
import ArrowBack from "../ArrowBack";
import {AutoCompleteDataType} from "../AddressAutocomplete";
import Button from "../Button";
import {colors} from "../../assets/colors/colors";
import * as Location from 'expo-location';
import AuthStore from "../../store/AuthStore";
import {routerConstants} from "../../constants/routerConstants";
import {useNavigation} from "@react-navigation/native";
import NotificationStore from "../../store/NotificationStore/notification-store";
import {LoadingEnum} from "../../store/types/types";
import {allowLocation, getInfoAddressForCoords} from "./utils";
import {fullAddressType} from "../../store/AuthStore/auth-store";

type MapViewsProps = {
    currentDataMap: AutoCompleteDataType
    visible: boolean
    from: 'edit' | 'register'
    close: () => void

}
export const MapViews = ({visible, close, currentDataMap, from}: MapViewsProps) => {
    const {setLocation} = AuthStore
    const {setIsLoading} = NotificationStore
    const navigation = useNavigation<any>();
    const [mapInteractionEnabled, setMapInteractionEnabled] = useState(true);
    const onPressGoBack = () => {
        close()
    }
    const [myLocation, setMyLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [mapRef, setMapRef] = useState(null);
    const [fullInfo, setFullInfo] = useState<fullAddressType>(null);

    const getCurrentInfo = async () => {
        const status = await allowLocation()
        if (status) {
            const {latitude, longitude} = currentDataMap.location
            const {formatted_address, ...rest} = await getInfoAddressForCoords({latitude, longitude})
            return {
                formatted_address,
                ...rest
            }
        }
    }
    useEffect(() => {
        setMyLocation(currentDataMap.location)
        setAddress(currentDataMap.address)
        getCurrentInfo().then((data) => {
            const {formatted_address, ...rest} = data
            setFullInfo({...rest})

        })
    }, [])

    if (!myLocation) {
        return <View style={styles.container}/>;
    }
    const getCurrentPositionHandler = async (event) => {
        event.stopPropagation();
        setMapInteractionEnabled(false); // Отключаем взаимодействие с картой
        setIsLoading(LoadingEnum.fetching)
        try {
            const status = await allowLocation()
            if (status) {
                let currentLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
                const {latitude, longitude} = currentLocation.coords;
                const {formatted_address, ...rest} = await getInfoAddressForCoords({latitude, longitude})
                setAddress({formatted_address})
                setMyLocation({latitude, longitude});
                setFullInfo({...rest});
                if (mapRef) {
                    mapRef.animateToRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }
            }
            setMapInteractionEnabled(true)
        } catch (e) {
            console.log('err', e)
        } finally {
            setIsLoading(LoadingEnum.success)
        }
    }
    const handleMapPress = async (event) => {
        if (!mapInteractionEnabled) return
        const {latitude, longitude} = event.nativeEvent.coordinate;

        const {formatted_address, ...rest} = await getInfoAddressForCoords({latitude, longitude})
        setAddress({formatted_address})
        setFullInfo({...rest})
        setMyLocation({latitude, longitude});
    };
    const onPressSaveLocationHandler = () => {
        setLocation({
            fullAddress: {...fullInfo},
            location: {
                type: 'Point',
                coordinates: [myLocation.longitude, myLocation.latitude]
            }
        })
        if (from === 'edit') {
            return onPressGoBack()
        }
        navigation.navigate(routerConstants.REGISTRATION)
    }
    return <Modal visible={visible}>
        <Box style={styles.container}>
            <Box zIndex={10} position={'absolute'} top={50} justifyContent={'center'} flex={1} w={'100%'}>
                <Text textAlign={'center'} fontSize={24}
                      fontWeight={'500'}>{address?.formatted_address}</Text>
            </Box>
            <Box mt={5} zIndex={10} mb={5} top={0} position={'absolute'} left={5}>
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
                onPress={handleMapPress}
                key={'4139a6460624d97f'}

            >
                <Marker
                    coordinate={{
                        latitude: myLocation?.latitude,
                        longitude: myLocation?.longitude,
                    }}
                    title={address?.formatted_address}
                />
            </MapView>
            <Box mt={5} zIndex={10} position={'absolute'} w={'100%'} bottom={5}>
                <Box zIndex={100} position={'absolute'} bottom={100} right={0}>
                    <TouchableOpacity style={{pointerEvents: 'auto'}} onPress={getCurrentPositionHandler}>
                        <Image style={{width: 120, height: 120}} source={myLocationImg} alt={'my-location'}/>
                    </TouchableOpacity>
                </Box>
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
