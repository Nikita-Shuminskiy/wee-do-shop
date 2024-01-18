import {action, makeObservable, observable} from "mobx"
import {deviceStorage} from "../../utils/storage/storage"
import {authApi, PayloadResetPasswordType, UserType} from "../../api/authApi"
import {UserRegisterDataType} from "screen/authScreens/RegisterS"
import {BannersType, OptionalUserType, userApi} from "../../api/userApi"
import Constants from "expo-constants"
import {Linking, Platform} from "react-native"
import {APPLE_STORE_URL, PLAY_STORE_URL} from "../../utils/utils"
import {createAlert} from "../../components/Alert"

export type fullAddressType = {
	country: string
	city: string
	street: string
	house: string
	apartment?: string
	postalCode: string
}
export type AddressType = {
	fullAddress: fullAddressType
	location: {
		type: string
		coordinates: number[]
	}
}

export class AuthStore {
	user: UserType = {
		favoritesStores: [],
	} as UserType
	isAuth: boolean = false
	infoResetPassword: PayloadResetPasswordType = {
		email: "",
		password: "",
		verificationCode: "",
	}
	currentLocation: AddressType = {} as AddressType
	banners: BannersType[] = [] as BannersType[]
	setClearAuthStoreData = () => {
		this.isAuth = false
		this.currentLocation = {} as AddressType
		this.user = {} as UserType
	}

	setUser(userData: UserType): void {
		this.user = userData
		this.setAuth(true)
	}

	setAuth(auth: boolean): void {
		this.isAuth = auth
	}

	async login(userData: {email: string; password: string}) {
		const {data} = await authApi.login(userData.email, userData.password)
		await deviceStorage.saveItem("accessToken", data.accessToken)
		await deviceStorage.saveItem("refreshToken", data.refreshToken)
		return data
	}

	async registration(dataUser: UserRegisterDataType) {
		return await authApi.register(dataUser)
	}

	async getMe() {
		const {data} = await authApi.getMe()
		await this.getAppVersion()
		this.setUser(data)
		return data
	}

	async getUser(idUser: string): Promise<UserType> {
		const {data} = await userApi.getUser(idUser)
		this.setUser(data)
		return data
	}

	async updateUser(payload: OptionalUserType): Promise<UserType> {
		const {data} = await userApi.updateUser(this.user._id, payload)
		return data
	}

	async getBanners(): Promise<any> {
		const {data} = await userApi.getBanners()
		this.setBanners(data.results)
	}

	setBanners(banners: BannersType[]) {
		this.banners = banners
	}

	async logOut() {
		this.isAuth = false
		await deviceStorage.removeItem("refreshToken")
		await deviceStorage.removeItem("accessToken")
		this.user = null
	}

	async forgotPassword(email: string) {
		const {data} = await authApi.forgotPassword(email)
		return data
	}

	async resetPassword(payloadResetPassword: PayloadResetPasswordType) {
		const {data} = await authApi.resetPassword(payloadResetPassword)
		return data
	}

	async checkVerificationCode(payloadResetPassword: {email: string; verificationCode: string}) {
		const {data} = await authApi.checkVerificationCode(payloadResetPassword)
		return data
	}

	async getAppVersion() {
		const {data} = await authApi.getAppVersion()
		if (Constants?.expoConfig?.version < data?.mobileAppVersion) {
			// version from app.json
			const onPressGoMarket = async () => {
				await Linking.openURL(Platform.OS === "ios" ? APPLE_STORE_URL : PLAY_STORE_URL)
			}
			createAlert({
				title: "Message",
				message: "Updates available",
				buttons: [{text: "Update", style: "default", onPress: onPressGoMarket}],
			})
		}
		return data
	}

	setLocation(data: AddressType) {
		this.currentLocation = data
	}

	setInfoResetPassword(key: keyof PayloadResetPasswordType, value: string) {
		this.infoResetPassword = {
			...this.infoResetPassword,
			[key]: value,
		}
	}

	deleteUser = async () => {
		const {data} = await userApi.deleteUser(this.user._id)
		return data
	}

	constructor() {
		makeObservable(this, {
			user: observable,
			banners: observable,
			isAuth: observable,
			infoResetPassword: observable,
			currentLocation: observable,
			setUser: action,
			setInfoResetPassword: action,
			forgotPassword: action,
			resetPassword: action,
			getUser: action,
			setBanners: action,
			setLocation: action,
			logOut: action,
			setAuth: action,
			getMe: action,
			login: action,
			deleteUser: action,
			updateUser: action,
			getBanners: action,
			setClearAuthStoreData: action,
			checkVerificationCode: action,
		})
		this.setAuth = this.setAuth.bind(this)
		this.setInfoResetPassword = this.setInfoResetPassword.bind(this)
		this.setBanners = this.setBanners.bind(this)
		this.updateUser = this.updateUser.bind(this)
		this.getMe = this.getMe.bind(this)
		this.getUser = this.getUser.bind(this)
		this.logOut = this.logOut.bind(this)
		this.setLocation = this.setLocation.bind(this)
	}
}

export default new AuthStore();
