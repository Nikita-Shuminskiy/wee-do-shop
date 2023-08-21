import React from 'react'
import {routerConstants} from "../constants/routerConstants";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {colors} from "../assets/colors/colors";
import {useKeyBoardStatus} from "../utils/hook/useKeyBoardStatus";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AntDesign, Feather, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import CourierOrders from "../screen/courierScreens/CourierOrders";
import TakenCourierOrdersS from "../screen/courierScreens/TakenCourierOrdersS";
import CompletedOrdersS from "../screen/courierScreens/CompletedOrdersS";
import ProfileCourierS from "../screen/courierScreens/ProfileCourierS";

const TabMainStack = createBottomTabNavigator();

const MainCourierNavigation = ({navigation, route}) => {
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
                    if (route.name === 'courier-orders') {
                        iconName = <Feather name="list" size={30} color={color}/>
                    } else if (route.name === 'courier-taken-orders') {
                        iconName = <MaterialCommunityIcons name="history" size={30} color={color}/>
                    } else if (route.name === 'courier-completed-orders') {
                        iconName = <Feather name="list" size={30} color={color}/>
                    } else if (route.name === 'courier-profile') {
                        iconName = <Feather name="user" size={30} color={color}/>

                    }
                    return iconName
                },
            })}
        >
            <TabMainStack.Screen
                options={{tabBarLabel: 'Orders', headerShown: false, unmountOnBlur: true}}
                name={routerConstants.COURIER_ORDERS}
                component={CourierOrders}
            />
            <TabMainStack.Screen
                options={{tabBarLabel: 'Taken orders', headerShown: false, unmountOnBlur: true}}
                name={routerConstants.COURIER_TAKEN_ORDERS}
                component={TakenCourierOrdersS}
            />
            <TabMainStack.Screen
                options={{tabBarLabel: 'Completed orders', headerShown: false, unmountOnBlur: true}}
                name={routerConstants.COURIER_COMPLETED_ORDERS}
                component={CompletedOrdersS}
            />
            <TabMainStack.Screen
                options={{tabBarLabel: 'Profile', headerShown: false}}
                name={routerConstants.COURIER_PROFILE}
                component={ProfileCourierS}
            />
        </TabMainStack.Navigator>
    )
}

export default MainCourierNavigation
