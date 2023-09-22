import React from 'react';
import { Image } from 'expo-image';

const ImageDisplay = ({ source, style,  ...restProps }: any) => {
    return (
        <Image
            cachePolicy={'memory'}
            source={source}
            style={style}
            {...restProps}
        />
    );
};

export default ImageDisplay;
