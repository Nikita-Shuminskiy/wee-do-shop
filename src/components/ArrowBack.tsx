import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from "react-native";
import arrowLeft from '../assets/images/arrow-left.png'
type ArrowBackProps = {
    goBackPress: any,
    img?: ImageSourcePropType
    styleTouchable?: any
}
const ArrowBack = ({goBackPress, img, styleTouchable}: ArrowBackProps) => {
    return (
        <TouchableOpacity style={{...styleTouchable}} onPress={goBackPress}>
            <Image style={{width: 31, height: 31}} source={img ?? arrowLeft}/>
        </TouchableOpacity>
    );
};

export default ArrowBack;
