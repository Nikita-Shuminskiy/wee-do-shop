import { instance } from './config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserRegisterDataType } from 'screen/authScreens/RegisterS'
import { StoreType } from './storesApi'
import { AddressType } from '../store/AuthStore/auth-store'
import { UserType } from './authApi'

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
		return await instance.patch(`users/${idUser}`, data)
	},
	async getBanners() {
		return await instance.get<ResponseBannersType>(`banners`)
	},
	async sendDiscountCode(key: string, userId: string) {
		return await instance.post<DiscountCodeType>(`/discount-code${key}/check`, {userId})
	},
}
export type OptionalUserType = Partial<UserType> & { password?: string }
export type DiscountCodeType = {
	key: string
	discountType: 'Delivery' //
	usageType: string //"Public"
	discountPercentage: number
	isActive: boolean
	publicAmountOfUsage: number
	perUserUsage: number
	user: string
	startValidDate: string
	endValidDate: string
}
export type BannersType = {
	_id: string
	name: string
	isActive: boolean
	priority: number
	image: string
	createdAt: string
	updatedAt: string
}
export type ResponseBannersType = {
	totalCount: number
	results: BannersType[]
}

