import { StatusBar } from 'expo-status-bar'
import RootNavigation from './src/navigation/RootNavigation'
import { NativeBaseProvider } from 'native-base'
import { LogBox } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { appUpgradeVersionCheck } from 'app-upgrade-react-native-sdk'
LogBox.ignoreLogs([
	'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
])
// Temporary solution until the problem is officially fixed
// https://github.com/GeekyAnts/NativeBase/issues/5758

export default function App() {
	const xApiKey = 'YzAwNzY5MWItNjliNC00YTMyLThiOTEtOWZmMjk3ZDUwN2Mx' // Your project key

	const appInfo = {
		appId: 'com.wee_doo.th', // Your app id in play store or app store
		appName: 'Weedo', // Your app name
		appVersion: '1.0.3', // Your app version
		platform: 'android', // App Platform, android or ios
		environment: 'production', // App Environment, production, development
		appLanguage: 'es', //Your app language ex: en, es etc. Optional.
	}

	// Alert config is optional
	const alertConfig = {
		title: 'Updates available',
		updateButtonTitle: 'Update Now',
		laterButtonTitle: 'Later',
		onDismissCallback: () => {
			console.log('Dismiss')
		},
		onLaterCallback: () => {
			console.log('Later')
		},
	}

	appUpgradeVersionCheck(appInfo, xApiKey, alertConfig)
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NativeBaseProvider>
				<StatusBar
					hidden={false}
					backgroundColor={'transparent'}
					style={'auto'}
					animated={true}
					translucent={true}
				/>
				<RootNavigation />
			</NativeBaseProvider>
		</GestureHandlerRootView>
	)
}
