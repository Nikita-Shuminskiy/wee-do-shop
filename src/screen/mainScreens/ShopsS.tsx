import React, { useCallback, useEffect } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { colors } from '../../assets/colors/colors'
import { Box, Text } from 'native-base'
import HeaderUser from '../../components/headerUser'
import SearchStores from '../../components/SearchStores'
import { Dimensions, FlatList, StyleSheet } from 'react-native'
import AuthStore from '../../store/AuthStore/auth-store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { StoreType } from '../../api/storesApi'
import { routerConstants } from '../../constants/routerConstants'
import { renderEmptyContainer } from '../../components/list-viewer/empty-list'
import rootStore from '../../store/RootStore/root-store'
import ShopsViewer from '../../components/list-viewer/ShopsViewer'
import { observer } from 'mobx-react-lite'
import { useTranslation } from "react-i18next";

export type ShopsSType = {
	navigation: NavigationProp<ParamListBase>
}
const ShopsS = observer(({ navigation }: ShopsSType) => {
	const { StoresService } = rootStore
	const { user } = AuthStore
	const { StoresStore } = rootStore
	const { stores, setStore, favoriteStores, search, setSearch } = StoresStore
	const {t} = useTranslation(['shops', 'common']);
	const storesViews = useCallback(({ item }: { item: StoreType }) => {
		const onPress = () => {
			StoresService.getStore(item._id).then((data) => {
				if (data) {
					navigation.navigate(routerConstants.STORE)
				}
			})
		}
		return <ShopsViewer onPress={onPress} stores={item} />
	}, [])
	useEffect(() => {
		//StoresService.getStores()
		return () => {
			setSearch('')
		}
	}, [])
	return (
		<BaseWrapperComponent backgroundColor={colors.white} isKeyboardAwareScrollView={true}>
			<Box paddingX={4}>
				<HeaderUser address={user?.address} navigation={navigation} />
				<Box
					mt={2}
					w={'100%'}
					backgroundColor={colors.white}
					borderTopLeftRadius={16}
					borderTopRightRadius={16}
				>
					<SearchStores selectCategory={''} setSearch={setSearch} search={search} />
					<Text mt={2} mb={2} fontSize={24} fontWeight={'500'}>
						{t('shopsNearYou')}
					</Text>
					<Box mb={20}>
						<FlatList
							scrollEnabled={false}
							numColumns={2}
							contentContainerStyle={!stores?.length && styles.contentContainerStyleProducts}
							columnWrapperStyle={{ justifyContent: 'space-between' }}
							data={stores}
							renderItem={storesViews}
							keyExtractor={(item, index) => item._id.toString()}
							style={{ width: '100%' }}
							horizontal={false}
							ListEmptyComponent={() =>
								renderEmptyContainer(Dimensions.get('window').height, t('common:listEmpty'))
							}
						/>
					</Box>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})
const styles = StyleSheet.create({
	contentContainerStyleProducts: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentContainerStyle: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default ShopsS
