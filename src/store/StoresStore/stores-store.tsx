import {action, makeObservable, observable} from "mobx";
import {storesApi, StoreType} from "../../api/storesApi";

export class StoresStore {
    stores: StoreType[] = [] as StoreType[]
    story: StoreType = {} as StoreType

    async getStores(): Promise<void> {
        const {data} = await storesApi.getStories()
        this.setStores(data.results)

    }
    async getStory(id: number): Promise<void> {
        const {data} = await storesApi.getStores(id)
        this.setStory(data)

    }
    setStores(stores: StoreType[]) {
        this.stores = stores
    }
    setStory(stores: StoreType) {
        this.story = stores
    }
    constructor() {
        makeObservable(this, {
            stores: observable,
            story: observable,
            getStores: action,
            getStory: action,
            setStory: action,
            setStores: action,
        })

    }
}

export default new StoresStore()
