import {StatusBar} from "expo-status-bar"
import RootNavigation from "./src/navigation/RootNavigation"
import {NativeBaseProvider} from "native-base"
import {LogBox} from "react-native"
import {GestureHandlerRootView} from "react-native-gesture-handler"
import './src/utils/i18n';
import NotificationStore from "./src/store/NotificationStore/notification-store";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-reanimated'
import { onDisplayNotification } from "./src/utils/hook/useNotification";
import messaging from "@react-native-firebase/messaging";
LogBox.ignoreLogs([
	"In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
])
// Temporary solution until the problem is officially fixed
// https://github.com/GeekyAnts/NativeBase/issues/5758
messaging().setBackgroundMessageHandler(onDisplayNotification)
export default function App() {
	const {setNavigation} = NotificationStore
	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<NativeBaseProvider>
				<StatusBar
					hidden={false}
					backgroundColor={'transparent'}
					style={"auto"}
					animated={true}
					translucent={true}
				/>
				<NavigationContainer
					ref={(navigationRef) => {
						setNavigation(navigationRef)
					}}
				>
				<RootNavigation />
				</NavigationContainer>
			</NativeBaseProvider>
		</GestureHandlerRootView>
	)
}
