import React, {memo} from "react"
import {Box, Text} from "native-base"
import {colors} from "../../../assets/colors/colors"
import {Image, TouchableOpacity} from "react-native"
import {useTranslation} from "react-i18next"

type CategoriesViewerType = {
	subCategory: any
	onPress: (category: any) => void
	isCategory?: boolean
	isChosen?: boolean
}

const SubCategoriesViewer = ({subCategory, onPress, isCategory, isChosen}: CategoriesViewerType) => {
		const {t} = useTranslation(['main', 'common']);
		return (
			<TouchableOpacity onPress={() => onPress(subCategory)}>
				<Box mr={2}>
					{isCategory ? (
						<Box alignItems={'center'} backgroundColor={isChosen ? `rgba(105, 147, 21, 0.53)` : 'transparent'} borderRadius={16} p={1}>
							<Image
								resizeMode={"contain"}
								style={{width: 70, height: 70}}
								source={{uri: subCategory.image}}
							/>
							<Text fontSize={12}  fontWeight={"600"} color={isChosen ? colors.white : colors.black}>
								{t(subCategory?.name.trim())}
							</Text>
						</Box>
					) : (
						<Text
							fontSize={22}
							fontWeight={"600"}
							ml={2}
							color={isChosen ? colors.green : colors.gray}
						>
							{t(subCategory?.name.trim())}
						</Text>
					)}
				</Box>
			</TouchableOpacity>
		)
	}

export default memo(SubCategoriesViewer)
