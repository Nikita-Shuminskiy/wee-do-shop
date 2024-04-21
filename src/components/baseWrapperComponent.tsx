import React, { forwardRef, memo, useCallback, useState, useRef } from "react";
import { GestureResponderEvent, Platform, RefreshControl, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type BaseWrapperComponentProps = {
	children: JSX.Element | JSX.Element[]
	onTouchStart?: (event: GestureResponderEvent) => void
	onTouchEnd?: (event: GestureResponderEvent) => void
	isKeyboardAwareScrollView?: boolean
	styleSafeArea?: any
	backgroundColor?: string
	extraScrollHeight?: number
	onRefreshHandler?: () => void
	setIsScroll?: (val: boolean) => void
}

export const BaseWrapperComponent = forwardRef<any, BaseWrapperComponentProps>(({
																																					 children,
																																					 onTouchEnd,
																																					 onTouchStart,
																																					 isKeyboardAwareScrollView = false,
																																					 styleSafeArea,
																																					 backgroundColor = 'white',
																																					 extraScrollHeight,
																																									setIsScroll,
																																					 onRefreshHandler,
																																				 }, ref) => {
	const [refreshing, setRefreshing] = useState(false)
	const handleScroll = useCallback((event: any) => {
		const offsetY = event.nativeEvent.contentOffset.y;
		if (offsetY >= 400) {
			setIsScroll?.(true);
		} else {
			setIsScroll?.(false);
		}
	}, []);

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
					ref={ref}
					onScroll={handleScroll}
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
})
