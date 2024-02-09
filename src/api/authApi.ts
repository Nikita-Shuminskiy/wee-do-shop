import {instance} from "./config"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {StoreType} from "./storesApi"
import {AddressType} from "../store/AuthStore/auth-store"

export const authApi = {
	async login(email: string, password: string) {
		return await instance.post<DataLoginType>(`auth/signin`, {email, password})
	},
	async getMe() {
		return await instance.get<UserType>(`auth/getme`)
	},
	async forgotPassword(email: string) {
		return await instance.post<{success: boolean}>(`auth/forgot-password`, {email})
	},
	async resetPassword(payload: PayloadResetPasswordType) {
		return await instance.post<{success: boolean}>(`auth/reset-password`, payload)
	},
	async checkVerificationCode(payload: {email: string; verificationCode: string}) {
		return await instance.post<{success: boolean}>(`auth/check-verification-code`, payload)
	},
	async register(data: UserRegisterDataType) {
		return await instance.post<DataLoginType>(`auth/signup`, data)
	},

	async refresh() {
		const refreshToken = await AsyncStorage.getItem("refreshToken")
		return await instance.post<DataLoginType>(`auth/refresh`, {refreshToken})
	},
	async getAppVersion() {
		return await instance.get<{mobileAppVersion: string}>(`settings`)
	},
}
export type PayloadResetPasswordType = { email: string; verificationCode: string; password: string }
export type DataLoginType = {
	accessToken: string
	refreshToken: string
	accessExp: number
	refreshExp: number
}
export type UserType = {
	_id: string
	firstName: string
	lastName: string
	email: string
	phone: string
	address: AddressType
	favoritesStores: StoreType[]
	role: RoleType
	createdAt: string
	updatedAt: string
}
export enum RoleType {
	Customer = 'customer',
	Admin = 'admin',
	Store = 'store',
	Courier = 'courier',
}
export type UserRegisterDataType = {
	email: string
	password: string
	confirmPassword: string
	firstName: string
	lastName: string
	phone: string
	privacyPolicyIsVerified: boolean
	address: AddressType
	role: RoleType
}