import React, {useMemo} from "react"
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

const backgroundHandler = async (time: number) => {
	if (time >= 20) {
		await Updates.reloadAsync()
	}
}
const RootStack = createNativeStackNavigator()

const RootNavigation = observer(() => {
	const { isLoading} = NotificationStore
	const {checkInternetConnection, isConnected} = useInternetConnection()
	useBackgroundTime({backgroundHandler})


	const memoizedRoutes = useMemo(() => Routs.map((route) => {
		return 	<RootStack.Screen
			key={route.name}
			options={{headerShown: false, gestureEnabled: false}}
			name={route.name}
			component={route.component}
		/>
	}), []);

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
