import {action, makeObservable, observable} from "mobx";
import {ProductType} from "../../api/productApi";

export type ProductCartType = ProductType & {
    productValue: number
}
export type CartType = {
    idStore: string,
    products: ProductCartType[],
    totalSum: number
}

export class CartStore {

    carts: CartType[] = [] as CartType[]

    setToCartStore(product: ProductType, productValue: number, storeId) {
        const findStore = this.carts.find(store => store.idStore === storeId)
        if (findStore) {
            const findProduct = findStore.products.find(products => products._id === product._id)
            if (findProduct) {
                findProduct.productValue = productValue
            } else {
                findStore.products.push({...product, productValue: productValue})
            }
            findStore.products.forEach((cart) => {
                const totalSum = findStore.products.reduce(
                    (sum, item) => sum + item?.price * item.productValue,
                    0
                );
                findStore.totalSum = totalSum;
            });
            return
        }
        const newCart = {
            idStore: product.store,
            products: [{...product, productValue: productValue}],
            totalSum: product.price * productValue
        }
        this.carts.push(newCart)
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
