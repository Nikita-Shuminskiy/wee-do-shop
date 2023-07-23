import {action, makeObservable, observable} from "mobx";
import {deviceStorage} from '../../utils/storage/storage'
import {authApi, UserType} from '../../api/apiAuth'
import {UserRegisterDataType} from "screen/authScreens/RegisterS";
import {userApi} from "../../api/userApi";

export type CurrentLocationType = {
    location: { latitude: number, longitude: number }
    address: { name: string, formatted_address: string }
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
    async getUser(idUser: string): Promise<void> {
        const {data} = await userApi.getUser(idUser)
        this.setUser(data)
    }

    async saveFavoriteStore(idStore: string): Promise<void> {
        const {data} = await userApi.saveFavoriteStore(this.user._id, idStore)
        this.setUser(data)
    }

    async deleteFavoriteStore(idStore: string): Promise<void> {
        const {data} = await userApi.deleteFavoriteStore(this.user._id, idStore)
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
            getUser: action,
            deleteFavoriteStore: action,
            saveFavoriteStore: action,
            setLocation: action,
            setAuth: action,
            getMe: action,
            login: action
        })
        this.setAuth = this.setAuth.bind(this)
        this.getUser = this.getUser.bind(this)
        this.deleteFavoriteStore = this.deleteFavoriteStore.bind(this)
        this.saveFavoriteStore = this.saveFavoriteStore.bind(this)
        this.setLocation = this.setLocation.bind(this)
    }
}

export default new AuthStore()
