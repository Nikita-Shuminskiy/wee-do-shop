import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react"
import {observer} from "mobx-react-lite"

import {Box} from "native-base"
import AuthStore from "../../store/AuthStore/auth-store"
import {Dimensions, FlatList, StyleSheet} from "react-native"
import {colors} from "../../assets/colors/colors"
import SubCategoriesViewer from "../../components/list-viewer/CategoriesViewer/CategoriesViewer"
import StoresViewer from "../../components/list-viewer/StoresViewer/StoresViewer"
import rootStore from "../../store/RootStore/root-store"
import {routerConstants} from "../../constants/routerConstants"
import {NavigationProp, ParamListBase} from "@react-navigation/native"
import SearchStores from "../../components/SearchStores"
import {StoreType} from "../../api/storesApi"
import HeaderUser from "../../components/headerUser"
import Carousel from "react-native-snap-carousel"
import {BannersType} from "../../api/userApi"
import BannersViewer from "../../components/list-viewer/BannersViewer/BannersViewer"
import useGoBackNative from "../../utils/hook/useGoBackNative"
import {useTranslation} from "react-i18next"
import {renderEmptyContainer} from "../../components/list-viewer/empty-list"
import StoreSkeleton from "../../components/list-viewer/StoresViewer/StoreSkeleton"
import CategoriesSkeleton from "../../components/list-viewer/CategoriesViewer/CategoriesSkeleton"
import BannersSkeleton from "../../components/list-viewer/BannersViewer/BannersSkeleton"
import Link from "../../components/Link"
import arrowUp from "../../assets/images/arrowUp.png"
import {BaseWrapperComponent} from "../../components/baseWrapperComponent"
import useScroll from "../../utils/hook/useScroll"

type HomeSProps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}

