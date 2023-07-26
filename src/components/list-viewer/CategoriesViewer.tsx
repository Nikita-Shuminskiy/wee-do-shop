import React from 'react';
import {Box, Text} from "native-base";
import {colors} from "../../assets/colors/colors";
import {StyleSheet, TouchableOpacity} from "react-native";

type CategoriesViewerType<T> = {
    subCategory: T
    onPress: () => void
    selectedSubCategoryId: string
}
const SubCategoriesViewer = <T extends { name: string }>({subCategory, onPress, selectedSubCategoryId}: CategoriesViewerType<T>) => {
    return (
        <TouchableOpacity onPress={onPress} style={[{marginBottom: 10}]}>
            {/*<BlurView intensity={10} tint="light" style={StyleSheet.absoluteFillObject}/>*/}
            <Box
                 style={selectedSubCategoryId && styles.activeSubCategory}
                 p={2}
                 h={10}
                 alignItems={'center'}
                 justifyContent={'center'} m={1}>
                <Text fontSize={14} fontWeight={'600'} color={colors.black}>{subCategory.name}</Text>
            </Box>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    activeSubCategory: {
        borderRadius: 16,
        backgroundColor: colors.grayDarkLight
    }
})
export default SubCategoriesViewer;
