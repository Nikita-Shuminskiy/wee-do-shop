import rootStore from "../../store/RootStore/root-store";
import {LoadingEnum} from "../../store/types/types";
import * as Location from "expo-location";
import {AddressType} from "../../store/AuthStore/auth-store";

export const allowLocation = async () => {
    const {Notification} = rootStore
    try {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }
        return status
    } catch (e) {
        console.log('error', e)
    } finally {
    }
}
export const getInfoAddressForCoords = async ({latitude, longitude}) => {
    try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
        });

        if (reverseGeocode && reverseGeocode.length > 0) {
            const {
                country,
                city,
                street,
                region,
                name,
                district,
                postalCode,
                streetNumber
            } = reverseGeocode[0];
            const formatted_address = `${country} ${city ? city : district ? district : ""} ${street ?? ''} ${streetNumber ?? ''} ${region ?? ""}`;
            return {
                formatted_address,
                country: country ?? region,
                city: city ? city : region ? region : district ? district : '',
                street: street ?? district,
                house: streetNumber,
                /* apartment: string,*/
                postalCode: postalCode
            }
        }
    } catch (e) {
        console.log('error', e)
    }
}
export const getFormattedAddress = (currentLocation: AddressType) => {
    const fullAddress = currentLocation?.fullAddress // подьезд этаж
    return `${fullAddress?.country ?? ''} ${fullAddress?.city ?? ""} ${fullAddress?.street ?? ''} ${fullAddress?.house ?? ''} ${fullAddress?.apartment ?? ''}`;
}
export const formatProductPrice = (price) => {
    const priceInDollars = price / 100;
    return price % 100 === 0 ? String(priceInDollars) : priceInDollars.toFixed(2);
}
