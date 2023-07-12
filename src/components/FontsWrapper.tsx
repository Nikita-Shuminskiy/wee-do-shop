import {useFonts} from "expo-font";
import React, {useCallback} from "react";
import * as SplashScreen from "expo-splash-screen";
import {Platform, SafeAreaView} from "react-native";

export const FontsWrapper = ({children}) => {
    const [fontsLoaded] = useFonts({
        'Onest-medium': require('../assets/font/TTF/Onest-Medium.ttf'),
        'Onest-bold': require('../assets/font/TTF/Onest-Bold.ttf'),
        'Onest-light': require('../assets/font/TTF/Onest-Light.ttf'),
        'Inter-black': require('../assets/font/Inter-Black.otf'),
        "Inter-SemiBoldItalic":
            "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView
            onLayout={onLayoutRootView}
            style={{
                flex: 1,
                width: '100%',
                display: Platform.OS === 'ios' ? 'flex' : null,
            }}
        >
            {children}
        </SafeAreaView>
    )
}
