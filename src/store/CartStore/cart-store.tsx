import {action, makeObservable, observable} from "mobx";
import {ProductType} from "../../api/productApi";

export type ProductCartType = ProductType & {
    productValue: number
}
export type CartType = {
    idStore: string,
    storeName: string
    products: ProductCartType[],
    totalSum: number
}

export class CartStore {

    carts: CartType[] = [] as CartType[]

    setToCartStore(carts: CartType) {
        this.carts.push(carts)
    }

    constructor() {
        makeObservable(this, {
            carts: observable,
            setToCartStore: action,
        })
        this.setToCartStore = this.setToCartStore.bind(this)
    }
}

export default new CartStore()
