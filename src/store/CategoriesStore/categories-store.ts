import { action, makeObservable, observable } from 'mobx'
import { storesApi, StoreType } from '../../api/storesApi'
import { categoriesApi, CategoryType } from '../../api/categoriesApi'
import { BannersType, userApi } from "../../api/userApi";

export class CategoriesStore {
	categories: CategoryType[] = [] as CategoryType[]
	category: CategoryType = {} as CategoryType
	banners: BannersType[] = [] as BannersType[]
	async getCategories(){
		const { data } = await categoriesApi.getCategories()
		this.setCategories(data.results)
		return data.results
	}
	setBanners(banners: BannersType[]) {
		this.banners = banners
	}
	async getBanners() {
		const {data} = await userApi.getBanners()
		this.setBanners(data.results)
		return data.results
	}
	async getCategory(id: number): Promise<void> {
		const { data } = await categoriesApi.getCategory(id)
		this.setCategory(data)
	}

	setCategories(categories: CategoryType[]) {
		this.categories = categories
	}

	setCategory(category: CategoryType) {
		this.category = category
	}

	constructor() {
		makeObservable(this, {
			categories: observable,
			category: observable,
			banners: observable,
			setBanners: action,
			getBanners: action,
			getCategories: action,
			getCategory: action,
			setCategory: action,
			setCategories: action,
		})
		this.setBanners = this.setBanners.bind(this)
	}
}

export default new CategoriesStore()
