import { action, makeObservable, observable } from 'mobx'
import { dataSearchType, storesApi, StoreType } from '../../api/storesApi'
import { userApi } from '../../api/userApi'
import { ProductType } from '../../api/productApi'
import { SubCategoryType } from '../../api/subCategoriesApi'
import { UserType } from '../../api/authApi'

export class StoresStore {
	stores: StoreType[] = []
	store: StoreType = {} as StoreType
	favoriteStores: StoreType[] = [] as StoreType[]
	allProductStore: ProductType[] = [] as ProductType[]
	search: string = ''
	selectedSubCategoryId: string = ''
	chosenSubCategory: SubCategoryType | null = null

	getAndSetAllProduct(subCategories: SubCategoryType[]) {
		// @ts-ignore el.category === string
		const chosenSubCategories = subCategories?.filter(
			(el) => el.category === this.selectedSubCategoryId
		)
		if (chosenSubCategories[0]?.products?.length) {
			this.setChosenSubCategory(chosenSubCategories[0])
			return (this.allProductStore = chosenSubCategories[0]?.products)
		}
		if (!subCategories?.length) {
			return (this.allProductStore = [])
		}
		subCategories?.map((subCategory) => {
			subCategory.products?.map((product) => {
				this.allProductStore.push(product)
			})
		})
	}

	setChosenSubCategory(subCategory: SubCategoryType) {
		this.chosenSubCategory = subCategory
	}

	async saveFavoriteStore(idUser, idStore: string): Promise<UserType> {
		const { data } = await userApi.saveFavoriteStore(idUser, idStore)
		return data
	}

	async deleteFavoriteStore(idUser, idStore: string): Promise<UserType> {
		const { data } = await userApi.deleteFavoriteStore(idUser, idStore)
		return data
	}

	setFavoriteStore(stores: StoreType[]) {
		this.favoriteStores = stores
	}

	async getStores(): Promise<void> {
		const { data } = await storesApi.getStories()
		this.setStores(data.results)
	}

	async getStore(id: number): Promise<void> {
		const { data } = await storesApi.getStores(id)
		this.setStore(data)
	}

	async getFavoriteStores(id: string): Promise<void> {
		const { data } = await storesApi.getFavoriteStores(id)
		this.setFavoriteStore(data)
	}

	async searchStores(dataSearch: dataSearchType): Promise<void> {
		const { data } = await storesApi.searchStores(dataSearch)

		this.setStores(data.results)
	}

	setStores(stores: StoreType[]) {
		this.stores = stores
	}

	setStore(store: StoreType) {
		this.store = store
	}

	setSearch(text: string) {
		this.search = text
	}

	setSelectedSubCategoryId(id: string) {
		this.selectedSubCategoryId = id
	}

	constructor() {
		makeObservable(this, {
			stores: observable,
			search: observable,
			allProductStore: observable,
			chosenSubCategory: observable,
			selectedSubCategoryId: observable,
			store: observable,
			getStores: action,
			getStore: action,
			setStore: action,
			setSelectedSubCategoryId: action,
			favoriteStores: observable,
			setFavoriteStore: action,
			getFavoriteStores: action,
			deleteFavoriteStore: action,
			saveFavoriteStore: action,
			searchStores: action,
			setChosenSubCategory: action,
			setStores: action,
			getAndSetAllProduct: action,
			setSearch: action,
		})
		this.setFavoriteStore = this.setFavoriteStore.bind(this)
		this.setChosenSubCategory = this.setChosenSubCategory.bind(this)
		this.setSearch = this.setSearch.bind(this)
		this.getAndSetAllProduct = this.getAndSetAllProduct.bind(this)
		this.deleteFavoriteStore = this.deleteFavoriteStore.bind(this)
		this.saveFavoriteStore = this.saveFavoriteStore.bind(this)
		this.setStores = this.setStores.bind(this)
		this.searchStores = this.searchStores.bind(this)
		this.setStore = this.setStore.bind(this)
		this.setStore = this.setStore.bind(this)
		this.setSelectedSubCategoryId = this.setSelectedSubCategoryId.bind(this)
	}
}

export default new StoresStore()
