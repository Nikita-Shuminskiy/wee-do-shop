import React from 'react';
import {Box, Pressable, Text} from "native-base";
import {colors} from "../../assets/colors/colors";
import {TouchableOpacity} from "react-native";
import {CategoryType} from "../../api/categoriesApi";

type CategoriesViewerType = {
    category: CategoryType
}
const CategoriesViewer = ({category}: CategoriesViewerType) => {
    return (
        <TouchableOpacity style={{marginBottom: 10}}>
            {/*<BlurView intensity={10} tint="light" style={StyleSheet.absoluteFillObject}/>*/}
            <Box borderRadius={16}
                 p={2}
                 w={76}
                 h={10}
                 backgroundColor={colors.grayDarkLight}
                 alignItems={'center'}
                 justifyContent={'center'} m={1}>
                <Text fontSize={14} fontWeight={'600'} color={colors.black}>{category.name}1</Text>
            </Box>
        </TouchableOpacity>
    );
};

export default CategoriesViewer;
