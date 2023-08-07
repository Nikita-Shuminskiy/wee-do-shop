import {instance} from './config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {UserRegisterDataType} from 'screen/authScreens/RegisterS'
import {StoreType} from './storesApi';
import {AddressType} from '../store/AuthStore/auth-store';
import {RoleType, UserType} from './authApi';
import {ProductType} from './productApi';


export const ordersApi = {
    async postOrders(data: SendDataOrderType) {
        return await instance.post<ApiOrderType>(`order`, data)
    },
    async getOrders(id: string) {
        return await instance.get<UserType>(`order`)
    },
    async getOrder(id: string) {
        return await instance.get<UserType>(`order/${id}`)
    },
    async getOrderUserId(idUser: string) {
        return await instance.get<OrdersResponseType>(`order/user/${idUser}`)
    },
    async updateOrder(id: string, status: StatusType) {
        return await instance.patch<UserType>(`order/${id}/status`, {status})
    },
}
export type OrdersResponseType = {
    results: ApiOrderType[],
    totalCount: number
}
export type ApiOrderType = {
    _id: string,
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        address: AddressType
        favoritesStores: string[],
        botType: 'Telegram' | 'Line',
        externalStoreId: string,
        role: RoleType,
        createdAt: string,
        updatedAt: string
    },
    courier: CourierType
    products: {
        amount: number,
        product: ProductType
    }[],
    totalPrice: 0,
    status: StatusType,
    comment: string,
    createdAt: string,
    updatedAt: string,
    rejectReason: string
}

export type SendDataOrderType = {
    userId: string,
    products: {
        amount: number,
        productId: string
    }[],
    comment: string
}
export type CourierType = {
    _id: string
    firstName: string
    lastName: string
    email: string,
    phone: string,
    address: AddressType,
    favoritesStores: string[],
    botType: 'Telegram' | 'line',
    externalStoreId: string,
    role: RoleType,
    createdAt: string,
    updatedAt: string
}


export enum StatusType {
    Placed = 'Placed',
    Confirmed = 'Confirmed',
    WaitingForPickUp = 'WaitingForPickUp',
    OnTheWay = 'OnTheWay',
    Completed = 'Completed',
    Canceled = 'Canceled'
}