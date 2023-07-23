import { instance } from './config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserRegisterDataType } from 'screen/authScreens/RegisterS'
import {StoreType} from "./storesApi";


export const authApi = {
	async login(email: string, password: string) {
		return await instance.post<DataLoginType>(`auth/signin`, { email, password })
	},
	async getMe() {
		return await instance.get<UserType>(`auth/getMe`)
	},
	async register(data: UserRegisterDataType) {
		return await instance.post<DataLoginType>(`auth/signup`, data)
	},

	async refresh() {
		const refreshToken = await AsyncStorage.getItem('refreshToken')
		return await instance.post<DataLoginType>(`auth/refresh`, { refreshToken })
	},
}
export type DataLoginType = {
	accessToken: string
	refreshToken: string
	accessExp: number
	refreshExp: number
}
export type UserType = {
	_id: string,
	firstName: string,
	lastName: string,
	email: string,
	phone: string,
	location: string,
	favoritesStores: StoreType[],
	role: RoleType,
	createdAt: string,
	updatedAt: string
}
export type RoleType = 'customer' | 'admin' | 'store' | 'courier'
