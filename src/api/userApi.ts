import { instance } from './config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserRegisterDataType } from 'screen/authScreens/RegisterS'


export const userApi = {
	async saveFavoriteStore(idUser: string, isStore: string) {
		return await instance.patch<DataUserType>(`users/${idUser}/favoriteStore/${isStore}`)
	},
	async deleteFavoriteStore(idUser: string, isStore: string) {
		return await instance.delete<DataUserType>(`users/${idUser}/favoriteStore/${isStore}`)
	},
	async getUser(idUser: string) {
		return await instance.get<DataUserType>(`users/${idUser}`)
	},
}
export type DataUserType = {
	"_id": string,
	"firstName": string,
	"lastName": string,
	"email": string,
	"phone": string,
	"location": string,
	"favoritesStores": string[],
	"role": RoleType,
	"createdAt": string,
	"updatedAt": string
}

export type RoleType = 'customer' | 'admin' | 'store' | 'courier'
