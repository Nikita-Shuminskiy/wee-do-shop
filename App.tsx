import { StatusBar } from 'expo-status-bar'
import RootNavigation from './src/navigation/RootNavigation'
import { NativeBaseProvider } from 'native-base'
import { LogBox } from "react-native"

LogBox.ignoreLogs([
	'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
])
// Temporary solution until the problem is officially fixed
// https://github.com/GeekyAnts/NativeBase/issues/5758

export default function App() {
	return (
		<NativeBaseProvider>
			<StatusBar hidden={false} style={'auto'} animated={true} translucent={true} />
			<RootNavigation />
		</NativeBaseProvider>
	)
}

