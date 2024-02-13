import React from 'react'
import { routerConstants } from '../constants/routerConstants'
import HomeS from '../screen/mainScreens/HomeS'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../assets/colors/colors'
import { useKeyBoardStatus } from '../utils/hook/useKeyBoardStatus'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ShopsS from '../screen/mainScreens/ShopsS'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import CartS from '../screen/mainScreens/Cart/CartS'
import OrdersS from '../screen/mainScreens/OrdersS'
import { Platform, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";

const TabMainStack = createBottomTabNavigator()

const MainNavigation = ({ navigation, route }) => {
	const { keyboardStatus } = useKeyBoardStatus()
	const {t} = useTranslation(['bottomBar']);
	return (
		<TabMainStack.Navigator
			initialRouteName={routerConstants.HOME}
			screenOptions={({ route }) => ({
				tabBarStyle: {
					width: '100%',
					borderWidth: 0,
					elevation: 0,
					height: 60,
					backgroundColor: colors.white,
					display: keyboardStatus ? 'none' : 'flex',
					paddingBottom: Platform.OS === 'ios' ? 0 : 5
				},
				tabBarActiveTintColor: colors.green,
				tabBarInactiveTintColor: colors.gray,
				tabBarIndicatorStyle: {
					marginTop: 0,
					bottom: 0,
					backgroundColor: colors.green,
				},
				tabBarLabelStyle: {
					fontSize: 11,
					color: colors.gray,
				},
				tabBarIcon: ({ focused, color }) => {
					let iconName
					if (route.name === 'home') {
						iconName = <Ionicons name={focused ? 'home' : 'home-outline'} size={28} color={color} />
					} else if (route.name === 'shops') {
						iconName = <MaterialIcons name={focused ? 'store' : 'store'} size={28} color={color} />
					} else if (route.name === 'history') {
						iconName = <MaterialCommunityIcons name="history" size={28} color={color} />
					} else if (route.name === 'cart') {
						iconName = <MaterialCommunityIcons name="cart-outline" size={28} color={color} />
					}

					return iconName
				},
			})}
		>
			<TabMainStack.Screen
				options={{ tabBarLabel: t('home'), headerShown: false }}
				name={routerConstants.HOME}
				component={HomeS}
			/>
			<TabMainStack.Screen
				options={{ tabBarLabel: t('shops'), headerShown: false }}
				name={routerConstants.SHOPS}
				component={ShopsS}
			/>
			<TabMainStack.Screen
				options={{ tabBarLabel: t('orders'), headerShown: false, unmountOnBlur: true }}
				name={routerConstants.HISTORY}
				component={OrdersS}
			/>
			<TabMainStack.Screen
				options={{ tabBarLabel: t('cart'), headerShown: false, unmountOnBlur: true }}
				name={routerConstants.CART}
				component={CartS}
			/>
		</TabMainStack.Navigator>
	)
}

export default MainNavigation
