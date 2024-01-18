import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import NotificationStore from "../store/NotificationStore/notification-store"
import {NavigationContainer} from "@react-navigation/native"
import {LoadingEnum} from "../store/types/types"
import Loading from "../components/Loading"
import {routerConstants} from "../constants/routerConstants"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import rootStore from "../store/RootStore"
import ModalReconnect from "../components/modal/modal-reconnect"
import NetInfo from "@react-native-community/netinfo"
import * as Updates from "expo-updates"
import {useBackgroundTime} from "../utils/hook/useBackgroundTime"
import {Routs} from "./Routs"

const RootStack = createNativeStackNavigator()

const RootNavigation = observer(() => {
	const {isLoading, setIsLoading, setNavigation} = NotificationStore
	const {AuthStoreService} = rootStore
	const [isConnected, setIsConnected] = useState(true)
	const backgroundHandler = async (time: number) => {
		if (time >= 20) {
			await Updates.reloadAsync()
		}
	}
	useBackgroundTime({backgroundHandler})
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
	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected)
		})
		AuthStoreService.getMe()
		return () => {
			unsubscribe()
		}
	}, [])
	return (
		<NavigationContainer
			ref={(navigationRef) => {
				setNavigation(navigationRef)
			}}
		>
			{isLoading === LoadingEnum.fetching && (
				<Loading visible={isLoading === LoadingEnum.fetching} />
			)}
			<ModalReconnect checkInternetConnection={checkInternetConnection} visible={!isConnected} />
			<RootStack.Navigator initialRouteName={routerConstants.LOGIN}>
				{Routs.map((route) => (
					<RootStack.Screen
						key={route.name}
						options={{headerShown: false, gestureEnabled: false}}
						name={route.name}
						component={route.component}
					/>
				))}
			</RootStack.Navigator>
		</NavigationContainer>
	)
})

export default RootNavigation;
