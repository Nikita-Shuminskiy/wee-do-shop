import {action, makeObservable, observable} from "mobx";
import {storesApi, StoreType} from "../../api/storesApi";
import {DataUserType, userApi} from "../../api/userApi";

export type StoreTypeLocalType = StoreType & {
    isFavorite: boolean
}

export class StoresStore {
    stores: StoreTypeLocalType[] = [] as StoreTypeLocalType[]
    store: StoreType = {} as StoreType
    favoriteStores: StoreType[] = [] as StoreType[]

    async saveFavoriteStore(idUser, idStore: string): Promise<DataUserType> {
        const {data} = await userApi.saveFavoriteStore(idUser, idStore)
        return data
    }

    async deleteFavoriteStore(idUser, idStore: string): Promise<DataUserType> {
        const {data} = await userApi.deleteFavoriteStore(idUser, idStore)
        return data
    }

    setFavoriteStore(stores: StoreType[]) {
        this.favoriteStores = stores
        this.stores = this.updateFavoriteStores(this.stores)

    }

    async getStores(): Promise<void> {
        const {data} = await storesApi.getStories()
        this.setStores(data.results)

    }

    async getStore(id: number): Promise<void> {
        const {data} = await storesApi.getStores(id)
        this.setStore(data)

    }

    async searchStores(text: string): Promise<void> {
        const {data} = await storesApi.searchStores(text)
        this.setStores(data.results)

    }

    updateFavoriteStores(stores: StoreType[]) {
        return stores.map((store) => {
            return {
                ...store,
                isFavorite: !!this.favoriteStores.find(el => el._id === store._id)
            }
        });
    }

    setStores(stores: StoreType[]) {
        this.stores = this.updateFavoriteStores(stores)
    }

    setStore(store: StoreType) {
        this.store = store
    }

    constructor() {
        makeObservable(this, {
            stores: observable,
            store: observable,
            getStores: action,
            getStore: action,
            setStore: action,
            favoriteStores: observable,
            setFavoriteStore: action,
            deleteFavoriteStore: action,
            saveFavoriteStore: action,
            searchStores: action,
            setStores: action,
            updateFavoriteStores: action,
        })
        this.setFavoriteStore = this.setFavoriteStore.bind(this)
        this.deleteFavoriteStore = this.deleteFavoriteStore.bind(this)
        this.saveFavoriteStore = this.saveFavoriteStore.bind(this)
        this.setStores = this.setStores.bind(this)
        this.searchStores = this.searchStores.bind(this)
        this.updateFavoriteStores = this.updateFavoriteStores.bind(this)
        this.setStore = this.setStore.bind(this)
    }
}

export default new StoresStore()
