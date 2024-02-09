import {instance} from "./config"
import {StoreType} from "./storesApi"
import {AddressType} from "../store/AuthStore/auth-store"
import {RoleType, UserType} from "./authApi"
import {ProductType} from "./productApi"

export const ordersApi = {
	async postOrders(data: SendDataOrderType) {
		return await instance.post<ApiOrderType>(`order`, data)
	},
	async getOrders(id: string) {
		return await instance.get<UserType>(`order`)
	},
	async getOrder(id: string) {
		return await instance.get<ApiOrderType>(`order/${id}`)
	},
	async getOrderUserId(payload: {
		idUser: string
		status?: StatusType
		limit?: number
		offset?: number
	}) {
		return await instance.get<OrdersResponseType>(`order/user/${payload.idUser}`, {
			params: payload,
		})
	},
}
export type OrdersResponseType = {
	results: ApiOrderType[]
	totalCount: number
}
export type ApiOrderType = {
	_id: string
	discountCode: string
	user: {
		_id: string
		firstName: string
		lastName: string
		email: string
		phone: string
		address: AddressType
		favoritesStores: string[]
		botType: 'Telegram' | 'Line'
		externalStoreId: string
		role: RoleType
		createdAt: string
		updatedAt: string
		usedDiscountCodes: any[]
	}
	courier: CourierType
	products: {
		amount: number
		product: ProductType
	}[]
	store: StoreType
	totalPrice: 0
	status: StatusType
	comment: string
	createdAt: string
	updatedAt: string
	rejectReason: string
	price: {
		deliveryPrice: number
		serviceCommission: number
		storeProfit: number
	}
}

export type SendDataOrderType = {
	userId: string
	discountCode?: string
	products: {
		amount: number
		productId: string
	}[]
	comment: string
}
export type CourierType = {
	_id: string
	firstName: string
	lastName: string
	email: string
	phone: string
	address: AddressType
	favoritesStores: string[]
	botType: 'Telegram' | 'line'
	externalStoreId: string
	role: RoleType
	createdAt: string
	updatedAt: string
}

export enum StatusType {
	Placed = 'Placed',
	Confirmed = 'Confirmed',
	WaitingForPickUp = 'WaitingForPickUp',
	OnTheWay = 'OnTheWay',
	Completed = 'Completed',
	Canceled = 'Canceled',
}
