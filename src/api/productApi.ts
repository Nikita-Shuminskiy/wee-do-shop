import {instance} from "./config";
import {DataLoginType} from "./apiAuth";


export const productApi = {
    async getProducts() {
        return await instance.get(`product`)
    },
    async getProduct(id: number) {
        return await instance.get(`product${id}`)
    },
    async updateProduct(id: number, category: any) {
        return await instance.patch(`product${id}`, category)
    },
    async deleteProduct(id: number) {
        return await instance.delete<{ success: boolean }>(`product${id}`)
    },
}
