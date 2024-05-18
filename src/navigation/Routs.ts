import { routerConstants } from "../constants/routerConstants";
import LoginS from "../screen/authScreens/LoginS";
import CourierInProgressS from "../screen/courierScreens/CourierInProgressS";
import CourierPickOrder from "../screen/courierScreens/CourierPickOrder";
import MainCourierNavigation from "./MainCourierNavigation";
import TermServiceS from "../screen/commonScreens/TermServiceS";
import LegalInformationS from "../screen/commonScreens/LegalInformationS";
import PrivacyPolicyS from "../screen/commonScreens/PrivacyPolicyS";
import { MapViews } from "../components/MapViews/MapViews";
import NewPasswordS from "../screen/authScreens/NewPasswordS";
import ForgotPasswordS from "../screen/authScreens/ForgotPasswordS";
import ResetPasswordS from "../screen/authScreens/ResetPasswordS";
import AddressS from "../screen/mainScreens/AddressS";
import UpdateUserS from "../screen/mainScreens/UpdateUser/UpdateUserS";
import OrderStatusesS from "../screen/mainScreens/OrderStatuses/OrderStatusesS";
import FavoriteS from "../screen/mainScreens/FavoriteS";
import StoreS from "../screen/mainScreens/StoreS";
import UserProfileS from "../screen/mainScreens/UserProfileS";
import OrdersS from "../screen/mainScreens/OrdersS";
import RegisterS from "../screen/authScreens/RegisterS";
import MainNavigation from "./MainNavigation";
import SplashScreen from "../screen/authScreens/SplashScreen";

export const Routs = [
  { name: routerConstants.SPLASH_SCREEN, component: SplashScreen },
  { name: routerConstants.MAIN, component: MainNavigation },
  { name: routerConstants.LOGIN, component: LoginS },
  { name: routerConstants.REGISTRATION, component: RegisterS },
  { name: routerConstants.ORDERS, component: OrdersS },
  { name: routerConstants.PROFILE_USER, component: UserProfileS },
  { name: routerConstants.STORE, component: StoreS },
  { name: routerConstants.FAVORITE, component: FavoriteS },
  { name: routerConstants.ORDER_STATUSES, component: OrderStatusesS },
  { name: routerConstants.USER_UPDATE, component: UpdateUserS },
  { name: routerConstants.ADDRESS, component: AddressS },
  { name: routerConstants.RESET_PASSWORD, component: ResetPasswordS },
  { name: routerConstants.FORGOT_PASSWORD, component: ForgotPasswordS },
  { name: routerConstants.NEW_PASSWORD, component: NewPasswordS },
  //{ name: routerConstants.ALLOW_LOCATION, component: AllowLocationS },
   { name: routerConstants.AUTOCOMPLETE_MAP, component: MapViews },
  { name: routerConstants.PRIVACY_POLICE, component: PrivacyPolicyS },
  { name: routerConstants.LEGAL_INFORMATION, component: LegalInformationS },
  { name: routerConstants.TERM_SERVICE, component: TermServiceS },
  { name: routerConstants.MAIN_COURIER, component: MainCourierNavigation },
  { name: routerConstants.COURIER_PICK_ORDER, component: CourierPickOrder },
  { name: routerConstants.COURIER_IN_PROGRESS, component: CourierInProgressS },
];
