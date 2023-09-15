import { instance } from './config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserRegisterDataType } from 'screen/authScreens/RegisterS'
import {StoreType} from "./storesApi";
import {AddressType} from "../store/AuthStore/auth-store";
import {UserType} from "./authApi";


export const userApi = {
	async saveFavoriteStore(idUser: string, isStore: string) {
		return await instance.patch<UserType>(`users/${idUser}/favoriteStore/${isStore}`)
	},
	async deleteFavoriteStore(idUser: string, isStore: string) {
		return await instance.delete<UserType>(`users/${idUser}/favoriteStore/${isStore}`)
	},
	async getUser(idUser: string) {
		return await instance.get<UserType>(`users/${idUser}`)
	},
	async updateUser(idUser: string, data: OptionalUserType) {
		return await instance.patch(`users/${idUser}`, {data})
	},
}
export type OptionalUserType = Partial<UserType> & { password?: string };

