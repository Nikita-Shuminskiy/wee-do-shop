import React from 'react'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import categoryIcoMock from '../../assets/images/categoryIcoMock.png'

type CategoriesViewerType<T> = {
	subCategory: T
	onPress: () => void
	selectedSubCategoryId: string
}
const SubCategoriesViewer = <T extends { name: string; image?: string }>({
	subCategory,
	onPress,
	selectedSubCategoryId,
}: CategoriesViewerType<T>) => {
	//@ts-ignore
	const isChosenSubCategory = selectedSubCategoryId === subCategory?._id
	return (
		<TouchableOpacity style={styles.shadow} onPress={onPress}>
			{/*<BlurView intensity={10} tint="light" style={StyleSheet.absoluteFillObject}/>*/}
			<Box alignItems={'center'} mr={1} justifyContent={'center'}>
				<Image
					resizeMode={'center'}
					style={{ width: 50, height: 50 }}
					source={subCategory.image ? { uri: subCategory.image } : categoryIcoMock}
				/>
				<Text
					fontSize={13}
					fontWeight={'600'}
					color={isChosenSubCategory ? colors.green : colors.black}
				>
					{subCategory.name}
				</Text>
			</Box>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	shadow: {
		backgroundColor: colors.white,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,

		elevation: 7,
	},
	subCategoryBlock: {},
	activeSubCategory: {},
})
export default SubCategoriesViewer;
