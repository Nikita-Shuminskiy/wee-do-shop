import React, {memo} from "react"
import {Box, Text} from "native-base"
import {colors} from "../../assets/colors/colors"
import {Image, StyleSheet, TouchableOpacity} from "react-native"
import categoryIcoMock from "../../assets/images/categoryIcoMock.png"
import ImageDisplay from "../ImageDisplay"
import {observer} from "mobx-react-lite"
import StoresStore from "../../store/StoresStore/stores-store"
import { useTranslation } from "react-i18next";

type CategoriesViewerType = {
	subCategory: any
	onPress: (category: any) => void
	isCategory?: boolean
	isChosen?: boolean
}
const SubCategoriesViewer = memo(
	({subCategory, onPress, isCategory, isChosen}: CategoriesViewerType) => {
		const {t} = useTranslation(['main', 'common']);
		return (
			<TouchableOpacity onPress={() => onPress(subCategory)}>
				<Box alignItems={"center"} mr={2} justifyContent={"center"}>
					{isCategory ? (
						<>
							<Image
								resizeMode={"contain"}
								style={{width: 73, height: 73}}
								source={{uri: subCategory.image}}
							/>
							<Text fontSize={13} fontWeight={"600"} color={isChosen ? colors.green : colors.black}>
								{t(subCategory?.name.trim())}
							</Text>
						</>
					) : (
						<Text
							fontSize={22}
							fontWeight={"600"}
							ml={2}
							borderColor={isChosen ? colors.green : colors.gray}
							color={isChosen ? colors.green : colors.gray}
						>
							{subCategory?.name.trim()}
						</Text>
					)}
				</Box>
			</TouchableOpacity>
		)
	}
)
const styles = StyleSheet.create({
	subCategoryBlock: {},
	activeSubCategory: {},
})
export default SubCategoriesViewer
