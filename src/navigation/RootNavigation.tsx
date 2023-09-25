import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'
import NotificationStore from '../store/NotificationStore/notification-store'
import { NavigationContainer } from '@react-navigation/native'
import { LoadingEnum } from '../store/types/types'
import Loading from '../components/Loading'
import { routerConstants } from '../constants/routerConstants'
import LoginS from '../screen/authScreens/LoginS'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterS from '../screen/authScreens/RegisterS'
import rootStore from '../store/RootStore'
import AllowLocationS from '../screen/authScreens/AllowLocationS'
import GoogleAutocompleteMapS from '../screen/authScreens/GoogleAutocompleteMapS'
import MainNavigation from './MainNavigation'
import StoreS from '../screen/mainScreens/StoreS'
import FavoriteS from '../screen/mainScreens/FavoriteS'
import UserProfileS from '../screen/mainScreens/UserProfileS'
import OrderStatusesS from '../screen/mainScreens/OrderStatusesS'
import OrdersS from '../screen/mainScreens/OrdersS'
import AddressS from '../screen/mainScreens/AddressS'
import { RoleType } from '../api/authApi'
import CourierPickOrder from '../screen/courierScreens/CourierPickOrder'
import PrivacyPolicyS from '../screen/commonScreens/PrivacyPolicyS'
import TermServiceS from '../screen/commonScreens/TermServiceS'
import LegalInformationS from '../screen/commonScreens/LegalInformationS'
import CourierInProgressS from '../screen/courierScreens/CourierInProgressS'

import ModalReconnect from '../components/modal/modal-reconnect'
import NetInfo from '@react-native-community/netinfo'
import MainCourierNavigation from './MainCourierNavigation'
import UpdateUserS from '../screen/mainScreens/UpdateUserS'
import * as Updates from 'expo-updates'
import { createAlert } from '../components/Alert'

const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
	const { isLoading, setIsLoading } = NotificationStore
	const { AuthStoreService, AuthStore } = rootStore
	const [isConnected, setIsConnected] = useState(true)
	const { isAuth, user } = AuthStore

	const checkInternetConnection = async () => {
		setIsLoading(LoadingEnum.fetching)
		try {
			const netInfoState = await NetInfo.fetch()
			setIsConnected(netInfoState.isConnected)
		} catch (e) {
		} finally {
			setIsLoading(LoadingEnum.success)
		}
	}
	const checkNewVersionApp = async () => {
		try {
			const update = await Updates.checkForUpdateAsync()
			const onPresUpdate = async () => {
				await Updates.fetchUpdateAsync()
				await Updates.reloadAsync()
			}
			if (update.isAvailable) {
				createAlert({
					title: 'Message',
					message: 'A new version is available, update the app',
					buttons: [
						{ text: 'Update ', style: 'default', onPress: onPresUpdate },
						{ text: 'Later ', style: 'cancel' },
					],
				})
			}
		} catch (e) {
			console.log('error', e)
		}
	}
	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected)
		})
		checkNewVersionApp()
		AuthStoreService.getMe()
		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<NavigationContainer>
			{isLoading === LoadingEnum.fetching && (
				<Loading visible={isLoading === LoadingEnum.fetching} />
			)}
			<ModalReconnect checkInternetConnection={checkInternetConnection} visible={!isConnected} />
			<RootStack.Navigator>
				{isAuth ? (
					user?.role === RoleType.Customer ? (
						<React.Fragment>
							<RootStack.Screen
								options={{ headerShown: false }}
								name={routerConstants.MAIN}
								component={MainNavigation}
							/>
							<RootStack.Screen
								options={{ headerShown: false }}
								name={routerConstants.STORE}
								component={StoreS}
							/>
							<RootStack.Screen
								options={{ headerShown: false }}
								name={routerConstants.FAVORITE}
								component={FavoriteS}
							/>
							<RootStack.Screen
								options={{ headerShown: false }}
								name={routerConstants.ORDER_STATUSES}
								component={OrderStatusesS}
							/>
							<RootStack.Screen
								options={{ headerShown: false }}
								name={routerConstants.ORDERS}
								component={OrdersS}
							/>
							<RootStack.Screen
								options={{ headerShown: false }}
								name={routerConstants.PROFILE_USER}
								component={UserProfileS}
							/>
							<RootStack.Screen
								options={{ headerShown: false }}
								name={routerConstants.USER_UPDATE}
								component={UpdateUserS}
							/>
							<RootStack.Screen
								options={{ headerShown: false }}
								name={routerConstants.ADDRESS}
								component={AddressS}
							/>
						</React.Fragment>
					) : (
						<React.Fragment>
							<RootStack.Screen
								options={{ headerShown: false }}
								name={routerConstants.MAIN_COURIER}
								component={MainCourierNavigation}
							/>

							<RootStack.Screen
								options={{ headerShown: false }}
								name={routerConstants.COURIER_PICK_ORDER}
								component={CourierPickOrder}
							/>
							<RootStack.Screen
								options={{ headerShown: false }}
								name={routerConstants.COURIER_IN_PROGRESS}
								component={CourierInProgressS}
							/>
						</React.Fragment>
					)
				) : (
					<React.Fragment>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.LOGIN}
							component={LoginS}
						/>
						<RootStack.Screen
							options={{ headerShown: false }}
							name={routerConstants.REGISTRATION}
							component={RegisterS}
						/>
					</React.Fragment>
				)}
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.ALLOW_LOCATION}
					component={AllowLocationS}
				/>
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.AUTOCOMPLETE_MAP}
					component={GoogleAutocompleteMapS}
				/>

				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.PRIVACY_POLICE}
					component={PrivacyPolicyS}
				/>
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.LEGAL_INFORMATION}
					component={LegalInformationS}
				/>
				<RootStack.Screen
					options={{ headerShown: false }}
					name={routerConstants.TERM_SERVICE}
					component={TermServiceS}
				/>
			</RootStack.Navigator>
		</NavigationContainer>
	)
})

export default RootNavigation
