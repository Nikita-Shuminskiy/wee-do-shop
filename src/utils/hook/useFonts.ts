import * as Font from 'expo-font';

export const useFonts = async () => {
    try {
        await Font.loadAsync({
            'Onest-medium': require('../../assets/font/TTF/Onest-Medium.ttf'),
            'Onest-bold': require('../../assets/font/TTF/Onest-Bold.ttf'),
            'Onest-light': require('../../assets/font/TTF/Onest-Light.ttf'),
        });
    } catch (e) {
    }
}
