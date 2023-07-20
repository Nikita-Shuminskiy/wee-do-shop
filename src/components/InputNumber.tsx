import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {colors} from "../assets/colors/colors";
import {isNaN} from "formik";
const checkValidNumber = (value: string | number) => {
    const convertToNumber: number = typeof value === 'string' ? parseInt(value) : value
    return isNaN(convertToNumber) || value < 0
}
type InputNumberProps = {
    onChangeValue: (value: number) => void
    values: number
    styleBtn?: StyleProp<ViewStyle>
}
const InputNumber = ({onChangeValue, values, styleBtn}:InputNumberProps) => {

    const handleIncrement = () => {
        if(checkValidNumber(values)) return 0
        onChangeValue(values + 1)
    };

    const handleDecrement = () => {
        if(checkValidNumber(values) || values === 0) return 0
        onChangeValue(values - 1)
    };
    const onChangeText = (value: string) => {
        if(checkValidNumber(value)) return
        onChangeValue(parseInt(value))
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, styleBtn]} onPress={handleDecrement}>
                <Ionicons name="ios-remove" size={22} color={colors.black}/>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={values?.toString()}
                onChangeText={onChangeText}
            />
            <TouchableOpacity style={[styles.button, styleBtn]} onPress={handleIncrement}>
                <Ionicons name="ios-add" size={22} color={colors.black}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: 'transparent',
        borderRadius: 8,
        flex: 1,
    },
    input: {
        flex: 1,
        fontSize: 24,
        textAlign: 'center',
    },
    button: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grayDarkLight,
        borderRadius: 12,
    },
});

export default InputNumber;
