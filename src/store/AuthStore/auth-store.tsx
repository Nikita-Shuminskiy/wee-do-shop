import {action, makeObservable, observable} from "mobx";
import { deviceStorage } from '../../utils/storage/storage'
import { authApi, UserType } from '../../api/apiAuth'

export class AuthStore {
	user: UserType = {} as UserType
	isAuth: boolean = false


	setUser(userData: any): void {
		this.user = userData
	}
	setAuth(auth: boolean): void {
		this.isAuth = auth
	}
	async login(userData: {email: string, password: string}): Promise<void> {
		const { data } = await authApi.login(userData.email, userData.password)
		await deviceStorage.saveItem('accessToken', data.accessToken)
		await deviceStorage.saveItem('refreshToken', data.refreshToken)
		this.setAuth(true)
	}
	async checkAuth(): Promise<void> {
		const {data} = await authApi.refresh()
		await deviceStorage.saveItem('accessToken', data.accessToken)
		await deviceStorage.saveItem('refreshToken', data.refreshToken)
		this.setAuth(true)
	}

	async getMe(): Promise<void> {
		const { data } = await authApi.getMe()
		this.setUser(data)
	}
	constructor() {
		makeObservable(this, {
			user: observable,
			isAuth: observable,
			setUser: action,
			setAuth: action,
			getMe: action,
			login: action
		})
	this.setAuth = this.setAuth.bind(this)
	}
}

export default new AuthStore()
