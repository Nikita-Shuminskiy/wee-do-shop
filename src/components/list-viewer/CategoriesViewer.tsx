import React from 'react';
import {Box, Pressable, Text} from "native-base";
import {colors} from "../../assets/colors/colors";
import {TouchableOpacity, StyleSheet} from "react-native";
import {CategoryType} from "../../api/categoriesApi";

type CategoriesViewerType = {
    category: CategoryType
    onPress: () => void
    selectedSubCategoryId: string
}
const SubCategoriesViewer = ({category, onPress, selectedSubCategoryId}: CategoriesViewerType) => {
    return (
        <TouchableOpacity onPress={onPress} style={[{marginBottom: 10}]}>
            {/*<BlurView intensity={10} tint="light" style={StyleSheet.absoluteFillObject}/>*/}
            <Box borderRadius={16}
                 style={selectedSubCategoryId && styles.activeSubCategory}
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
const styles = StyleSheet.create({
    activeSubCategory: {
        borderWidth: 1,
        borderColor: colors.green
    }
})
export default SubCategoriesViewer;
