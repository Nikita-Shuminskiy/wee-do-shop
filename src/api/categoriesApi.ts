import {instance} from "./config";
import {DataLoginType} from "./apiAuth";


export const categoriesApi = {
    async getCategories() {
        return await instance.get<CategoriesType>(`category`)
    },
    async getCategory(id: number) {
        return await instance.get<CategoryType>(`category${id}`)
    },
    async updateCategory(id: number, category: CategoryType) {
        return await instance.patch<CategoryType>(`category${id}`, category)
    },
    async deleteCategory(id: number) {
        return await instance.delete<{ success: boolean }>(`category${id}`)
    },
}
type CategoriesType = {
    "results": CategoryType[],
    "totalCount": number
}
export type CategoryType = {
    "_id": string,
    "name": string,
    "createdAt": string,
    "updatedAt": string
}
