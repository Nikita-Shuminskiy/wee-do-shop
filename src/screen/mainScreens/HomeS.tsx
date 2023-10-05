import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Box } from 'native-base'
import { StyleSheet } from 'react-native'
import SubCategoriesViewer from '../../components/list-viewer/CategoriesViewer'
import rootStore from '../../store/RootStore/root-store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

type HomeSProps = {
	navigation: NavigationProp<ParamListBase>
}
const HomeS = observer(({ navigation }: HomeSProps) => {
	const { CategoriesService, CategoriesStore } = rootStore
	useEffect(() => {
		CategoriesService.getCategories()
	}, [])
	const { categories } = CategoriesStore

	const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('')

	const onPressCategory = useCallback(
		(subCategoryId) => {
			console.log(selectedSubCategoryId)
			const isCurrentChosenSubCategory = subCategoryId === selectedSubCategoryId
			if (isCurrentChosenSubCategory) {
				setSelectedSubCategoryId('')
			} else {
				setSelectedSubCategoryId(subCategoryId)
			}
		},
		[selectedSubCategoryId]
	)

	return (
		<Box>
			{categories.map((subCategory) => {
				return (
					<SubCategoriesViewer
						isSelectedSubCategory={selectedSubCategoryId === subCategory._id}
						// selectedSubCategoryId={
						// 	selectedSubCategoryId === subCategory._id ? selectedSubCategoryId : ''
						// }
						// setSelectedSubCategoryId={setSelectedSubCategoryId}
						key={subCategory._id}
						isCategory={true}
						onPressCategory={onPressCategory}
						subCategory={subCategory}
					/>
				)
			})}
		</Box>
	)
})
const styles = StyleSheet.create({
	contentContainerStyle: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default HomeS
