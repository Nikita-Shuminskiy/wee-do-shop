import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import TextInput from "./TextInput";
import {colors} from "../assets/colors/colors";
import microImg from '../assets/images/microWitchBackground.png'
import ArrowUpImage from '../assets/images/arrowUpWitchBacground.png'


const InputFieldsChat = () => {
    return (
        <View style={styles.container}>
            <TextInput styleContainer={styles.styleInputContainer} style={styles.input}/>
            {/*<TouchableOpacity>
                <Image style={{...styles.img, marginRight: 5}} source={microImg}/>
            </TouchableOpacity>*/}
            <TouchableOpacity>
                <Image style={styles.img} source={ArrowUpImage}/>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    styleInputContainer: {marginTop: 0, height: 37, marginRight: 5},
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        paddingHorizontal: 30

    },
    img: {
        margin: 2
    },
    input: {
        padding: 10,
        fontSize: 14,
        width: 243,
        height: 37
    },

})
export default InputFieldsChat;