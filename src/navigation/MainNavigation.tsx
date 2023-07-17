import React from 'react'
import {routerConstants} from "../constants/routerConstants";
import HomeS from "../screen/mainScreens/HomeS";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {colors} from "../assets/colors/colors";
import {useKeyBoardStatus} from "../utils/hook/useKeyBoardStatus";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const TabMainStack = createBottomTabNavigator();

const MainNavigation = ({navigation, route}) => {
    const {keyboardStatus} = useKeyBoardStatus()
    return (
            <TabMainStack.Navigator
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
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (route.name === 'history-screen') {
                            iconName = focused ? 'analytics' : 'analytics-outline'
                        } else if (route.name === 'chart-screen') {
                            iconName = focused ? 'bar-chart' : 'bar-chart-outline'
                        } else if (route.name === 'settings') {
                            iconName = focused ? 'settings' : 'settings-outline'
                        }

                        return <Ionicons name={iconName} size={24} color={color}/>
                    },
                })}
            >
                <TabMainStack.Screen
                    options={{tabBarLabel: 'Home', headerShown: false}}
                    name={routerConstants.HOME}
                    component={HomeS}
                />
            </TabMainStack.Navigator>
    )
}

export default MainNavigation
