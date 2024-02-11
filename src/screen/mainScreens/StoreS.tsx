import React, {useCallback, useEffect, useMemo, useState} from "react"
import {BaseWrapperComponent} from "../../components/baseWrapperComponent"
import arrowLeftBack from "../../assets/images/arrow-left-back.png"
import {Box, Text} from "native-base"
import ArrowBack from "../../components/ArrowBack"
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native"
import {colors} from "../../assets/colors/colors"
import Button from "../../components/Button"
import {Dimensions, FlatList, ImageBackground, StyleSheet} from "react-native"
import SubCategoriesViewer from "../../components/list-viewer/CategoriesViewer/CategoriesViewer"
import {renderEmptyContainer} from "../../components/list-viewer/empty-list"
import {observer} from "mobx-react-lite"
import rootStore from "../../store/RootStore/root-store"
import ProductViewer from "../../components/list-viewer/ProductViewer"
import {SubCategoryType} from "../../api/subCategoriesApi"
import {ProductType} from "../../api/productApi"
import PopUpProduct from "../../components/modalPopUp/PopUpProduct"
import PopUpAboutStore from "../../components/modalPopUp/PopUpAboutStore"
import {formatProductPrice} from "../../components/MapViews/utils"
import {routerConstants} from "../../constants/routerConstants"
import * as Animatable from "react-native-animatable"
import {createAlert} from "../../components/Alert"
import {isCurrentTimeWorkStoreRange} from "../../utils/utils"
import {alertStoreClosed} from "../../components/list-viewer/utils"
import AuthStore from "../../store/AuthStore/auth-store"
import { useTranslation } from "react-i18next";
import { Skeleton } from "moti/skeleton";
import { SkeletonCommonProps } from "../../utils/common";
import Spacer from "../../components/Specer";
import ShopsSkeleton from "../../components/list-viewer/ShopsViewer/ShopsSkeleton";

