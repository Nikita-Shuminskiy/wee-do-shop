import {instance} from "./config";
import {UserType} from "./authApi";
import {StoreType} from "./storesApi";
import {StatusType} from "./ordersApi";

export const courierApi = {
    async getOrders() {
        return await instance.post<ResponseOrdersTypes>(`courier/orders/available`)
    },
    async assignCourierOrder(idOrder: string, courierId: string) {
        return await instance.patch(`order/${idOrder}/assignCourier`, {courierId})
    },
}
export type ProductCourierOrderType = {
    "amount": 0,
    "serviceCommission": 0,
    "storeProfit": 0,
    "totalPrice": 0,
    "product": "string"
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
