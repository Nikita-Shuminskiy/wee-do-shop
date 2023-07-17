import {instance} from "./config";
import {DataLoginType} from "./apiAuth";


export const storeApi = {
    async getStories() {
        return await instance.get<StoriesType>(`stores`)
    },
    async getStores(id:number) {
        return await instance.get<StoreType>(`stores${id}`)
    },
    async updateStores(id:number, stores: StoreType) {
        return await instance.patch<StoreType>(`stores${id}`, stores)
    },
    async deleteStores(id:number) {
        return await instance.delete<{success: boolean}>(`stores${id}`)
    },
}
type StoriesType = {
    "results": StoreType[],
    "totalCount": number
}
export type StoreType = {
    "_id": string,
    "name": string,
    "description": string,
    "phone": string,
    "website": string,
    "address": string,
    "image": string,
    "deliveryTime": string,
    "popularityCoefficient": number,
    "workingHours": string,
    "products": string[],
    "createdAt"?: string,
    "updatedAt"?: string
}
