import { action, makeObservable, observable } from 'mobx'
import { dataSearchType, storesApi, StoreType } from '../../api/storesApi'
import { userApi } from '../../api/userApi'
import { ProductType } from '../../api/productApi'
import { SubCategoryType } from '../../api/subCategoriesApi'
import { UserType } from '../../api/authApi'
import { isCurrentTimeWorkStoreRange } from "../../utils/utils";

export class StoresStore {
	stores: StoreType[] = []
	store: StoreType | null = null
	favoriteStores: StoreType[] = [] as StoreType[]
	allProductStore: ProductType[] = [] as ProductType[]
	search: string = ''
	selectedSubCategoryId: string = ''
	chosenSubCategory: SubCategoryType | null = null
	isOpenStoreNow: boolean = false


	setOpenStoreNow = (workingHours) => {
		this.isOpenStoreNow = isCurrentTimeWorkStoreRange(workingHours)
	}
	getAndSetAllProduct(subCategories: SubCategoryType[]) {
		if (!subCategories?.length) {
			return (this.allProductStore = []);
		}
		const uniqueProductIds = new Set<string>(); // Используем Set для хранения уникальных идентификаторов продуктов
		// @ts-ignore
		const chosenSubCategories = subCategories.filter((el) => el.category === this.selectedSubCategoryId);
		if (chosenSubCategories.length > 0 && chosenSubCategories[0].products?.length) {
			this.setChosenSubCategory(chosenSubCategories[0]);
		}

		subCategories.forEach((subCategory) => {
			subCategory.products?.forEach((product) => {
				uniqueProductIds.add(product._id); // Добавляем идентификатор продукта в Set
			});
		});

		this.allProductStore = Array.from(uniqueProductIds).flatMap((productId) =>
			// Находим продукт по его идентификатору
			subCategories.flatMap((subCategory) => subCategory.products).find((product) => product._id === productId)
		);
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

	async getStore(id: string): Promise<void> {
		const { data } = await storesApi.getStores(id)
		this.setStore(data)
	}

	async getFavoriteStores(id: string): Promise<StoreType[]> {
		const { data } = await storesApi.getFavoriteStores(id)
		this.setFavoriteStore(data)
		return data
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
		this.getAndSetAllProduct(store?.subCategories)
		this.setOpenStoreNow(store?.workingHours)
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
			isOpenStoreNow: observable,
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
			setOpenStoreNow: action,
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
		this.setSelectedSubCategoryId = this.setSelectedSubCategoryId.bind(this)
	}
}

export default new StoresStore()
