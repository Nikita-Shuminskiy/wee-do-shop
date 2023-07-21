import React from 'react';
import {Box, Pressable, Text} from "native-base";
import {colors} from "../../assets/colors/colors";
import {TouchableOpacity, StyleSheet} from "react-native";
import {CategoryType} from "../../api/categoriesApi";
import {SubCategoryType} from "../../api/subCategoriesApi";

type CategoriesViewerType = {
    subCategory: SubCategoryType
    onPress: () => void
    selectedSubCategoryId: string
}
const SubCategoriesViewer = ({subCategory, onPress, selectedSubCategoryId}: CategoriesViewerType) => {
    return (
        <TouchableOpacity onPress={onPress} style={[{marginBottom: 10}]}>
            {/*<BlurView intensity={10} tint="light" style={StyleSheet.absoluteFillObject}/>*/}
            <Box
                 style={selectedSubCategoryId && styles.activeSubCategory}
                 p={2}
                 w={76}
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
