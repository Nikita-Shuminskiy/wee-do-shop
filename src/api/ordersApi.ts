import { instance } from './config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserRegisterDataType } from 'screen/authScreens/RegisterS'
import {StoreType} from "./storesApi";
import {AddressType} from "../store/AuthStore/auth-store";
import {RoleType, UserType} from "./authApi";


export const ordersApi = {
	async postOrders(data: SendDataOrderType) {
		return await instance.post<ResponseOrderType>(`order`, data)
	},
	async getOrders(id: string) {
		return await instance.get<UserType>(`order`)
	},
	async getOrder(id: string) {
		return await instance.get<UserType>(`order/${id}`)
	},
	async getOrderUserId(idUser: string) {
		return await instance.get<UserType>(`order/user/${idUser}`)
	},
	async updateOrder(id: string) {
		return await instance.patch<UserType>(`order/${id}/status`)
	},
}
export type SendDataOrderType = {
	"userId": string,
	"products":{
		"amount": number,
		"productId": string
	}[],
	"comment": string
}
export type ResponseOrderType = {
	"_id": string,
	"user": string,
	"courier": {
		"_id": string
		"firstName": string
		"lastName": string
		"email": string,
		"phone": string,
		"address": AddressType,
		"favoritesStores": string[],
		"botType": "Telegram" | "line",
		"externalStoreId": string,
		"role": RoleType,
		"createdAt": string,
		"updatedAt": string
	},
	"products":{
		"amount": number,
		"product": string
	}[],
	"totalPrice": number,
	"status": StatusType,
	"comment": string,
	"rejectReason": string

}
export enum StatusType {
		Placed = 'Placed',
		Confirmed = 'Confirmed',
		WaitingForPickUp = 'WaitingForPickUp',
		OnTheWay = 'OnTheWay',
		Completed = 'Completed',
		Canceled = 'Canceled'
}
