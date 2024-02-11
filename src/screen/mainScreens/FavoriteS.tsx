import React, { useCallback, useEffect } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { observer } from 'mobx-react-lite'
import { Box, Text } from 'native-base'
import { routerConstants } from '../../constants/routerConstants'
import StoresViewer from '../../components/list-viewer/StoresViewer/StoresViewer'
import { renderEmptyContainer } from '../../components/list-viewer/empty-list'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import rootStore from '../../store/RootStore/root-store'
import ArrowBack from '../../components/ArrowBack'
import arrowLeftBack from '../../assets/images/arrow-left.png'
import { colors } from '../../assets/colors/colors'
import { StoreType } from '../../api/storesApi'
import useGoBackNative from '../../utils/hook/useGoBackNative'
import AuthStore from "../../store/AuthStore/auth-store";
import { useTranslation } from "react-i18next";

type FavoriteSType = {
	navigation: NavigationProp<ParamListBase>
}
const FavoriteS = observer(({ navigation }: FavoriteSType) => {
	const {t} = useTranslation(['main', 'common']);
	const { StoresStore, StoresService } = rootStore
	const { favoriteStores } = StoresStore
	const { isAuth } = AuthStore
	const onPress = useCallback((store) => {
		StoresService.getStore(store._id).then((data) => {
			if (data) {
				navigation.navigate(routerConstants.STORE)
			}
		})
	}, [])
	const onPressRemoveFavoriteStore = useCallback((id) => {
		StoresService.deleteFavoriteStore(id)
	}, [])

	const storesViews = useCallback(({ item }: { item: StoreType }) => {
		return (
			<StoresViewer
				isAuth={isAuth}
				isFavorite={true}
				onPressToggleFavoriteStore={onPressRemoveFavoriteStore}
				onPress={onPress}
				stores={item}
			/>
		)
	}, [isAuth])
	const onPressGoBack = () => {
		navigation.navigate(routerConstants.HOME, { from: 'favorite' })
		return true
	}

	useGoBackNative(onPressGoBack)

	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={2} mt={5}>
				<Box alignItems={'center'} flexDirection={'row'} mb={10}>
					<Box mr={5}>
						<ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack} />
					</Box>
					<Text color={colors.black} fontWeight={'700'} fontSize={20}>
						{t('favoriteStores')}
					</Text>
				</Box>

				<FlatList
					scrollEnabled={false}
					data={favoriteStores}
					renderItem={storesViews}
					keyExtractor={(item, index) => index.toString()}
					style={{ width: '100%' }}
					ListEmptyComponent={() =>
						renderEmptyContainer(Dimensions.get('window').height, t('common:listEmpty'))
					}
					contentContainerStyle={!favoriteStores?.length ? styles.contentContainerStyle : null}
				/>
			</Box>
		</BaseWrapperComponent>
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
export default FavoriteS
