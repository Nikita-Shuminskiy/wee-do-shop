import React, { forwardRef, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GestureResponderEvent, Platform, RefreshControl, SafeAreaView } from 'react-native'
import { VirtualizedList } from './virtualized-list'

type BaseWrapperComponentType = {
	children: JSX.Element | JSX.Element[]
	onTouchStart?: (event: GestureResponderEvent) => void
	onTouchEnd?: (event: GestureResponderEvent) => void
	isKeyboardAwareScrollView?: boolean
	styleSafeArea?: any
	isBackdrop?: boolean
	backgroundColor?: string
	extraScrollHeight?: number
	onRefreshHandler?: () => void
}
export const BaseWrapperComponent = ({
	children,
	onTouchEnd,
	onTouchStart,
	isKeyboardAwareScrollView = false,
	styleSafeArea,
	backgroundColor = 'white',
	extraScrollHeight,
	onRefreshHandler,
}: BaseWrapperComponentType) => {
	const [refreshing, setRefreshing] = useState(false)

	const onRefresh = () => {
		setRefreshing(true)
		onRefreshHandler()
		setTimeout(() => {
			setRefreshing(false)
		}, 1000)
	}
	return (
		<SafeAreaView
			style={{
				flex: 1,
				width: '100%',
				paddingTop: Platform.OS === 'ios' ? 0 : 29,
				backgroundColor: backgroundColor,
				...styleSafeArea,
			}}
		>
			{isKeyboardAwareScrollView ? (
				<KeyboardAwareScrollView
					enableOnAndroid={true}
					extraScrollHeight={extraScrollHeight}
					keyboardShouldPersistTaps={'handled'}
					refreshControl={
						onRefreshHandler ? (
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						) : null
					}
					contentContainerStyle={{
						marginBottom: 10,
						flexGrow: 1,
						width: '100%',
					}}
					style={{
						flex: 1,
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
