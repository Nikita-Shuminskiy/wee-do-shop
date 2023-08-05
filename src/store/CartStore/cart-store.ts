import {action, makeObservable, observable} from "mobx";
import {ProductType} from "../../api/productApi";
import {getTotalSumProductsCart, updateValueCartProducts} from "../../utils/utilsCart";

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

    cart: CartType = {} as CartType

    setToCartStore(carts: CartType) {
        this.cart = carts
    }

    removeCart() {
        this.cart = {} as CartType
    }

    removeProductToCart(productId: string) {
        const updatedProducts = this.cart.products.filter(product => product._id !== productId)
        const totalSum = getTotalSumProductsCart(updatedProducts)
        if(!updatedProducts.length) {
            return this.cart = {} as CartType
        }
        this.cart = {...this.cart, products: updatedProducts, totalSum}
    }

    updateProductToCart(productId: string, productValue) {
        const updatedProducts = updateValueCartProducts(this.cart.products, productValue, productId)
        const totalSum = getTotalSumProductsCart(updatedProducts)

        this.cart = {
            ...this.cart,
            totalSum,
            products: updatedProducts,
        }
    }

    constructor() {
        makeObservable(this, {
            cart: observable,
            setToCartStore: action,
            removeCart: action,
            updateProductToCart: action,
            removeProductToCart: action,
        })
        this.setToCartStore = this.setToCartStore.bind(this)
        this.removeCart = this.removeCart.bind(this)
        this.updateProductToCart = this.updateProductToCart.bind(this)
        this.removeProductToCart = this.removeProductToCart.bind(this)
    }
}

export default new CartStore()
