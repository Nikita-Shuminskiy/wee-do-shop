import {useEffect, useState} from "react";
import {Keyboard, View} from "react-native";

export const useKeyBoardStatus = () => {
    const [keyboardStatus, setKeyboardStatus] = useState<boolean>();

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    return {
        keyboardStatus
    }
};
