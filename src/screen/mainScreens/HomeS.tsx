import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Text } from 'native-base'
import AuthStore from '../../store/AuthStore/auth-store'
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native'
import { colors } from '../../assets/colors/colors'
import { renderEmptyContainer } from '../../components/list-viewer/empty-list'
import SubCategoriesViewer from '../../components/list-viewer/CategoriesViewer'
import StoresViewer from '../../components/list-viewer/StoresViewer'
import rootStore from '../../store/RootStore/root-store'
import { CategoryType } from '../../api/categoriesApi'
import { routerConstants } from '../../constants/routerConstants'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import SearchStores from '../../components/SearchStores'
import { StoreType } from '../../api/storesApi'
import HeaderUser from '../../components/headerUser'
import Carousel from 'react-native-snap-carousel'
import { BannersType } from '../../api/userApi'
import ImageDisplay from '../../components/ImageDisplay'

type HomeSProps = {
	navigation: NavigationProp<ParamListBase>
}
const HomeS = observer(({ navigation }: HomeSProps) => {
	const { user, banners } = AuthStore
	const { StoresService, StoresStore, CategoriesService, CategoriesStore } = rootStore
	const { stores, setStore, favoriteStores, search, setSearch } = StoresStore
	const { categories } = CategoriesStore
	const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>('')

	const categoriesViews = ({ item }: { item: CategoryType }) => {
		const onPressCategory = () => {
			const isCurrentChosenSubCategory = item._id === selectedSubCategoryId
			if (isCurrentChosenSubCategory) {
				setSelectedSubCategoryId('')
			} else {
				setSelectedSubCategoryId(item._id)
			}

			StoresService.searchStores({ categoryId: isCurrentChosenSubCategory ? '' : item._id })
		}
		return (
			<SubCategoriesViewer<CategoryType>
				selectedSubCategoryId={selectedSubCategoryId}
				onPress={onPressCategory}
				subCategory={item}
			/>
		)
	}
	const storesViews = ({ item }: { item: StoreType }) => {
		const onPress = () => {
			setStore(item)
			navigation.navigate(routerConstants.STORE)
		}
		const onPressSaveFavoriteStore = () => {
			StoresService.saveFavoriteStore(item._id)
		}
		const onPressRemoveFavoriteStore = () => {
			StoresService.deleteFavoriteStore(item._id)
		}
		const checkFavoriteStore = favoriteStores.some((storeF) => storeF._id === item._id)
		return (
			<StoresViewer
				checkFavoriteStore={checkFavoriteStore}
				onPressSaveFavoriteStore={onPressSaveFavoriteStore}
				onPressRemoveFavoriteStore={onPressRemoveFavoriteStore}
				onPress={onPress}
				stores={item}
			/>
		)
	}

	useEffect(() => {
		StoresService.getStores()
		CategoriesService.getCategories()
		StoresService.getFavoriteStores()
	}, [user.address?.fullAddress])

	//const [activeIndexBanner, setActiveIndexBanners] = useState<number>(0)
	const bannersView = ({ item }: { item: BannersType }) => {
		return (
			<Box mr={1} w={353} h={74}>
				<ImageDisplay style={{ width: 353, height: 74 }} source={{ uri: item.image }} />
			</Box>
		)
	}
	const carouselRef = useRef<any>(null)

	return (
		<BaseWrapperComponent backgroundColor={colors.white} isKeyboardAwareScrollView={true}>
			<Box paddingX={4} w={'100%'} flex={1}>
				<HeaderUser address={user?.address} navigation={navigation} />
				<Box mt={2} w={'100%'} flex={1} borderTopLeftRadius={16} borderTopRightRadius={16}>
					<SearchStores
						setSearch={setSearch}
						search={search}
						selectedSubCategoryId={selectedSubCategoryId}
					/>
					<Box mt={5} alignItems={'center'} w={'100%'}>
						<Carousel
							ref={carouselRef}
							layout={'default'}
							data={banners}
							sliderWidth={Dimensions.get('window').width}
							itemWidth={353}
							autoplayInterval={5000}
							autoplayDelay={5000}
							shouldOptimizeUpdates={true}
							autoplay={true}
							loop={true}
							renderItem={bannersView}
						/>
					</Box>
					<Box mt={3} mb={3} maxHeight={20} w={'100%'} flex={1}>
						<FlatList
							data={categories}
							renderItem={categoriesViews}
							keyExtractor={(item, index) => index.toString()}
							style={{ width: '100%' }}
							contentContainerStyle={!categories?.length && styles.contentContainerStyle}
							ListEmptyComponent={() => renderEmptyContainer(0, '')}
							horizontal={true}
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
						/>
					</Box>
					<Box flex={5}>
						<FlatList
							scrollEnabled={false}
							data={stores}
							renderItem={storesViews}
							keyExtractor={(item, index) => item._id.toString()}
							style={{ width: '100%' }}
							ListEmptyComponent={() => renderEmptyContainer(0, 'List is empty')}
							contentContainerStyle={!stores?.length && styles.contentContainerStyle}
						/>
					</Box>
				</Box>
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

export default HomeS;
