import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import * as Location from 'expo-location';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent"
import {Box, ScrollView} from "native-base"
import AuthStore from "../../store/AuthStore/auth-store"
import {Dimensions, FlatList, StyleSheet} from "react-native"
import {colors} from "../../assets/colors/colors"
import {renderEmptyContainer} from "../../components/list-viewer/empty-list"
import SubCategoriesViewer from "../../components/list-viewer/CategoriesViewer"
import StoresViewer from "../../components/list-viewer/StoresViewer"
import rootStore from "../../store/RootStore/root-store"
import {routerConstants} from "../../constants/routerConstants"
import {NavigationProp, ParamListBase} from "@react-navigation/native"
import SearchStores from "../../components/SearchStores"
import {StoreType} from "../../api/storesApi"
import HeaderUser from "../../components/headerUser"
import Carousel from "react-native-snap-carousel"
import {BannersType} from "../../api/userApi"
import BannersViewer from "../../components/list-viewer/BannersViewer"
import {createAlert} from "../../components/Alert"
import NotificationStore from "../../store/NotificationStore/notification-store"
import {LoadingEnum} from "../../store/types/types"

type HomeSProps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}

const HomeS = observer(({navigation, route}: HomeSProps) => {
	const {user, banners, isAuth} = AuthStore
	const {setIsLoading} = NotificationStore

	const {StoresService, StoresStore, CategoriesService, CategoriesStore} = rootStore
	const {stores, setStore, favoriteStores, search, setSearch, setSelectedSubCategoryId} =
		StoresStore
	const {categories} = CategoriesStore
	const carouselRef = useRef<any>(null)
	const [chosenSubCategoryId, setChosenSubCategoryId] = useState("")
	const [favoritesStores, setFavoritesStores] = useState<string[]>([])

	const bannersView = useCallback(({item}: {item: BannersType}) => {
		return <BannersViewer image={item.image} />
	}, [])

	const onPressCategory = useCallback((item) => {
		setChosenSubCategoryId((prevState) => {
			StoresService.searchStores({categoryId: prevState === item._id ? "" : item._id})
			setSelectedSubCategoryId(prevState === item._id ? "" : item._id)
			return prevState === item._id ? "" : item._id
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

	const onPress = useCallback((store: StoreType) => {
		StoresService.getStore(store._id).then((data) => {
			if (data) {
				navigation.navigate(routerConstants.STORE)
			}
		})
	}, [])

	const storesViews = useCallback(
		({item}: {item: StoreType}) => {
			return (
				<StoresViewer
					isFavorite={favoritesStores?.some((storeId) => storeId === item._id)}
					isAuth={isAuth}
					onPressToggleFavoriteStore={onPressToggleFavoriteStore}
					onPress={onPress}
					stores={item}
				/>
			)
		},
		[favoritesStores, isAuth]
	)
	const getFavoriteStores = () => {
		StoresService.getFavoriteStores().then((data) => {
			setFavoritesStores(data?.map((el) => el._id))
		})
	}

	const getHomeData = async () => {
		CategoriesService.getCategories()
		StoresService.getStores()
		getFavoriteStores()
	}

	useLayoutEffect(() => {
		getHomeData()
		return () => {
			setFavoritesStores([])
		}
	}, [])
	useEffect(() => {
		if (route.params?.from === "favorite") {
			getFavoriteStores()
		}
	}, [route?.params])

	return (
		<BaseWrapperComponent
			onRefreshHandler={getHomeData}
			backgroundColor={colors.white}
			isKeyboardAwareScrollView={true}
		>
			<Box paddingX={2} w={"100%"} flex={1}>
				<HeaderUser
					address={user?.address}
					setFavoritesStores={() => setFavoritesStores([])}
					navigation={navigation}
				/>
				<Box mt={2} w={"100%"} flex={1} borderTopLeftRadius={16} borderTopRightRadius={16}>
					<SearchStores
						selectCategory={chosenSubCategoryId}
						setSearch={setSearch}
						search={search}
					/>
					<Box mt={5} alignItems={"center"} w={"100%"}>
						<Carousel
							keyExtractor={(item, index) => index.toString()}
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
							renderItem={bannersView}
						/>
					</Box>
					<Box mt={3} mb={3} w={"100%"} flex={1}>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{flexGrow: 1, flexDirection: "row"}}
						>
							{categories?.map((el) => {
								return (
									<SubCategoriesViewer
										key={el._id}
										isChosen={chosenSubCategoryId === el?._id}
										isCategory={true}
										onPress={onPressCategory}
										subCategory={el}
									/>
								)
							})}
						</ScrollView>
					</Box>
					<Box flex={5}>
						<FlatList
							extraData={favoritesStores}
							scrollEnabled={false}
							data={stores}
							renderItem={storesViews}
							keyExtractor={(item, index) => item._id.toString()}
							style={{width: "100%"}}
							ListEmptyComponent={() => renderEmptyContainer(0, "List is empty")}
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
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
})

export default HomeS
