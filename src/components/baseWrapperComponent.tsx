import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GestureResponderEvent, Platform, SafeAreaView } from 'react-native'

type BaseWrapperComponentType = {
	children: JSX.Element | JSX.Element[]
	onTouchStart?: (event: GestureResponderEvent) => void
	onTouchEnd?: (event: GestureResponderEvent) => void
	isKeyboardAwareScrollView?: boolean
	styleSafeArea?: any
	isBackdrop?: boolean
}
export const BaseWrapperComponent = ({
																			 children,
																			 onTouchEnd,
																			 onTouchStart,
																			 isKeyboardAwareScrollView = false,
																			 styleSafeArea,
																			 isBackdrop = false,
																		 }: BaseWrapperComponentType) => {

	return (
		<SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 0 : 29, backgroundColor: 'white', ...styleSafeArea }}>
			{isKeyboardAwareScrollView ? (
				<KeyboardAwareScrollView
					enableOnAndroid={true}
					keyboardShouldPersistTaps={'handled'}
					contentContainerStyle={{
						marginBottom: 10,
						flexGrow: 1,
						width: '100%',
					}}
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
				>
					{children}
				</KeyboardAwareScrollView>
			) : (
				children
			)}
		</SafeAreaView>
	)
}
