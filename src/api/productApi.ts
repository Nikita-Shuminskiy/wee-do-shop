import {instance} from "./config";
import {ImageSourcePropType} from "react-native";


export const productApi = {
    async getProducts() {
        return await instance.get<ProductsResType>(`product`)
    },
    async getProduct(id: number) {
        return await instance.get<ProductType>(`product${id}`)
    },
    async updateProduct(id: number, product: UpdateProduct) {
        return await instance.patch<ProductType>(`product${id}`, product)
    },
    async deleteProduct(id: number) {
        return await instance.delete<{ success: boolean }>(`product${id}`)
    },
}
type ProductsResType = {
    "results": ProductType[],
    "totalCount": number
}
export type ProductType = {
    "_id": string,
    "name": string,
    "description": string,
    "category": {
        "_id": string,
        "name": string,
        "createdAt": string,
        "updatedAt": string
    },
    "subCategory": {
        "_id": string,
        "name": string,
        "category": {
            "_id": string,
            "name": string,
            "createdAt": string,
            "updatedAt": string
        },
        "products": string[],
        "createdAt": string,
        "updatedAt": string
    },
    "store": string
    "price": number,
    "effect": string,
    "image": ImageSourcePropType,
    "createdAt": string,
    "updatedAt": string
}
export type UpdateProduct = {
    "name": string,
    "description": string,
    "subCategoryId": string,
    "price": number,
    "effect": string,
    "image": string
}