type StoreSProps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}
const StoreS = observer(({navigation, route}: StoreSProps) => {
	const {t} = useTranslation(['store', 'common']);
	const {StoresStore, CartStore, StoresService, CartService} = rootStore
	const {cart, setPromoCode, removeCart} = CartStore
	const {store, allProductStore, chosenSubCategory, setStore, isOpenStoreNow} = StoresStore
	const {isAuth} = AuthStore


	const [isShowModalProduct, setIsShowModalProduct] = useState<boolean>(false)
	const [isShowModalAboutStore, setIsShowModalAboutStore] = useState<boolean>(false)
	const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryType | null>()
	const [selectedProduct, setSelectedProduct] = useState<ProductType>()
	const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>("")
	const [isLoadStore, setIsLoadStore] = useState<boolean>(true)

	useEffect(() => {
/*		if(route?.params?.storeId) {
			StoresService.getStore(route?.params?.storeId).finally(() => {
				setIsLoadStore(true)
			})
		}*/
		return () => {
			setStore(null)
		}
	}, []);

	useEffect(() => {
		if (chosenSubCategory) {
			setSelectedSubCategory(chosenSubCategory)

			setSelectedSubCategoryId(chosenSubCategory?._id)
		}
	}, [chosenSubCategory])
	const modalLoginHandler = () => {
		const onPressGoLogin = () => {
			navigation.navigate(routerConstants.LOGIN)
		}
		createAlert({
			title: t('common:message'),
			message: t('youNeedRegister'),
			buttons: [
				{text: t('goLogin'), style: "cancel", onPress: onPressGoLogin},
				{text: t('common:exit'), style: "cancel"},
			],
		})
		return
	}
	const onPressGoBack = () => {
		navigation.goBack()
	}
	const onPressAboutStore = useCallback(() => {
		setIsShowModalAboutStore(true)
	}, [])
	const onClosePopUpAboutStore = useCallback( () => {
		setIsShowModalAboutStore(false)
	}, [])
	const onPressConfirmButton =  useCallback(() => {
		if (!cart?.products?.length) {
			return
		}
		navigation.navigate(routerConstants.CART)
	}, [cart?.products?.length])
	const onClosePopUpProduct = useCallback(() => {
		setIsShowModalProduct(false)
	}, [])

	const onPressSelectedSubCategory = useCallback((item) => {
		if(item._id === selectedSubCategoryId) return
		setSelectedSubCategory(item)
		setSelectedSubCategoryId(item._id)
	}, [])
	const sebCategoriesViews = useCallback(
		({item}: {item: SubCategoryType}) => {
			return (
				<SubCategoriesViewer
					isChosen={selectedSubCategoryId === item._id}
					onPress={onPressSelectedSubCategory}
					subCategory={item}
				/>
			)
		},
		[selectedSubCategoryId]
	)
	const onPressProduct = useCallback((product: ProductType) => {
		setSelectedProduct(product)
		setIsShowModalProduct(true)
	}, [])
	const saveProductValueToCart = (productValue: number) => {
		if (!isOpenStoreNow) {
			alertStoreClosed()
			removeCart()
			return
		}
		CartService.saveProductToCart(selectedProduct, productValue, store)
	}

	const saveProductToCart = useCallback((productValue: number, product: ProductType) => {
		if (!isAuth) return modalLoginHandler()
		if (!isOpenStoreNow) {
			alertStoreClosed()
			removeCart()
			return
		}
		if (productValue > 100) return

		CartService.saveProductToCart(product, productValue, store)
	}, [])

	const productViews = useCallback(
		({item, index}: {item: ProductType; index: number}) => {
			const currentCartProduct = cart?.products?.find(
				(cartProduct) => cartProduct?._id === item._id
			)
			return (
				<ProductViewer
					isAuth={isAuth}
					currentCartProductAmount={currentCartProduct?.amount}
					key={item?._id}
					saveProductToCart={saveProductToCart}
					onPressProduct={onPressProduct}
					product={item}
				/>
			)
		},
		[cart]
	)
	const onRefreshHandler = useCallback(() => {
		setIsLoadStore(false)
		StoresService.getStore(store._id, false).finally(() => {
			setIsLoadStore(true)
		})
	}, [store?._id])

	return (
		<>
			<BaseWrapperComponent
				onRefreshHandler={onRefreshHandler}
				backgroundColor={"white"}
				isKeyboardAwareScrollView={!!store?.subCategories}
			>
				<Box>
					<Box w={"100%"} minHeight={239} flex={1}>
						<Box mt={5} mb={5} zIndex={30} position={"absolute"} left={5}>
							<ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack} />
						</Box>
						{
							isLoadStore ?  	<ImageBackground
								alt={"shop-image"}
								source={{uri: store?.image}}
								style={{
									width: "100%",
									aspectRatio: 351 / 239,
									borderRadius: 16,
								}}
							>
								<Box
									flex={1}
									w={"100%"}
									position={"absolute"}
									bottom={10}
									alignItems={"center"}
									flexDirection={"row"}
									justifyContent={"space-between"}
								>
									<Box
										ml={2}
										borderRadius={10}
										maxWidth={200}
										paddingY={2}
										paddingX={3}
										backgroundColor={`rgba(192, 188, 188, 0.44)`}
										justifyContent={"flex-start"}
									>
										<Text
											color={colors.grayLightWhite}
											style={{fontSize: 20, ...styles.textWithShadow}}
											fontWeight={"700"}
										>
											{store?.name}
										</Text>
									</Box>

									<Box mr={2}>
										<Button
											backgroundColor={"transparent"}
											styleText={{fontSize: 14, color: colors.white, ...styles.textWithShadow}}
											onPress={onPressAboutStore}
											title={t('aboutStore')}
										/>
									</Box>
								</Box>
							</ImageBackground> :
								<Skeleton height={190} width={'100%'} show={true} { ...SkeletonCommonProps } >
									<Box justifyContent={'space-between'} mb={2} flexDirection={'row'} alignItems={'flex-end'} flex={1} w={'100%'}>
										<Box pl={2}>
											<Skeleton height={20} width={100} {...SkeletonCommonProps} />
										</Box>
										<Box pr={2} >
											<Skeleton height={20} width={80} {...SkeletonCommonProps}  />
										</Box>
									</Box>
								</Skeleton>
						}

					</Box>
					<Box
						w={"100%"}
						position={"relative"}
						top={-30}
						backgroundColor={colors.white}
						borderTopLeftRadius={16}
						borderTopRightRadius={16}
					>
						<Box paddingX={2} mt={3} mb={3}>
							{
								isLoadStore ?	<FlatList
									extraData={selectedSubCategoryId}
									data={store?.subCategories}
									renderItem={sebCategoriesViews}
									keyExtractor={(item, index) => item?._id.toString()}
									style={{width: "100%"}}
									contentContainerStyle={!store?.subCategories?.length && styles.contentContainerOrder}
									ListEmptyComponent={() => renderEmptyContainer(0, "")}
									horizontal={true}
									showsHorizontalScrollIndicator={false}
									showsVerticalScrollIndicator={false}
								/> :
									<Box flexDirection={'row'}>
										<Box mr={2}>
											<Skeleton height={20} width={50} show={true} { ...SkeletonCommonProps } />
										</Box>
										<Box mr={2}>
											<Skeleton height={20} width={50} show={true} { ...SkeletonCommonProps } />
										</Box>
										<Box mr={2}>
											<Skeleton height={20} width={50} show={true} { ...SkeletonCommonProps } />
										</Box>
									</Box>
							}
						</Box>
						<Box ml={3} mb={4}>
							<Text fontSize={24} fontWeight={"700"}>
								{selectedSubCategory?.name ?? "All products"}
							</Text>
						</Box>
						<Box mb={20} h={"100%"}>
							{
								isLoadStore && !!store ?
									<FlatList
									scrollEnabled={false}
									data={selectedSubCategory?.products ?? allProductStore}
									horizontal={false}
									renderItem={productViews}
									keyExtractor={(item, index) => item?._id}
									style={{width: "100%"}}
									ListEmptyComponent={() =>
										renderEmptyContainer(Dimensions.get("window").height, t('common:listEmpty'))
									}
									numColumns={2}
									columnWrapperStyle={{justifyContent: "space-between"}}
									contentContainerStyle={
										!selectedSubCategory?.products?.length &&
										!allProductStore.length &&
										styles.contentContainerStyleProducts
									}
								/> :
								<ShopsSkeleton/>
							}
						</Box>
					</Box>
				</Box>
			</BaseWrapperComponent>
			{!!cart?.totalSum && (
				<Box
					style={styles.shadow}
					position={"absolute"}
					borderTopRightRadius={16}
					borderTopLeftRadius={16}
					height={100}
					justifyContent={"center"}
					w={"100%"}
					bottom={0}
				>
					<Box w={"100%"} height={54} paddingX={2}>
						<Button
							backgroundColor={colors.green}
							styleContainer={styles.styleContainer}
							onPress={onPressConfirmButton}
						>
							<Box
								flexDirection={"row"}
								alignItems={"center"}
								flex={1}
								w={"100%"}
								justifyContent={"space-between"}
							>
								<Text style={styles.styleTextBtn}>฿ {formatProductPrice(cart?.totalSum)}</Text>
								<Text color={colors.white} fontWeight={"700"} fontSize={16}>
									{t('common:confirm')}
								</Text>
								<Text style={styles.styleTextBtn}>{store?.deliveryTime} {t('min')}</Text>
							</Box>
						</Button>
					</Box>
				</Box>
			)}

			<PopUpProduct
				isOpenStoreNow={isOpenStoreNow}
				onPressGoToCardHandler={onPressConfirmButton}
				saveProductValueToCart={saveProductValueToCart}
				product={selectedProduct}
				onClose={onClosePopUpProduct}
				show={isShowModalProduct}
			/>
			<PopUpAboutStore
				currentStore={store}
				isOpenStoreNow={isOpenStoreNow}
				show={isShowModalAboutStore}
				onClose={onClosePopUpAboutStore}
			/>
		</>
	)
})
const styles = StyleSheet.create({
	textWithShadow: {
		fontWeight: "bold",
		textShadowColor: "black",
		textShadowOffset: {width: -1, height: 2},
		textShadowRadius: 2,
	},
	contentContainerOrder: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	contentContainerStyleProducts: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	styleContainer: {
		height: 54,
	},
	styleTextBtn: {
		fontWeight: "600",
		fontSize: 14,
		color: colors.white,
	},
	shadow: {
		backgroundColor: colors.white,
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 18,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10.0,
		elevation: 24,
	},
})

export default StoreS;
