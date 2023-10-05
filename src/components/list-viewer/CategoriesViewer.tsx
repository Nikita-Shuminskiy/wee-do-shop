import React, { memo, useCallback } from 'react'
import { Box, Text } from 'native-base'
import { colors } from '../../assets/colors/colors'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { isEqual } from 'lodash'

const test = {}

type CategoriesViewerType = {
	subCategory: any
	isCategory?: boolean
	isSelectedSubCategory?: boolean
	selectedSubCategoryId?: string
	setSelectedSubCategoryId?: (subCategory: any) => void
	onPressCategory?: (a: any) => void
}
const SubCategoriesViewer = memo(
	({
		subCategory,
		isCategory,
		selectedSubCategoryId,
		isSelectedSubCategory,
		onPressCategory,
	}: CategoriesViewerType) => {
		//@ts-ignore
		// const isChosenSubCategory = selectedSubCategoryId === subCategory?._id
		const onPress = useCallback(() => {
			onPressCategory(subCategory._id)
		}, [subCategory._id])
		if (test[subCategory._id]) {
			test[subCategory._id].push({
				isCategory,
				selectedSubCategoryId,
				subCategory,
				onPressCategory,
			})
		}
		if (!test[subCategory._id]) {
			test[subCategory._id] = [{ isCategory, selectedSubCategoryId, subCategory, onPressCategory }]
		}

		//console.log('SubCategoriesViewer111')
		console.log(
			subCategory._id,
			isEqual(
				test[subCategory._id][test[subCategory._id].length - 2],
				test[subCategory._id][test[subCategory._id].length - 1]
			)
		)
		// console.log(222222, test)
		console.log('SubCategoriesViewer')
		return (
			<TouchableOpacity onPress={onPress}>
				<Box alignItems={'center'} mr={1} justifyContent={'center'}>
					{isCategory ? (
						<>
							<Image
								resizeMode={'contain'}
								style={{ width: 60, height: 60 }}
								source={{ uri: subCategory.image }}
							/>
							<Text
								fontSize={13}
								fontWeight={'600'}
								color={isSelectedSubCategory ? colors.green : colors.black}
							>
								{subCategory.name}
							</Text>
						</>
					) : (
						<Text
							fontSize={22}
							fontWeight={'600'}
							ml={2}
							borderColor={isSelectedSubCategory ? colors.green : colors.gray}
							color={isSelectedSubCategory ? colors.green : colors.gray}
						>
							{subCategory.name}
						</Text>
					)}
				</Box>
			</TouchableOpacity>
		)
	},
	(prevProps, nextProps) => {
		const res = isEqual(prevProps, nextProps)
		console.log(11111, res)
		return res
	}
)

const styles = StyleSheet.create({
	subCategoryBlock: {},
	activeSubCategory: {},
})
export default SubCategoriesViewer
