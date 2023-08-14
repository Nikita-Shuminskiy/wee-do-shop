import { StatusBar } from 'expo-status-bar'
import RootNavigation from './src/navigation/RootNavigation'
import { NativeBaseProvider } from 'native-base'
import { LogBox } from "react-native"
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {useEffect, useState} from "react";
import NetInfo from '@react-native-community/netinfo';
LogBox.ignoreLogs([
	'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
])
// Temporary solution until the problem is officially fixed
// https://github.com/GeekyAnts/NativeBase/issues/5758

export default function App() {
	const [isConnected, setIsConnected] = useState(true);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener(state => {
			setIsConnected(state.isConnected);
		});

		return () => {
			unsubscribe(); // Отписываемся от обновлений состояния подключения
		};
	}, []);

	const handleOpenSettings = () => {
		// Здесь вы можете добавить логику для открытия настроек интернета на устройстве
		// Например, для Android можно использовать: Linking.openSettings();
		// Для iOS: Linking.openURL('app-settings:');
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NativeBaseProvider>
				<StatusBar hidden={false} style={'auto'} animated={true} translucent={true} />
				<RootNavigation />
			</NativeBaseProvider>
		</GestureHandlerRootView>

	)
}

