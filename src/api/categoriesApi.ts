import { instance } from './config'

export const categoriesApi = {
	async getCategories() {
		return await instance.get<CategoryType[]>(`category/available`)
	},
	async getCategory(id: number) {
		return await instance.get<CategoryType>(`category${id}`)
	},
	async updateCategory(id: number, category: CategoryType) {
		return await instance.patch<CategoryType>(`category${id}`, category)
	},
	async deleteCategory(id: number) {
		return await instance.delete<{ success: boolean }>(`category${id}`)
	},
}

export type CategoryType = {
	_id: string
	name: string
	createdAt: string
	updatedAt: string
	image: string
}
