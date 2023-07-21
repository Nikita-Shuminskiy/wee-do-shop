import {instance} from "./config";
import {SubCategoryType} from "./subCategoriesApi";


export const storesApi = {
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
type SubCategoryWithoutStore = Omit<SubCategoryType, 'store'>;

export type StoreType = {
    "_id": string
    "name": string
    "description": string
    "phone": string
    "website": string
    "address": string
    "image": string
    "deliveryTime": string
    "popularityCoefficient": number
    "workingHours": string
    "products": string[]
    "subCategories": SubCategoryType[]
    "store": string // дубл с _id магазина
    "createdAt"?: string
    "updatedAt"?: string
}
