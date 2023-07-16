import React, { useEffect } from 'react'

import { observer } from 'mobx-react-lite'
import AuthStore from '../store/AuthStore'
import NotificationStore from '../store/NotificationStore/notification-store'
import { NavigationContainer, ParamListBase } from '@react-navigation/native'
import { LoadingEnum } from '../store/types/types'
import Loading from '../components/Loading'
import { routerConstants } from '../constants/routerConstants'
import LoginS from '../screen/authScreens/LoginS'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterS from '../screen/authScreens/RegisterS'
import rootStore from '../store/RootStore'
import { deviceStorage } from '../utils/storage/storage'

const RootStack = createNativeStackNavigator()
const RootNavigation = observer(() => {
	const { isLoading } = NotificationStore
	const { AuthStoreService} = rootStore
	useEffect(() => {
		AuthStoreService.checkAuth()
	}, [])

/*deviceStorage.removeItem('refreshToken')
deviceStorage.removeItem('accessToken')*/
	return (
		<NavigationContainer>
			{isLoading === LoadingEnum.fetching && <Loading visible={true} />}
			<RootStack.Navigator>
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
			</RootStack.Navigator>
		</NavigationContainer>
	)
})

export default RootNavigation
