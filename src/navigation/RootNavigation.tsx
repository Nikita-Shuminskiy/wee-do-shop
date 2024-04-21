import React, { useEffect, useMemo } from "react";
import {observer} from "mobx-react-lite"
import NotificationStore from "../store/NotificationStore/notification-store"
import {routerConstants} from "../constants/routerConstants"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import ModalReconnect from "../components/modal/modal-reconnect"
import * as Updates from "expo-updates"
import {useBackgroundTime} from "../utils/hook/useBackgroundTime"
import {Routs} from "./Routs"
import useInternetConnection from "../utils/hook/useInternetConnection"
import {LoadingEnum} from "../store/types/types"
import Loading from "../components/Loading"
import { usePermissionsPushGeo } from "../utils/hook/usePermissionsPushGeo";
import { useNotification } from "../utils/hook/useNotification";

const backgroundHandler = async (time: number) => {
	if (time >= 20) {
		await Updates.reloadAsync()
	}
}
const RootStack = createNativeStackNavigator()

const RootNavigation = observer(() => {
	const { isLoading} = NotificationStore
	const {} = usePermissionsPushGeo()
	useNotification(true)
	const {checkInternetConnection, isConnected} = useInternetConnection()
	useBackgroundTime({backgroundHandler})


	const memoizedRoutes = useMemo(() => Routs.map((route) => {
		return 	<RootStack.Screen
			key={route.name}
			options={{headerShown: false, gestureEnabled: false, animation: 'slide_from_right'}}
			name={route.name}
			component={route.component}
		/>
	}), []);
	const checkUpdate = async () => {
		const update = await Updates.checkForUpdateAsync();
		if (update.isAvailable) {
			await Updates.fetchUpdateAsync();
			await this.getAppVersion()
			await Updates.reloadAsync();
			return
		}
	}
	useEffect(() => {
		checkUpdate()
	}, [])
	return (
		<>

			{isLoading === LoadingEnum.fetching && (
				<Loading visible={true} />
			)}
			<ModalReconnect checkInternetConnection={checkInternetConnection} visible={!isConnected} />
			<RootStack.Navigator initialRouteName={routerConstants.SPLASH_SCREEN}>
				{memoizedRoutes}
			</RootStack.Navigator>
		</>

	)
})

export default RootNavigation;
