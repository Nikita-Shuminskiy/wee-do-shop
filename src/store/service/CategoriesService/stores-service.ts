import RootStore from '../../RootStore/root-store';import {LoadingEnum} from '../../types/types'import {dataSearchType} from "../../../api/storesApi";export class StoresService {    rootStore: typeof RootStore;    constructor(rootStore: typeof RootStore) {        this.rootStore = rootStore;    }    async getStores(): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            await this.rootStore.StoresStore.getStores();        } catch (e) {            console.log(e)            //this.rootStore.Notification.setNotification('error', true, 'Incorrect data has been entered');        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async getFavoriteStores(): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            await this.rootStore.StoresStore.getFavoriteStores(this.rootStore.AuthStore.user._id);        } catch (e) {           // this.rootStore.Notification.setNotification('error', true, 'Incorrect data has been entered');        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async searchStores(dataSearch: dataSearchType): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            await this.rootStore.StoresStore.searchStores(dataSearch);        } catch (e) {            //this.rootStore.Notification.setNotification('error', true, 'Incorrect data has been entered');        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async getStory(id: number): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            /*  await this.rootStore.CategoriesStore.registration(userData);              await this.rootStore.OrderService.login({email: userData.email, password: userData.password});*/        } catch (e) {            this.rootStore.Notification.setNotification('error', true, 'Incorrect data has been entered');        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async saveFavoriteStore(idStore: string): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            await this.rootStore.StoresStore.saveFavoriteStore(this.rootStore.AuthStore.user._id, idStore)            const data = await this.rootStore.AuthStore.getUser(this.rootStore.AuthStore.user._id)            this.rootStore.StoresStore.setFavoriteStore(data.favoritesStores)        } catch (e) {            console.log(e)        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }    async deleteFavoriteStore(idStore: string): Promise<void> {        this.rootStore.Notification.setIsLoading(LoadingEnum.fetching);        try {            await this.rootStore.StoresStore.deleteFavoriteStore(this.rootStore.AuthStore.user._id, idStore)            const data = await this.rootStore.AuthStore.getUser(this.rootStore.AuthStore.user._id)            this.rootStore.StoresStore.setFavoriteStore(data.favoritesStores)        } catch (e) {        } finally {            this.rootStore.Notification.setIsLoading(LoadingEnum.success);        }    }}export default StoresService;