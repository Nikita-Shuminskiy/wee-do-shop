import React from 'react'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import categoryIcoMock from '../../assets/images/categoryIcoMock.png'
import ImageDisplay from '../ImageDisplay'

type CategoriesViewerType<T> = {
	subCategory: T
	onPress: () => void
	selectedSubCategoryId: string
	isCategory?: boolean
}
const SubCategoriesViewer = <T extends { name: string; image?: string }>({
	subCategory,
	onPress,
	selectedSubCategoryId,
	isCategory,
}: CategoriesViewerType<T>) => {
	//@ts-ignore
	const isChosenSubCategory = selectedSubCategoryId === subCategory?._id
	return (
		<TouchableOpacity onPress={onPress}>
			<Box alignItems={'center'} mr={1} justifyContent={'center'}>
				{isCategory ? (
					<>
						<ImageDisplay
							resizeMode={'center'}
							style={{ width: 50, height: 50 }}
							source={{ uri: subCategory.image }}
						/>
						<Text
							fontSize={13}
							fontWeight={'600'}
							color={isChosenSubCategory ? colors.green : colors.black}
						>
							{subCategory.name}
						</Text>
					</>
				) : (
					<Text
						fontSize={22}
						fontWeight={'600'}
						color={isChosenSubCategory ? colors.green : colors.gray}
					>
						{subCategory.name}
					</Text>
				)}
			</Box>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	subCategoryBlock: {},
	activeSubCategory: {},
})
export default SubCategoriesViewer