const HomeS = observer(({navigation, route}: HomeSProps) => {
	const {scrollRef, setIsScrollHandler, isScroll, scrollTo} = useScroll()
	const {t} = useTranslation(["main", "common"])
	const onPressGoBack = () => {
		navigation.navigate(routerConstants.HOME)
		return true
	}

	useGoBackNative(onPressGoBack)
	const {user, isAuth} = AuthStore
	const {StoresService, StoresStore, CategoriesService, CategoriesStore} = rootStore
	const {stores, search, setSearch, setSelectedSubCategoryId} =
		StoresStore
	const {categories, banners} = CategoriesStore
	const carouselRef = useRef<any>(null)
	const [chosenSubCategoryId, setChosenSubCategoryId] = useState("")
	const [favoritesStores, setFavoritesStores] = useState<string[]>([])

	const [isLoadStores, setIsLoadStores] = useState<boolean>(false)
	const [isLoadCategories, setIsLoadCategories] = useState<boolean>(false)
	const [isLoadBanners, setIsLoadBanners] = useState<boolean>(false)

	const renderBanners = useCallback(({item}: {item: BannersType}) => {
		return <BannersViewer image={item?.image} />
	}, [])
	const onPressCategory = useCallback((item) => {
		setChosenSubCategoryId((prevState) => {
			const checkPrevState = prevState === item._id
			setSearch("")
			setIsLoadStores(false)
			StoresService.searchStores({categoryId: checkPrevState ? "" : item._id}).finally(() => {
				setIsLoadStores(true)
			})
			setSelectedSubCategoryId(checkPrevState ? "" : item._id)
			return checkPrevState ? "" : item._id
		})
	}, [])

	const onPressToggleFavoriteStore = useCallback((storeId) => {
		setFavoritesStores((prevState) => {
			const checkStore = prevState.find((prevS) => prevS === storeId)
			if (checkStore) {
				StoresService.deleteFavoriteStore(storeId)
				return prevState.filter((favStore) => favStore !== storeId)
			} else {
				StoresService.saveFavoriteStore(storeId)
				return [...prevState, storeId]
			}
		})
	}, [])

	const onPressStore = useCallback((store: StoreType) => {
		//navigation.navigate(routerConstants.STORE, { storeId: store._id })
		StoresService.getStore(store._id).then((data) => {
			if (data) {
				navigation.navigate(routerConstants.STORE)
			}
		})
	}, [])

	const getFavoriteStores = async () => {
		await StoresService.getFavoriteStores().then((data) => {
			setFavoritesStores(data?.map((el) => el._id))
		})
	}

	const getHomeData = useCallback(async () => {
		console.log('getHomeData');
		setIsLoadCategories(false)
		setIsLoadBanners(false)
		setIsLoadStores(false)
		CategoriesService.getCategories().finally(() => {
			setIsLoadCategories(true)
		})
		CategoriesService.getBanners().finally(() => {
			setIsLoadBanners(true)
		})
		Promise.all([getFavoriteStores(), StoresService.getStores()]).finally(() => {
			setIsLoadStores(true)
		})
	}, [])
	const clearFavoriteStoresHandler = useCallback(() => setFavoritesStores([]), [])
	useLayoutEffect(() => {
		getHomeData()
		return () => {
			console.log('return');
			clearFavoriteStoresHandler()
		}
	}, [])
	useEffect(() => {
		if (route.params?.from === "favorite") {
			getFavoriteStores()
		}
	}, [route?.params])

	const onSearchStoreHandler = useCallback((text: string) => {
		setSearch(text)
	}, [])
	const renderStores = useCallback(
		({item}: {item: StoreType}) => {
			return (
				<StoresViewer
					isFavorite={favoritesStores?.some((storeId) => storeId === item?._id)}
					isAuth={isAuth}
					onPressToggleFavoriteStore={onPressToggleFavoriteStore}
					onPress={onPressStore}
					stores={item}
				/>
			)
		},
		[favoritesStores, isAuth]
	)
	const renderCategories = useCallback(
		({item, index}) => (
			<SubCategoriesViewer
				isChosen={chosenSubCategoryId === item?._id}
				isCategory={true}
				onPress={onPressCategory}
				subCategory={item}
			/>
		),
		[chosenSubCategoryId]
	)


	return (
		<>
			<BaseWrapperComponent
				ref={scrollRef}
				setIsScroll={setIsScrollHandler}
				onRefreshHandler={getHomeData}
				backgroundColor={colors.white}
				isKeyboardAwareScrollView={true}
			>
				<Box paddingX={2} w={"100%"} flex={1}>
					<HeaderUser
						isAuth={isAuth}
						address={user?.address}
						setFavoritesStores={clearFavoriteStoresHandler}
					/>
					<Box mt={2} w={"100%"} flex={1} borderTopLeftRadius={16} borderTopRightRadius={16}>
						<SearchStores
							setIsLoadStores={setIsLoadStores}
							selectCategory={chosenSubCategoryId}
							setSearch={onSearchStoreHandler}
							search={search}
						/>
						<Box mt={5} alignItems={"center"} w={"100%"}>
							{isLoadBanners ? (
								<Carousel
									keyExtractor={(item, index) => `${item._id}-${index}`}
									ref={carouselRef}
									layout={"default"}
									data={banners}
									sliderWidth={Dimensions.get("window").width}
									itemWidth={353}
									autoplayInterval={5000}
									autoplayDelay={5000}
									shouldOptimizeUpdates={true}
									autoplay={true}
									loop={true}
									renderItem={renderBanners}
								/>
							) : (
								<BannersSkeleton />
							)}
						</Box>
						<Box mt={3} mb={3} w={"100%"} flex={1}>
							{isLoadCategories ? (
								<FlatList
									horizontal
									showsHorizontalScrollIndicator={false}
									data={categories}
									keyExtractor={(item, index) => `${item._id}-${index}`}
									renderItem={renderCategories}
								/>
							) : (
								<CategoriesSkeleton />
							)}
						</Box>
						<Box flex={5}>
							{isLoadStores ? (
								<FlatList
									//	extraData={favoritesStores}
									scrollEnabled={false}
									data={stores}
									renderItem={renderStores}
									keyExtractor={(item, index) => `${item._id}-${index}`}
									style={{width: "100%"}}
									ListEmptyComponent={() => renderEmptyContainer(0, t("common:listEmpty"))}
									contentContainerStyle={!stores?.length && styles.contentContainerStyle}
								/>
							) : (
								<StoreSkeleton />
							)}
						</Box>
					</Box>
				</Box>
			</BaseWrapperComponent>
			{isScroll && (
				<Box position={"absolute"} bottom={"10%"} right={5}>
					<Link onPress={scrollTo} img={arrowUp} styleImg={{width: 42, height: 42}} />
				</Box>
			)}
		</>
	)
})
const styles = StyleSheet.create({
	contentContainerStyle: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
})

export default HomeS
