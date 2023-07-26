import rootStore from "../../store/RootStore/root-store";
import {LoadingEnum} from "../../store/types/types";
import * as Location from "expo-location";

export const allowLocation = async () => {
    const {Notification} = rootStore
    Notification.setIsLoading(LoadingEnum.fetching)
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
        Notification.setIsLoading(LoadingEnum.success)
    }
}
export const getInfoAddressForCoords = async ({latitude, longitude}) => {
   try {
       const reverseGeocode = await Location.reverseGeocodeAsync({
           latitude,
           longitude,
       });

       if (reverseGeocode && reverseGeocode.length > 0) {
           const { country, city, street, postalCode, district, streetNumber } = reverseGeocode[0];
           console.log(reverseGeocode[0])
           const formatted_address = `${country} ${city ?? ""} ${street ?? ''} ${streetNumber ?? ''}`;
           return formatted_address
       }
   } catch (e) {
       console.log('error', e)
   }
}
