import {action, makeObservable, observable} from "mobx";
import {storesApi, StoreType} from "../../api/storesApi";

export class StoresStore {
    stores: StoreType[] = [] as StoreType[]
    store: StoreType = {} as StoreType

    async getStores(): Promise<void> {
        const {data} = await storesApi.getStories()
        this.setStores(data.results)

    }
    async getStore(id: number): Promise<void> {
        const {data} = await storesApi.getStores(id)
        this.setStore(data)

    }
    setStores(stores: StoreType[]) {
        this.stores = stores
    }
    setStore(stores: StoreType) {
        this.store = stores
    }
    constructor() {
        makeObservable(this, {
            stores: observable,
            store: observable,
            getStores: action,
            getStore: action,
            setStore: action,
            setStores: action,
        })

    }
}

export default new StoresStore()
