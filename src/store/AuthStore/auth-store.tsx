import {action, makeObservable, observable} from "mobx";
import {deviceStorage} from '../../utils/storage/storage'
import {authApi, UserType} from '../../api/apiAuth'
import {UserRegisterDataType} from "screen/authScreens/RegisterS";
export type CurrentLocationType = {
    location:  { latitude: number, longitude: number }
    address: {name: string, formatted_address: string}
}
export class AuthStore {
    user: UserType = {} as UserType
    isAuth: boolean = false
    currentLocation: CurrentLocationType = {} as CurrentLocationType


    setUser(userData: any): void {
        this.user = userData
    }

    setAuth(auth: boolean): void {
        this.isAuth = auth
    }

    async login(userData: { email: string, password: string }): Promise<void> {
        const {data} = await authApi.login(userData.email, userData.password)
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

    async registration(dataUser: UserRegisterDataType) {
        const {data} = await authApi.register(dataUser)
    }

    async getMe(): Promise<void> {
        const {data} = await authApi.getMe()
        this.setUser(data)
    }

    setLocation(data: CurrentLocationType) {
        this.currentLocation = data
    }

    constructor() {
        makeObservable(this, {
            user: observable,
            isAuth: observable,
            currentLocation: observable,
            setUser: action,
            setLocation: action,
            setAuth: action,
            getMe: action,
            login: action
        })
        this.setAuth = this.setAuth.bind(this)
        this.setLocation = this.setLocation.bind(this)
    }
}

export default new AuthStore()
