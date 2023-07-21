import {instance} from "./config";
import {DataLoginType} from "./apiAuth";
import {StoreType} from "./storesApi";
import {ProductType} from "./productApi";

// подкатегории шишки. гашиш
export const categoriesApi = {
    async getSubCategories() {
        return await instance.get<SebCategoriesResType>(`sub-category`)
    },
    async getSubCategory(id: number) {
        return await instance.get<SubCategoryType>(`sub-category${id}`)
    },
    async updateSubCategory(id: number, subCategory: any) {
        return await instance.patch<UpdateSubCategory>(`sub-category${id}`, subCategory)
    },
    async deleteSubCategory(id: number) {
        return await instance.delete<{ success: boolean }>(`sub-category${id}`)
    },
}
type SebCategoriesResType = {
    "results": SubCategoryType[],
    "totalCount": number
}

export type SubCategoryType = {
    "_id": string,
    "name": string,
    "category": {
        "_id": string,
        "name": string,
        "createdAt": string,
        "updatedAt": string
    },
    "products": ProductType[],
    "createdAt": string,
    "updatedAt": string
    "store": StoreType | string // при получении get store тут строка (id магаза) дублируються с _id,
}
export type UpdateSubCategory = {
    "name": string,
    "categoryId": string,
    "storeId": string,
    "products": string[]
}
