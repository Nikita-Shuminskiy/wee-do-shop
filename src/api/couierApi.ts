import {instance} from "./config";
import {UserType} from "./authApi";
import {StoreType} from "./storesApi";
import {StatusType} from "./ordersApi";
import {ProductType} from "./productApi";

export const courierApi = {
    async getCourierOrders() {
        return await instance.get<ResponseOrdersTypes>(`courier/orders/available`)
    },
    async getTakenCourierOrders(idCourier: string, payload?: {status?: StatusType}) {
        return await instance.get<ResponseOrdersTypes>(`courier/${idCourier}/orders`, {params: payload})
    },
    async assignCourierOrder(idOrder: string, courierId: string) {
        return await instance.patch<AssignCourierOrderType>(`order/${idOrder}/assignCourier`, {courierId})
    },
    async updateOrderStatus(idOrder: string, status: StatusType) {
        return await instance.patch<UpdateStatusOrderType>(`order/${idOrder}/status`, {status})
    },
}
export type UpdateStatusOrderType = {
    "_id": string
    "number": number
    "user": UserType
    "courier": UserType
    "store": StoreType
    "products": [
        {
            "amount": 0,
            "serviceCommission": number
            "storeProfit": number
            "totalPrice": number
            "product": string
        }
    ],
    "price": {
        "serviceCommission": number
        "storeProfit": number
        "deliveryPrice": number
    },
    "totalPrice": number,
    "status": string,
    "comment": string,
    "rejectReason": string
}
export type AssignCourierOrderType = {
    "__v": number,
    "_id": string,
    "courier": string,
    "products": {
        "amount": number,
        "product": string,
    }[]
    "rejectReason": null,
    "status": StatusType,
    "store": string,
    "totalPrice": number,
    "updatedAt": string,
    "createdAt": string,
    "user": string,

}
export type ProductCourierOrderType = {
    "amount": 0,
    "serviceCommission": 0,
    "storeProfit": 0,
    "totalPrice": 0,
    "product": ProductType // тут нету sub category - category
}
export type PriceOrderCourierType = {
    "serviceCommission": 0,
    "storeProfit": 0,
    "deliveryPrice": 0
}
export type OrderCourierType = {
    "_id": string
    "number": number // номер заказа
    "user": UserType
    "courier": UserType
    "store": StoreType
    "products": ProductCourierOrderType[],
    "price": PriceOrderCourierType,
    "totalPrice": 0,
    "status": StatusType,
    "comment": string,
    "rejectReason": string
}
export type ResponseOrdersTypes = {
    "totalCount": number,
    "results": OrderCourierType[]
}
