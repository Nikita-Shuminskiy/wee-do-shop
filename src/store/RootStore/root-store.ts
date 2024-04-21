import NotificationStore from "../NotificationStore/notification-store";import {makeAutoObservable} from "mobx";import AuthStore from "../AuthStore/auth-store";import OrderService from "../service/OrderService/order-service";import AuthStoreService from "../service/AuthStoreService/auth-store-service";import CategoriesService from "../service/CategoriessService/categories-service";import StoresStore from "../StoresStore/stores-store";import CategoriesStore from "../CategoriesStore";import StoresService from "../service/StoresService/stores-service";import CartService from "../service/CartService/cart-service";import CartStore from "../CartStore/cart-store";import OrderStore from "../OrderStore/order-store";import CourierOrderStore from "../CourierOrderStore";import CourierOrderService from "../service/CourierOrderService/courier-order-service";export class RootStore {    // init service    AuthStoreService: AuthStoreService = null as unknown as AuthStoreService;    StoresService: StoresService = null as unknown as StoresService;    CategoriesService: CategoriesService = null as unknown as CategoriesService;    CartService: CartService = null as unknown as CartService;    OrderService: OrderService = null as unknown as OrderService;    CourierOrderService: CourierOrderService = null as unknown as CourierOrderService;    //init store    AuthStore: typeof AuthStore = null as unknown as typeof AuthStore;    CourierOrderStore: typeof CourierOrderStore = null as unknown as typeof CourierOrderStore;    OrderStore: typeof OrderStore = null as unknown as typeof OrderStore;    CartStore: typeof CartStore = null as unknown as typeof CartStore;    CategoriesStore: typeof CategoriesStore = null as unknown as typeof CategoriesStore;    StoresStore: typeof StoresStore = null as unknown as typeof StoresStore;    Notification: typeof NotificationStore = null as unknown as typeof NotificationStore;    constructor() {        makeAutoObservable(this);        this.AuthStoreService = new AuthStoreService(this as any);        this.CourierOrderService = new CourierOrderService(this as any);        this.StoresService = new StoresService(this as any);        this.CategoriesService = new CategoriesService(this as any);        this.CartService = new CartService(this as any);        this.OrderService = new OrderService(this as any);        this.AuthStore = AuthStore;        this.CourierOrderStore = CourierOrderStore;        this.OrderStore = OrderStore;        this.CartStore = CartStore;        this.CategoriesStore = CategoriesStore;        this.StoresStore = StoresStore;        this.Notification = NotificationStore;    }}export default new RootStore();