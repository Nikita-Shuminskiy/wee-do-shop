import {instance} from "./config";
import {DataLoginType} from "./apiAuth";

// подкатегории шишки. гашиш
export const categoriesApi = {
    async getSubCategories() {
        return await instance.get(`sub-category`)
    },
    async getSubCategory(id: number) {
        return await instance.get(`sub-category${id}`)
    },
    async updateSubCategory(id: number, subCategory: any) {
        return await instance.patch(`sub-category${id}`, subCategory)
    },
    async deleteSubCategory(id: number) {
        return await instance.delete<{ success: boolean }>(`sub-category${id}`)
    },
}
