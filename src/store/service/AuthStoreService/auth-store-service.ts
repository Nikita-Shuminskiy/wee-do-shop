import RootStore from '../../RootStore/root-store'import { LoadingEnum } from '../../types/types'import { UserRegisterDataType } from '../../../screen/authScreens/RegisterS'import AsyncStorage from '@react-native-async-storage/async-storage'import { AddressType } from '../../AuthStore/auth-store'import { ErrorResponse } from '../../../api/commonTypes'import { OptionalUserType } from '../../../api/userApi'export class AuthStoreService {	rootStore: typeof RootStore	constructor(rootStore: typeof RootStore) {		this.rootStore = rootStore	}	async registration(userData: UserRegisterDataType): Promise<void> {		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			await this.rootStore.AuthStore.registration(userData)			await this.rootStore.AuthStoreService.login({				email: userData.email,				password: userData.password,			})			this.rootStore.AuthStore.setLocation({} as AddressType)		} catch (e) {			const redirectToLoginHandler = () => this.rootStore.AuthStore.setAuth(false)			if (e.response.status === 409) {				this.rootStore.Notification.setNotification('error', true, e, redirectToLoginHandler)			}		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}	async login(userData: { email: string; password: string }): Promise<void> {		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			await this.rootStore.AuthStore.login({ email: userData.email, password: userData.password })			await this.rootStore.AuthStore.getMe()		} catch (e) {			const redirectToLoginHandler = () => this.rootStore.AuthStore.setAuth(false)			if (e?.response?.data?.statusCode === 401) {				this.rootStore.Notification.setNotification(					'error',					true,					'Incorrect data has been entered',					redirectToLoginHandler				)				return			}		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}	async updateUser(idUser: string, payload: OptionalUserType): Promise<boolean | void> {		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			await this.rootStore.AuthStore.updateUser(payload)			await this.rootStore.AuthStore.getUser(idUser)			await this.rootStore.StoresStore.getStores()			return true		} catch (e) {			const redirectToLoginHandler = () => this.rootStore.AuthStore.setAuth(false)			this.rootStore.Notification.setNotification('error', true, e, redirectToLoginHandler)		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}	async getMe(): Promise<void> {		this.rootStore.Notification.setIsLoading(LoadingEnum.fetching)		try {			const refreshToken = await AsyncStorage.getItem('refreshToken')			if (refreshToken) {				await this.rootStore.AuthStore.getMe()			}		} catch (e) {			console.log(e, 'getMe')		} finally {			this.rootStore.Notification.setIsLoading(LoadingEnum.success)		}	}}export default AuthStoreService