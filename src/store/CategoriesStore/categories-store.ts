import { action, makeObservable, observable } from 'mobx'
import { storesApi, StoreType } from '../../api/storesApi'
import { categoriesApi, CategoryType } from '../../api/categoriesApi'

export class CategoriesStore {
	categories: CategoryType[] = [] as CategoryType[]
	category: CategoryType = {} as CategoryType

	async getCategories(): Promise<void> {
		const { data } = await categoriesApi.getCategories()
		this.setCategories(data.results)
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
			getCategories: action,
			getCategory: action,
			setCategory: action,
			setCategories: action,
		})
	}
}

export default new CategoriesStore()
