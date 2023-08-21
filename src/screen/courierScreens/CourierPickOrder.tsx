import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box, Text} from "native-base";
import {StyleSheet, TouchableOpacity} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import Button from "../../components/Button";
import {colors} from "../../assets/colors/colors";
import {getFormattedAddress} from "../../components/MapViews/utils";
import {useNavigation} from "@react-navigation/native";
import {observer} from "mobx-react-lite";
import CourierOrderStore from "../../store/CourierOrderStore/courier-order-store";
import rootStore from "../../store/RootStore/root-store";
import {StatusType} from "../../api/ordersApi";
import {routerConstants} from "../../constants/routerConstants";
import {splittingWord} from "../../utils/utils";
import {AntDesign} from "@expo/vector-icons";
import OrderUserInfo from "../../components/OrderUserInfo";

const CourierPickOrder = observer(() => {
    const {selectedOrder, deliverOrderInProgressInfo, selectedOrderStatus, connectToSocketOrder} = CourierOrderStore
    const {CourierOrderService} = rootStore
    const navigation = useNavigation<any>()
    const [showUserInfoModal, setShowUserInfoModal] = useState(false)

    const isStatusOnTheWay = deliverOrderInProgressInfo?.status === StatusType.OnTheWay

    const onPressPickOrder = (status: StatusType) => {
        CourierOrderService.updateOrderStatus(status)
        if (status === StatusType.Completed) {
            navigation.navigate(routerConstants.COURIER_ORDERS)
        }
    };

    const onPressCanselOrder = () => {
        navigation.goBack()
    }


    const latitude = isStatusOnTheWay ? selectedOrder.user.address?.location.coordinates[1] : selectedOrder.store?.location.coordinates[1]
    const longitude = isStatusOnTheWay ? selectedOrder.user.address?.location.coordinates[0] : selectedOrder.store?.location.coordinates[0]

    const formattedAddressStore = getFormattedAddress({
        fullAddress: selectedOrder.store?.address,
        location: selectedOrder.store?.location
    })
    const formattedAddressUser = getFormattedAddress(selectedOrder?.user?.address)
    useEffect(() => {
        connectToSocketOrder()
    }, [])
    const onShowUserInfoModal = () => {
        setShowUserInfoModal(true)
    }
    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <Box paddingX={5} w={'100%'} alignItems={'flex-start'} flex={1} justifyContent={'space-between'}>
                    <Box alignItems={'center'} w={'100%'} flexDirection={'row'} mt={2} justifyContent={'space-between'}>
                        <Box alignItems={'flex-start'}>
                            <Text fontSize={28}
                                  fontWeight={'700'}>{isStatusOnTheWay ? 'Deliver order here' : 'Pick up order here'}:</Text>
                            <Text fontSize={18} maxW={300}
                                  fontWeight={'500'}>{isStatusOnTheWay ? formattedAddressUser : formattedAddressStore}</Text>
                            <Text color={colors.gray}>Current order status:{' '}<Text
                                color={colors.black}>{splittingWord(selectedOrderStatus ?? selectedOrder.status)}</Text></Text>
                        </Box>
                        <TouchableOpacity onPress={onShowUserInfoModal}>
                            <Box justifyContent={'center'} alignItems={'center'}>
                                <AntDesign name="infocirlceo" size={24} color={colors.gray}/>
                                <Text color={colors.gray}>Order info</Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                    <Box w={'100%'} borderRadius={16} mt={2} mb={2} flexGrow={1} h={300}>
                        <MapView
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 20,
                            }}
                            initialRegion={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            provider={PROVIDER_GOOGLE}
                        >

                            <Marker
                                coordinate={{
                                    latitude: latitude,
                                    longitude: longitude,
                                }}
                                focusable={true}
                                title={selectedOrder.store?.name}
                            />
                            {
                                isStatusOnTheWay && <Marker
                                    coordinate={{
                                        latitude: latitude,
                                        longitude: longitude,
                                    }}
                                    focusable={true}
                                    title={selectedOrder.store?.name}
                                />
                            }
                        </MapView>
                    </Box>
                    <Box w={'100%'}>
                        <Button styleContainer={styles.styleBtnContainer} backgroundColor={colors.green}
                                onPress={() => {
                                    onPressPickOrder(isStatusOnTheWay ? StatusType.Completed : StatusType.OnTheWay)
                                }} title={isStatusOnTheWay ? 'Order delivered' : 'Order picked up'}/>
                    </Box>
                </Box>
            </BaseWrapperComponent>
            {showUserInfoModal && <OrderUserInfo show={showUserInfoModal} onClose={() => setShowUserInfoModal(false)}
                                                 order={selectedOrder}/>}
        </>
    );
});
const styles = StyleSheet.create({
    styleBtnContainer: {
        marginVertical: 10
    }

})
export default CourierPickOrder;
/*<Marker
    coordinate={{
        latitude: 27.525117,
        longitude: 53.878707,
    }}
    title={'2222'}
/>
<Polyline coordinates={route} strokeWidth={4} strokeColor={colors.blue}/>*/
/*{location && (
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
)}*/
/*
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
}, []);*/
