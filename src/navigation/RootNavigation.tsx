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

const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
    const {isLoading} = NotificationStore
    const {AuthStoreService, AuthStore} = rootStore
    const {isAuth} = AuthStore
    useEffect(() => {
        AuthStoreService.checkAuth()
    }, [])

    /*deviceStorage.removeItem('refreshToken')
    deviceStorage.removeItem('accessToken')*/

    return (
        <NavigationContainer>
            <Loading visible={isLoading === LoadingEnum.fetching}/>
            <RootStack.Navigator>
                {
                    isAuth ? <RootStack.Screen
                        options={{headerShown: false}}
                        name={routerConstants.MAIN}
                        component={MainNavigation}
                    /> : <React.Fragment>
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
                    </React.Fragment>
                }
            </RootStack.Navigator>
        </NavigationContainer>
    )
})

export default RootNavigation
