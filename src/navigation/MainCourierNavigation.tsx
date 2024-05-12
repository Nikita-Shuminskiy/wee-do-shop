import React from 'react'
import { routerConstants } from '../constants/routerConstants'
import { colors } from '../assets/colors/colors'
import { useKeyBoardStatus } from '../utils/hook/useKeyBoardStatus'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CourierOrders from '../screen/courierScreens/CourierOrders'
import TakenCourierOrdersS from '../screen/courierScreens/TakenCourierOrdersS'
import CompletedOrdersS from '../screen/courierScreens/CompletedOrdersS'
import ProfileCourierS from '../screen/courierScreens/ProfileCourierS'
import { Image, Platform } from 'react-native'
import userImg from '../assets/images/courierImages/bottomImg/user.png'
import userActiveImg from '../assets/images/courierImages/bottomImg/user-active.png'

import completeOrdersImg from '../assets/images/courierImages/bottomImg/doc-success-filled.png'
import completeOrdersActiveImg from '../assets/images/courierImages/bottomImg/doc-success-filled-active.png'

import orderActiveImg from '../assets/images/courierImages/bottomImg/view-list-filled-active.png'
import orderImg from '../assets/images/courierImages/bottomImg/view-list-filled.png'

import takenOrdersActiveImg from '../assets/images/courierImages/bottomImg/time-filled-active.png'
import takenOrdersImg from '../assets/images/courierImages/bottomImg/time-filled.png'

const TabMainStack = createBottomTabNavigator()

const MainCourierNavigation = ({ navigation, route }) => {
	const { keyboardStatus } = useKeyBoardStatus()

	return (
		<TabMainStack.Navigator
			initialRouteName={routerConstants.COURIER_ORDERS}
			screenOptions={({ route }) => ({
				tabBarStyle: {
					width: '100%',
					borderWidth: 0,
					elevation: 0,
					height: 70,
					paddingBottom: Platform.OS === 'ios' ? 20 : 5,
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
					marginBottom: 0,
					fontSize: 11,
					color: colors.gray,
				},
				tabBarIcon: ({ focused, color }) => {
					let iconName
					if (route.name === 'courier-orders') {
						iconName = focused ? orderActiveImg : orderImg
					} else if (route.name === 'courier-taken-orders') {
						iconName = focused ? takenOrdersActiveImg : takenOrdersImg
					} else if (route.name === 'courier-completed-orders') {
						iconName = focused ? completeOrdersActiveImg : completeOrdersImg
					} else if (route.name === 'courier-profile') {
						iconName = focused ? userActiveImg : userImg
					}
					return <Image source={iconName} style={{ width: 24, height: 24 }} />
				},
			})}
		>
			<TabMainStack.Screen
				options={{ tabBarLabel: 'Orders', headerShown: false, unmountOnBlur: true }}
				name={routerConstants.COURIER_ORDERS}
				component={CourierOrders}
			/>
			<TabMainStack.Screen
				options={{ tabBarLabel: 'Taken orders', headerShown: false, unmountOnBlur: true }}
				name={routerConstants.COURIER_TAKEN_ORDERS}
				component={TakenCourierOrdersS}
			/>
			<TabMainStack.Screen
				options={{ tabBarLabel: 'Completed orders', headerShown: false, unmountOnBlur: true }}
				name={routerConstants.COURIER_COMPLETED_ORDERS}
				component={CompletedOrdersS}
			/>
			<TabMainStack.Screen
				options={{ tabBarLabel: 'Profile', headerShown: false, unmountOnBlur: true }}
				name={routerConstants.COURIER_PROFILE}
				component={ProfileCourierS}
			/>
		</TabMainStack.Navigator>
	)
}

export default MainCourierNavigation
