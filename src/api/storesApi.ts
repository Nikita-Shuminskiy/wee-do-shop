import { instance } from './config'
import { SubCategoryType } from './subCategoriesApi'
import { ProductType } from './productApi'
import { CategoryType } from './categoriesApi'

export const storesApi = {
	async getStories() {
		return await instance.get<StoriesType>(`stores/available`)
	},
	async getFavoriteStores(idUser: string) {
		return await instance.get<StoreType[]>(`users/${idUser}/favoritesStores`)
	},
	async getStores(id: number) {
		return await instance.get<StoreType>(`stores/${id}`)
	},
	async updateStores(id: number, stores: StoreType) {
		return await instance.patch<StoreType>(`stores/${id}`, stores)
	},
	async deleteStores(id: number) {
		return await instance.delete<{ success: boolean }>(`stores/${id}`)
	},
	async searchStores({ categoryId, search }: dataSearchType) {
		const params: dataSearchType = {}
		if (categoryId) {
			params.categoryId = categoryId
		}
		if (search) {
			params.search = search
		}
		return await instance.get<StoriesType>(`stores/available`, { params })
	},
}
export type dataSearchType = {
	search?: string
	categoryId?: string
}
type StoriesType = {
	results: StoreType[]
	totalCount: number
}
type SubCategoryWithoutStore = Omit<SubCategoryType, 'store'>
export type WorkingHoursType = {
	monday: string
	tuesday: string
	wednesday: string
	thursday: string
	friday: string
	saturday: string
	sunday: string
}
export type AddressType = {
	country: string
	city: string
	street: string
	house: string
	apartment: string
	postalCode: string
}
export type StoreType = {
	_id: string
	name: string
	description: string
	phone: string
	website: string
	address: AddressType
	image: string
	deliveryTime: string
	popularityCoefficient: number
	workingHours: WorkingHoursType
	categories: CategoryType[]
	location: {
		type: string
		coordinates: number[] //  [myLocation.longitude , myLocation.latitude]
	}
	products: ProductType[]
	subCategories: SubCategoryType[]
	createdAt?: string
	updatedAt?: string
}
