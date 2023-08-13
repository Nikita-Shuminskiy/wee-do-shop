import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box, Text} from "native-base";
import {StyleSheet} from "react-native";
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import Button from "../../components/Button";
import {colors} from "../../assets/colors/colors";
import axios from "axios";
import {allowLocation} from "../../components/MapViews/utils";
import * as Location from "expo-location";
import Svg, {Path} from "react-native-svg";
import {decodePolyline} from "../../utils/utilsMap";
import {useNavigation} from "@react-navigation/native";

const CourierPickOrder = () => {
    const [location, setLocation] = useState(null);
    const [route, setRoute] = useState([]);
    const navigation = useNavigation()

    const onPressPickOrder = () => {
        fetchRoute();
    };
    const onPressCanselOrder = () => {
        navigation.goBack()
    }

    const fetchRoute = async () => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${location.latitude},${location.longitude}&destination=53.878707,27.525117&key=AIzaSyCDu3dMvEFIDgw_uqJWabVuauq0JVsu3NI`
            );

            const points = response.data.routes[0]?.overview_polyline.points;
            const decodedPoints = decodePolyline(points);

            setRoute(decodedPoints);
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };


    const getLocation = async () => {
        try {
            const status = await allowLocation()
            if (status) {
                let currentLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation});
                setLocation(currentLocation.coords);
            }
        } catch (e) {
            console.log('err', e)
        } finally {

        }
    }
    useEffect(() => {
        getLocation();
        const interval = setInterval(getLocation, 5000); // Обновлять каждые 5 секунд

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, []);
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box paddingX={5} w={'100%'} alignItems={'center'} flex={1} justifyContent={'space-between'}>
                <Box alignItems={'center'} mt={2} justifyContent={'center'}>
                    <Text fontSize={28} fontWeight={'700'}>Pick up order here:</Text>
                    <Text fontSize={18} textAlign={'center'} fontWeight={'500'}>89 Soi Lam Promtep 2,
                        Rawai</Text>
                </Box>
                <Box w={'100%'} borderRadius={16} mt={2} mb={2} flexGrow={1} h={300}>
                    <MapView
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 20,
                        }}
                        initialRegion={{
                            latitude: 0,
                            longitude: 0,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        provider={PROVIDER_GOOGLE}
                    >
                        {location && (
                            <>
                                <Marker
                                    coordinate={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                    }}
                                    title={'Your Location'}
                                >
                                    <Svg height={50} width={50}>
                                        <Path
                                            d="M10 0 L20 20 L0 20 Z"
                                            fill={colors.green} // Или другой цвет стрелки
                                            transform={`rotate(${0} 10 10)`}
                                        />
                                    </Svg>
                                </Marker>
                            </>
                        )}
                        <Marker
                            coordinate={{
                                latitude: 27.561831,
                                longitude: 53.902284,
                            }}
                            title={'1111'}
                        />
                        <Marker
                            coordinate={{
                                latitude: 27.525117,
                                longitude: 53.878707,
                            }}
                            title={'2222'}
                        />
                        <Polyline coordinates={route} strokeWidth={4} strokeColor={colors.blue}/>
                    </MapView>
                </Box>
                <Box w={'100%'}>
                    <Button styleContainer={styles.styleBtnContainer} backgroundColor={colors.green}
                            onPress={onPressPickOrder} title={'Order picked up'}/>
                    <Button styleContainer={styles.styleBtnContainer} styleText={{color: colors.black}}
                            backgroundColor={colors.grayLight} onPress={onPressCanselOrder}
                            title={'Cancel this order'}/>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
};
const styles = StyleSheet.create({
    styleBtnContainer: {
        marginVertical: 10
    }

})
export default CourierPickOrder;
