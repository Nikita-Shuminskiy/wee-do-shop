import React, {forwardRef} from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {GestureResponderEvent, Platform, SafeAreaView} from 'react-native'
import {VirtualizedList} from "./virtualized-list";

type BaseWrapperComponentType = {
    children: JSX.Element | JSX.Element[]
    onTouchStart?: (event: GestureResponderEvent) => void
    onTouchEnd?: (event: GestureResponderEvent) => void
    isKeyboardAwareScrollView?: boolean
    styleSafeArea?: any
    isBackdrop?: boolean
    backgroundColor?: string
    extraScrollHeight?: number
}
export const BaseWrapperComponent = ({
                                         children,
                                         onTouchEnd,
                                         onTouchStart,
                                         isKeyboardAwareScrollView = false,
                                         styleSafeArea,
                                         backgroundColor = 'transparent',
                                         extraScrollHeight
                                     }: BaseWrapperComponentType) => {

    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
            marginTop: Platform.OS === 'ios' ? 0 : 29,
            backgroundColor: backgroundColor, ...styleSafeArea
        }}>
            {isKeyboardAwareScrollView ? (

                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraScrollHeight={extraScrollHeight}
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={{
                        marginBottom: 10,
                        flexGrow: 1,
                        width: '100%',
                    }}
                    style={{
                        flex: 1,
                        width: '100%'
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
