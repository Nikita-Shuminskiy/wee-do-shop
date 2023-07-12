import {action, makeObservable, observable} from "mobx";

export class AuthStore {
	user: any = {} as any
	isAuth: boolean = false


	setUser(userData: any): void {
		this.user = userData
	}
	setAuth(auth: boolean): void {
		this.isAuth = auth
	}
	constructor() {
		makeObservable(this, {
			user: observable,
			isAuth: observable,
			setUser: action,
			setAuth: action
		})
	this.setAuth = this.setAuth.bind(this)
	}
}

export default new AuthStore()
