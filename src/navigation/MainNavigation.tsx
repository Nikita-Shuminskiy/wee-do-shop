import React from 'react'
import {routerConstants} from "../constants/routerConstants";
import HomeS from "../screen/mainScreens/HomeS";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {colors} from "../assets/colors/colors";
import {useKeyBoardStatus} from "../utils/hook/useKeyBoardStatus";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ShopsS from "../screen/mainScreens/ShopsS";
import {MaterialIcons} from '@expo/vector-icons';

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
                    fontSize: 10,
                    color: colors.gray,
                },
                tabBarIcon: ({focused, color}) => {
                    let iconName
                    if (route.name === 'home') {
                        iconName = <Ionicons name={focused ? "home" : 'home-outline'} size={24} color={color}/>
                    } else if (route.name === 'shops') {
                        iconName = <MaterialIcons name={focused ? "store" : 'store'} size={24} color={color}/>
                    } else if (route.name === 'chart-screen') {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline'
                    } else if (route.name === 'settings') {
                        iconName = focused ? 'settings' : 'settings-outline'
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
        </TabMainStack.Navigator>
    )
}

export default MainNavigation
