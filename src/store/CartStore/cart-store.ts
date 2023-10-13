import { action, makeObservable, observable } from 'mobx'
import { ProductType } from '../../api/productApi'
import { getTotalSumProductsCart, updateValueCartProducts } from '../../utils/utilsCart'
import { DiscountCodeType, userApi } from '../../api/userApi'
import { StoreType } from '../../api/storesApi'
import { deliveryPrice } from '../../utils/utils'

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
	currDeliveryPrice: number = deliveryPrice

	setToCartStore(cart: CartType | null) {
		this.cart = cart
	}
	removeCart() {
		console.log('remove')
		this.promoCode = null
		this.cart = {} as CartType
		this.currDeliveryPrice = deliveryPrice
	}
	removeProductToCart(productId: string) {
		const updatedProducts = this.cart.products.filter((product) => product._id !== productId)
		if (!updatedProducts.length) {
			this.removeCart()
			return
		}
		const totalSum = getTotalSumProductsCart(updatedProducts)
		this.cart = { ...this.cart, products: updatedProducts, totalSum }
	}
	updateProductToCart(productId: string, productValue: number) {
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
		let currDeliveryPrice = this.cart.totalSum >= 150000 ? 0 : deliveryPrice

		if (currDeliveryPrice > 0 && promo?.discountType === 'Delivery') {
			this.currDeliveryPrice = currDeliveryPrice * ((100 - promo?.discountPercentage) / 100)
		}
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

	setNewCart(store: StoreType) {
		const newCart: CartType = {
			idStore: store._id,
			storeName: store.name,
			deliviryTime: store.deliveryTime,
			totalSum: 0,
			products: [],
		}
		this.setToCartStore(newCart)
	}

	saveProductToCarts(currentProduct: ProductType, productValue: number, store: StoreType) {
		if (!this.cart?.storeName) {
			this.setNewCart(store)
		}
		const findProduct = this.cart?.products?.find((product) => product._id === currentProduct._id)

		if (findProduct) {
			this.updateProduct(currentProduct, productValue)
			return
		}
		this.addProductToCart(currentProduct, productValue)
	}

	constructor() {
		makeObservable(this, {
			cart: observable,
			currDeliveryPrice: observable,
			setToCartStore: action,
			setPromoCode: observable,
			promoCode: observable,
			sendPromoCode: action,
			removeCart: action,
			updateProductToCart: action,
			setNewCart: action,
			updateProduct: action,
			addProductToCart: action,
			removeProductToCart: action,
			saveProductToCarts: action,
		})
		this.setPromoCode = this.setPromoCode.bind(this)
		this.setNewCart = this.setNewCart.bind(this)
		this.saveProductToCarts = this.saveProductToCarts.bind(this)
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
