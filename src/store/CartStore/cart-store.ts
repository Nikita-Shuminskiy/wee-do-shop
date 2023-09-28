import { action, makeObservable, observable } from 'mobx'
import { ProductType } from '../../api/productApi'
import { getTotalSumProductsCart, updateValueCartProducts } from '../../utils/utilsCart'
import { DiscountCodeType, userApi } from '../../api/userApi'

export type ProductCartType = ProductType & {
	amount: number
}
export type CartType = {
	idStore: string
	storeName: string
	products: ProductCartType[]
	totalSum: number
	deliviryTime: string
}

export class CartStore {
	cart: CartType | null = null
	promoCode: DiscountCodeType | null = null

	setToCartStore(cart: CartType | null) {
		this.cart = cart
	}

	removeCart() {
		this.cart = {} as CartType
	}

	removeProductToCart(productId: string) {
		const updatedProducts = this.cart.products.filter((product) => product._id !== productId)

		const totalSum = getTotalSumProductsCart(updatedProducts)
		if (!updatedProducts.length) {
			return (this.cart = {} as CartType)
		}
		this.cart = { ...this.cart, products: updatedProducts, totalSum }
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

	async sendPromoCode(key: string, userId: string) {
		const { data } = await userApi.sendDiscountCode(key, userId)
		this.setPromoCode(data)
		return data
	}

	setPromoCode(promo: DiscountCodeType) {
		this.promoCode = promo
	}

	addProductToCart(item, productValue) {
		const newProduct = { ...item, amount: productValue }
		this.setToCartStore({
			...this.cart,
			totalSum: this.cart.totalSum
				? this.cart.totalSum + productValue * item.price
				: productValue * item.price,
			products: [...this.cart.products, newProduct],
		})
	}

	updateProduct(item, productValue) {
		const updatedProducts = updateValueCartProducts(this.cart.products, productValue, item._id)
		const totalSum = getTotalSumProductsCart(updatedProducts)
		this.setToCartStore({
			...this.cart,
			totalSum: totalSum,
			products: updatedProducts,
		})
	}

	constructor() {
		makeObservable(this, {
			cart: observable,
			setToCartStore: action,
			setPromoCode: observable,
			promoCode: observable,
			sendPromoCode: action,
			removeCart: action,
			updateProductToCart: action,
			updateProduct: action,
			addProductToCart: action,
			removeProductToCart: action,
		})
		this.setPromoCode = this.setPromoCode.bind(this)
		this.updateProduct = this.updateProduct.bind(this)
		this.sendPromoCode = this.sendPromoCode.bind(this)
		this.addProductToCart = this.addProductToCart.bind(this)
		this.setToCartStore = this.setToCartStore.bind(this)
		this.removeCart = this.removeCart.bind(this)
		this.updateProductToCart = this.updateProductToCart.bind(this)
		this.removeProductToCart = this.removeProductToCart.bind(this)
	}
}

export default new CartStore()
