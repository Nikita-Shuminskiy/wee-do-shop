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
import ShopsViewer from '../../components/list-viewer/ShopsViewer/ShopsViewer'
import { observer } from 'mobx-react-lite'
import { useTranslation } from "react-i18next";

export type ShopsSType = {
	navigation: NavigationProp<ParamListBase>
}
const ShopsS = observer(({ navigation }: ShopsSType) => {
	const { user, isAuth } = AuthStore
	const { StoresStore, StoresService } = rootStore
	const { shops} = StoresStore
	const {t} = useTranslation(['shops', 'common']);
	const onPress = useCallback((id) => {
		//navigation.navigate(routerConstants.STORE, { storeId: id })
		StoresService.getStore(id).then((data) => {
			if (data) {
				navigation.navigate(routerConstants.STORE)
			}
		})
	}, [])
	const storesViews = useCallback(({ item }: { item: StoreType }) => {
		return <ShopsViewer onPress={onPress} stores={item} />
	}, [])
	const getHomeData = useCallback(async () => {
		StoresService.getShops()
	}, [])
	return (
		<BaseWrapperComponent 	onRefreshHandler={getHomeData} backgroundColor={colors.white} isKeyboardAwareScrollView={true}>
			<Box paddingX={2}>
				<HeaderUser isAuth={isAuth} address={user?.address}  />
				<Box
					mt={2}
					w={'100%'}
					backgroundColor={colors.white}
					borderTopLeftRadius={16}
					borderTopRightRadius={16}
				>
					<Text mt={2} mb={2} fontSize={24} fontWeight={'500'}>
						{t('shopsNearYou')}
					</Text>
					<Box mb={20}>
						<FlatList
							scrollEnabled={false}
							numColumns={2}
							contentContainerStyle={!shops?.length && styles.contentContainerStyleProducts}
							columnWrapperStyle={{ justifyContent: 'space-between' }}
							data={shops}
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
