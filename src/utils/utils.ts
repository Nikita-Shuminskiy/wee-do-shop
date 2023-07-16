import regex from './helpers/regex'
import {LoadingEnum} from "../store/types/types";
import * as Location from "expo-location";
import rootStore from "../store/RootStore/root-store";

export const validateEmail = (email: string) => {
    return regex.email.test(email.trim())
}
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
        console.log('error')
    } finally {
        Notification.setIsLoading(LoadingEnum.success)
    }
}
