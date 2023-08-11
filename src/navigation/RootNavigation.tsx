import React, {useEffect} from 'react'

import {observer} from 'mobx-react-lite'
import NotificationStore from '../store/NotificationStore/notification-store'
import {NavigationContainer} from '@react-navigation/native'
import {LoadingEnum} from '../store/types/types'
import Loading from '../components/Loading'
import {routerConstants} from '../constants/routerConstants'
import LoginS from '../screen/authScreens/LoginS'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import RegisterS from '../screen/authScreens/RegisterS'
import rootStore from '../store/RootStore'
import AllowLocationS from "../screen/authScreens/AllowLocationS";
import GoogleAutocompleteMapS from "../screen/authScreens/GoogleAutocompleteMapS";
import MainNavigation from "./MainNavigation";
import StoreS from "../screen/mainScreens/StoreS";
import FavoriteS from "../screen/mainScreens/FavoriteS";
import UserProfileS from "../screen/mainScreens/UserProfileS";
import OrderStatusesS from "../screen/mainScreens/OrderStatusesS";
import OrdersS from "../screen/mainScreens/OrdersS";
import AddressS from "../screen/mainScreens/AddressS";
import {RoleType} from "../api/authApi";
import CourierOrders from "../screen/courierScreens/CourierOrders";
import CourierPickOrder from "../screen/courierScreens/CourierPickOrder";

const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
    const {isLoading} = NotificationStore
    const {AuthStoreService, AuthStore} = rootStore
    const {isAuth, user} = AuthStore
    useEffect(() => {
        AuthStoreService.getMe()
    }, [])

    return (
        <NavigationContainer>
            <Loading visible={isLoading === LoadingEnum.fetching}/>
            <RootStack.Navigator>
                {
                    isAuth ?

                        user.role === RoleType.Courier ? <React.Fragment>
                                <RootStack.Screen
                                    options={{headerShown: false}}
                                    name={routerConstants.COURIER_ORDERS}
                                    component={CourierOrders}
                                />
                                <RootStack.Screen
                                    options={{headerShown: false}}
                                    name={routerConstants.COURIER_PICK_ORDER}
                                    component={CourierPickOrder}
                                />
                            </React.Fragment> :
                            <React.Fragment>
                                <RootStack.Screen
                                    options={{headerShown: false}}
                                    name={routerConstants.MAIN}
                                    component={MainNavigation}
                                />
                                <RootStack.Screen
                                    options={{headerShown: false}}
                                    name={routerConstants.STORE}
                                    component={StoreS}
                                />
                                <RootStack.Screen
                                    options={{headerShown: false}}
                                    name={routerConstants.FAVORITE}
                                    component={FavoriteS}
                                />
                                <RootStack.Screen
                                    options={{headerShown: false}}
                                    name={routerConstants.ORDER_STATUSES}
                                    component={OrderStatusesS}
                                />
                                <RootStack.Screen
                                    options={{headerShown: false}}
                                    name={routerConstants.ORDERS}
                                    component={OrdersS}
                                />
                                <RootStack.Screen
                                    options={{headerShown: false}}
                                    name={routerConstants.PROFILE_USER}
                                    component={UserProfileS}
                                />
                                <RootStack.Screen
                                    options={{headerShown: false}}
                                    name={routerConstants.ADDRESS}
                                    component={AddressS}
                                />
                            </React.Fragment> : <React.Fragment>
                            <RootStack.Screen
                                options={{headerShown: false}}
                                name={routerConstants.LOGIN}
                                component={LoginS}
                            />
                            <RootStack.Screen
                                options={{headerShown: false}}
                                name={routerConstants.REGISTRATION}
                                component={RegisterS}
                            />
                        </React.Fragment>
                }
                <RootStack.Screen
                    options={{headerShown: false}}
                    name={routerConstants.ALLOW_LOCATION}
                    component={AllowLocationS}
                />
                <RootStack.Screen
                    options={{headerShown: false}}
                    name={routerConstants.AUTOCOMPLETE_MAP}
                    component={GoogleAutocompleteMapS}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
})

export default RootNavigation
