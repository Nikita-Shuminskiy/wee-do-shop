import React from 'react';
import {Box, Pressable, Text} from "native-base";
import {colors} from "../../assets/colors/colors";
import {TouchableOpacity} from "react-native";

const CategoriesViewer = ({data}) => {
    return (
        <TouchableOpacity style={{ marginBottom: 10 }}>
            {/*<BlurView intensity={10} tint="light" style={StyleSheet.absoluteFillObject}/>*/}
            <Box borderRadius={16} w={76} h={10} backgroundColor={colors.grayDarkLight} alignItems={'center'} justifyContent={'center'} m={1}>
                <Text fontSize={14} fontWeight={'600'} color={colors.green}>{data.name}</Text>
            </Box>
        </TouchableOpacity>
    );
};

export default CategoriesViewer;
