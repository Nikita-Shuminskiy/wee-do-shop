import React from 'react'
import {routerConstants} from "../constants/routerConstants";
import HomeS from "../screen/mainScreens/HomeS";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {colors} from "../assets/colors/colors";
import {useKeyBoardStatus} from "../utils/hook/useKeyBoardStatus";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ShopsS from "../screen/mainScreens/ShopsS";
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import HistoryS from "../screen/mainScreens/HistoryS";
import CartS from "../screen/mainScreens/CartS";

const TabMainStack = createBottomTabNavigator();

const MainNavigation = ({navigation, route}) => {
    const {keyboardStatus} = useKeyBoardStatus()

    return (
        <TabMainStack.Navigator
            initialRouteName={routerConstants.HOME}
            screenOptions={({route}) => ({
                tabBarStyle: {
                    width: '100%',
                    borderWidth: 0,
                    elevation: 0,
                    height: 65,
                    backgroundColor: colors.white,
                    display: keyboardStatus ? 'none' : 'flex',
                },
                tabBarActiveTintColor: colors.green,
                tabBarInactiveTintColor: colors.gray,
                tabBarIndicatorStyle: {
                    marginTop: 0,
                    bottom: 0,
                    backgroundColor: colors.green,
                },
                tabBarLabelStyle: {
                    marginBottom: 5,
                    fontSize: 12,
                    color: colors.gray,
                },
                tabBarIcon: ({focused, color}) => {
                    let iconName
                    if (route.name === 'home') {
                        iconName = <Ionicons name={focused ? "home" : 'home-outline'} size={30} color={color}/>
                    } else if (route.name === 'shops') {
                        iconName = <MaterialIcons name={focused ? "store" : 'store'} size={30} color={color}/>
                    } else if (route.name === 'history') {
                        iconName = <MaterialCommunityIcons name="history" size={30} color={color}/>
                    } else if (route.name === 'cart') {
                        iconName = <MaterialCommunityIcons name="cart-outline" size={30} color={color}/>
                    }

                    return iconName
                },
            })}
        >
            <TabMainStack.Screen
                options={{tabBarLabel: 'Home', headerShown: false}}
                name={routerConstants.HOME}
                component={HomeS}
            />
            <TabMainStack.Screen
                options={{tabBarLabel: 'Shops', headerShown: false}}
                name={routerConstants.SHOPS}
                component={ShopsS}
            />
            <TabMainStack.Screen
                options={{tabBarLabel: 'History', headerShown: false}}
                name={routerConstants.HISTORY}
                component={HistoryS}
            />
            <TabMainStack.Screen
                options={{tabBarLabel: 'Cart', headerShown: false}}
                name={routerConstants.CART}
                component={CartS}
            />
        </TabMainStack.Navigator>
    )
}

export default MainNavigation
