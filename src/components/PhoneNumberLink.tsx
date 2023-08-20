import {Linking, TouchableOpacity} from "react-native";
import {Text} from "native-base";
import React from "react";
import {colors} from "../assets/colors/colors";

export const PhoneNumberComponent = ({ phoneNumber }) => {
    const handlePhonePress = async () => {
        const url = `tel:${phoneNumber}`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.error('Невозможно открыть телефонную книгу');
        }
    };

    return (
        <TouchableOpacity onPress={handlePhonePress}>
            <Text fontSize={15} color={colors.blueLightMedium}>{phoneNumber}</Text>
        </TouchableOpacity>
    );
};
