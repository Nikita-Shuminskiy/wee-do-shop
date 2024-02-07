import React, { memo, useCallback, useEffect, useState } from "react";
import { colors } from '../assets/colors/colors'
import { Box, Image } from 'native-base'
import TextInput from './TextInput'
import searchImg from '../assets/images/search.png'
import settingImg from '../assets/images/setting.png'
import rootStore from '../store/RootStore/root-store'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from "react-i18next";

type SearchStoresType = {
	search: string
	setSearch: (text: string) => void
	selectCategory: string
}
const SearchStores = memo(({ search, setSearch, selectCategory }: SearchStoresType) => {
	const { StoresService } = rootStore
	const {t} = useTranslation(['main', 'common']);
	const handleTextChange = useCallback((newText) => {
		setSearch(newText)
	}, [])

	const onSubmitEditing = () => {
		StoresService.searchStores({ search, categoryId: selectCategory })
	}

	return (
		<Box w={'100%'}>
			<TextInput
				iconLeft={<Image ml={2} w={5} h={5} source={searchImg} alt={'search'} />}
				iconRight={
					search && (
						<TouchableOpacity
							onPress={() => {
								StoresService.searchStores({ search: '', categoryId: selectCategory })
								setSearch('')
							}}
						>
							<AntDesign name="closecircleo" size={24} color={`#9095A4`} />
						</TouchableOpacity>
					)
				}
				returnKeyType={'search'}
				h={50}
				placeholder={t('storeSearch')}
				borderRadius={16}
				backgroundColor={'transparent'}
				borderColor={colors.grayLight}
				value={search}
				onSubmitEditing={onSubmitEditing}
				onChangeText={handleTextChange}
			/>
		</Box>
	)
})

export default SearchStores
