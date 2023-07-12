import React, {useRef, useState} from 'react';
import {Picker as Select} from '@react-native-picker/picker';
import {colors} from "../assets/colors/colors";
import RNPickerSelect from 'react-native-picker-select-updated';
import {Image, StyleSheet, View} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import * as Localization from 'expo-localization';
type PickerProps = {
    selectStyles?: any
}
const Picker = ({selectStyles}: PickerProps) => {
    //const [selectedLanguage, setSelectedLanguage] = useState()
    const checkLanguage = Localization.locale.includes('he')
    const pickerRef = useRef<any>();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    // @ts-ignore

    return <View>

        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            placeholder={{}}
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}

            value={{label: 'English ', value: 'English'}}
            /**  @ts-ignore **/
            Icon={(e) => {
                // @ts-ignore
                return <AntDesign name="caretdown" size={24} color={colors.blue}/>
            }}
            ref={el => {
                // @ts-ignore
                pickerRef.favSport0 = el;
            }}
            style={{
                inputAndroidContainer: {height: 67, alignItems: 'center', flexDirection: checkLanguage ? 'row-reverse' : 'row'},
                inputIOSContainer: {height: 67, justifyContent: 'center'},
                placeholder: {color: colors.blue},
                inputAndroid: styles.inputAndroid,
                inputIOS: styles.inputAndroid
            }}
            items={[
                {label: 'English ', value: 'English'},
            ]}
        />
    </View>
};
const styles = StyleSheet.create({
    inputAndroid: {
        fontSize: 18, fontFamily: 'Onest-light',
        color: colors.blue
    }
})
export default Picker;