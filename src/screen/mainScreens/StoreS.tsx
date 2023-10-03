import React, { useCallback, useEffect, useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import arrowLeftBack from '../../assets/images/arrow-left-back.png'
import { Box, Text } from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { colors } from '../../assets/colors/colors'
import Button from '../../components/Button'
import { Dimensions, FlatList, ImageBackground, StyleSheet } from 'react-native'
import SubCategoriesViewer from '../../components/list-viewer/CategoriesViewer'
import { renderEmptyContainer } from '../../components/list-viewer/empty-list'
import { observer } from 'mobx-react-lite'
import rootStore from '../../store/RootStore/root-store'
import ProductViewer from '../../components/list-viewer/ProductViewer'
import { SubCategoryType } from '../../api/subCategoriesApi'
import { ProductType } from '../../api/productApi'
import PopUpProduct from '../../components/modalPopUp/PopUpProduct'
import { CartType } from '../../store/CartStore/cart-store'
import PopUpAboutStore from '../../components/modalPopUp/PopUpAboutStore'
import { formatProductPrice } from '../../components/MapViews/utils'
import { routerConstants } from '../../constants/routerConstants'
import { getTotalSumProductsCart, updateValueCartProducts } from '../../utils/utilsCart'
import * as Animatable from 'react-native-animatable'
import { createAlert } from '../../components/Alert'

type StoreSProps = {
	navigation: NavigationProp<ParamListBase>
}
const StoreS = observer(({ navigation }: StoreSProps) => {
	const { StoresStore, CartStore } = rootStore
	const { cart, setToCartStore, setPromoCode, addProductToCart, updateProduct } = CartStore
	const { store, allProductStore, getAndSetAllProduct, chosenSubCategory, setChosenSubCategory } =
		StoresStore
	const navigate = useNavigation()

	useEffect(() => {
		/*	const newCart: CartType = {
			idStore: store._id,
			storeName: store.name,
			deliviryTime: store.deliveryTime,
			totalSum: 0,
			products: [],
		}
		if (!cart?.idStore) {
			setToCartStore(newCart)
		}*/
		getAndSetAllProduct(store.subCategories)
		return () => {
			getAndSetAllProduct([])
			setChosenSubCategory(null)
		}
	}, [])

	const [isShowModalProduct, setIsShowModalProduct] = useState<boolean>(false)
	const [isShowModalAboutStore, setIsShowModalAboutStore] = useState<boolean>(false)

	const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryType | null>()
	const [selectedProduct, setSelectedProduct] = useState<ProductType>()
	const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>('')
	useEffect(() => {
		if (chosenSubCategory) {
			setSelectedSubCategory(chosenSubCategory)
			// @ts-ignore
			setSelectedSubCategoryId(chosenSubCategory?._id)
		}
	}, [chosenSubCategory])
	const currentValueToCartProduct = cart?.products?.find(
		(product) => product?._id === selectedProduct?._id
	)
	const totalSumCart = formatProductPrice(cart?.totalSum ?? 0)
	const onPressGoBack = () => {
		navigate.goBack()
	}
	const onPressAboutStore = () => {
		setIsShowModalAboutStore(true)
	}
	const onClosePopUpAboutStore = () => {
		setIsShowModalAboutStore(false)
	}
	const onPressConfirmButton = () => {
		navigation.navigate(routerConstants.CART)
	}
	const onClosePopUpProduct = () => {
		setIsShowModalProduct(false)
	}
	const saveProductToCarts = (productValue, currentProduct) => {
		const findProduct = cart?.products?.find((product) => product._id === currentProduct._id)
		if (findProduct) {
			updateProduct(currentProduct, productValue)
			return
		}
		if (!cart?.storeName) {
			setNewCart()
		}
		addProductToCart(currentProduct, productValue)
	}
	const setNewCart = () => {
		const newCart: CartType = {
			idStore: store._id,
			storeName: store.name,
			deliviryTime: store.deliveryTime,
			totalSum: 0,
			products: [],
		}
		setToCartStore(newCart)
	}
	const shoppingCartMatching = (productValue, product) => {
		const onPressClearCart = () => {
			setPromoCode(null)
			setNewCart()
			saveProductToCarts(productValue, product)
		}
		const onPressGoToCart = () => {
			navigation.navigate(routerConstants.CART)
		}
		createAlert({
			title: 'Message',
			message: 'Need to empty your cart for a new order',
			buttons: [
				{ text: 'Go to cart', style: 'default', onPress: onPressGoToCart },
				{ text: 'Continue', style: 'default', onPress: onPressClearCart },
			],
		})
	}
	const saveProductValueToCart = (productValue: number) => {
		const checkCartStore = cart?.idStore && cart?.idStore !== store._id
		if (checkCartStore) {
			shoppingCartMatching(productValue, selectedProduct)
			return
		}
		saveProductToCarts(productValue, selectedProduct)
	}
	const productViews = useCallback(
		({ item, index }: { item: ProductType; index: number }) => {
			const onPressProduct = () => {
				setSelectedProduct(item)
				setIsShowModalProduct(true)
			}
			const saveProductToCart = (productValue: number) => {
				const checkCartStore = cart?.idStore && cart?.idStore !== store._id
				if (checkCartStore) {
					shoppingCartMatching(productValue, item)
					return
				}
				if (productValue > 100) return
				saveProductToCarts(productValue, item)
			}

			return (
				<ProductViewer
					key={item._id}
					currentCartStore={cart}
					saveProductToCart={saveProductToCart}
					onPressProduct={onPressProduct}
					product={item}
				/>
			)
		},
		[cart, store._id]
	)

	const sebCategoriesViews = useCallback(
		({ item }: { item: SubCategoryType }) => {
			const onPressSelectedSubCategory = () => {
				const isCurrentChosenSubCategory = item._id === selectedSubCategoryId
				if (isCurrentChosenSubCategory) {
					setSelectedSubCategory(null)
					setSelectedSubCategoryId('')
					return
				}
				setSelectedSubCategory(item)
				setSelectedSubCategoryId(item?._id)
			}
			return (
				<SubCategoriesViewer<SubCategoryType>
					selectedSubCategoryId={selectedSubCategoryId}
					onPress={onPressSelectedSubCategory}
					subCategory={item}
				/>
			)
		},
		[selectedSubCategoryId]
	)
	const [isLoaded, setIsLoaded] = useState(false)
	const currentProducts = selectedSubCategory?.products ?? allProductStore
	return (
		<>
			<BaseWrapperComponent backgroundColor={'white'} isKeyboardAwareScrollView={true}>
				<Box>
					<Box w={'100%'} minHeight={239} flex={1}>
						{!isLoaded && (
							<Animatable.View
								animation="pulse"
								iterationCount="infinite"
								style={{
									position: 'absolute',
									zIndex: 2,
									width: '100%',
									aspectRatio: 351 / 225,
									backgroundColor: colors.grayWhite,
								}}
							/>
						)}
						<Box mt={5} mb={5} zIndex={3} position={'absolute'} left={5}>
							<ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack} />
						</Box>
						<ImageBackground
							onLoad={() => setIsLoaded(true)}
							alt={'shop-image'}
							source={{ uri: store.image }}
							style={{
								width: '100%',
								aspectRatio: 351 / 239,
								borderRadius: 16,
							}}
						>
							<Box
								flex={1}
								w={'100%'}
								alignItems={'center'}
								flexDirection={'row'}
								justifyContent={'space-between'}
							>
								<Box ml={4} mt={5} justifyContent={'flex-start'}>
									<Text
										color={colors.grayLightWhite}
										style={styles.textWithShadow}
										fontWeight={'700'}
										fontSize={28}
									>
										{store?.name}
									</Text>
								</Box>
								<Box position={'absolute'} bottom={10} right={5}>
									<Button
										backgroundColor={colors.grayDarkLight}
										styleText={{ color: colors.white, ...styles.textWithShadow }}
										onPress={onPressAboutStore}
										title={'About store'}
									/>
								</Box>
							</Box>
						</ImageBackground>
					</Box>
					<Box
						w={'100%'}
						position={'relative'}
						top={-30}
						backgroundColor={colors.white}
						borderTopLeftRadius={16}
						borderTopRightRadius={16}
					>
						<Box paddingX={2} mt={3} mb={3}>
							<FlatList
								extraData={selectedSubCategoryId}
								data={store.subCategories}
								renderItem={sebCategoriesViews}
								keyExtractor={(item, index) => item?._id.toString()}
								style={{ width: '100%' }}
								contentContainerStyle={!store.subCategories?.length && styles.contentContainerOrder}
								ListEmptyComponent={() => renderEmptyContainer(0, '')}
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
							/>
						</Box>
						<Box ml={3} mb={4}>
							<Text fontSize={24} fontWeight={'700'}>
								{selectedSubCategory?.name ?? 'All products'}
							</Text>
						</Box>

						<Box mb={10}>
							<FlatList
								scrollEnabled={false}
								data={selectedSubCategory?.products ?? allProductStore}
								horizontal={false}
								renderItem={productViews}
								style={{ width: '100%' }}
								ListEmptyComponent={() =>
									renderEmptyContainer(Dimensions.get('window').height, 'List is empty')
								}
								numColumns={2}
								columnWrapperStyle={{ justifyContent: 'space-between' }}
								contentContainerStyle={
									!selectedSubCategory?.products.length &&
									!allProductStore.length &&
									styles.contentContainerStyleProducts
								}
							/>
							{/*{currentProducts?.map((item, index) => {
								return productViews({ item: item, index: index })
							})}*/}
						</Box>
					</Box>
				</Box>
			</BaseWrapperComponent>
			{!!cart?.totalSum && (
				<Box
					style={styles.shadow}
					position={'absolute'}
					borderTopRightRadius={16}
					borderTopLeftRadius={16}
					height={90}
					justifyContent={'center'}
					w={'100%'}
					bottom={0}
				>
					<Box w={'100%'} height={54} paddingX={2}>
						<Button
							backgroundColor={colors.green}
							styleContainer={styles.styleContainer}
							onPress={onPressConfirmButton}
						>
							<Box
								flexDirection={'row'}
								alignItems={'center'}
								flex={1}
								w={'100%'}
								justifyContent={'space-between'}
							>
								<Text style={styles.styleTextBtn}>฿ {formatProductPrice(cart?.totalSum)}</Text>
								<Text color={colors.white} fontWeight={'700'} fontSize={16}>
									Confirm
								</Text>
								<Text style={styles.styleTextBtn}>{store?.deliveryTime} min</Text>
							</Box>
						</Button>
					</Box>
				</Box>
			)}

			<PopUpProduct
				onPressGoToCardHandler={onPressConfirmButton}
				totalSumCart={totalSumCart}
				saveProductValueToCart={saveProductValueToCart}
				currentValueToCartProduct={currentValueToCartProduct}
				product={selectedProduct}
				onClose={onClosePopUpProduct}
				show={isShowModalProduct}
			/>
			<PopUpAboutStore
				currentStore={store}
				show={isShowModalAboutStore}
				onClose={onClosePopUpAboutStore}
			/>
		</>
	)
})
const styles = StyleSheet.create({
	textWithShadow: {
		fontWeight: 'bold',
		textShadowColor: 'black',
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 2,
	},
	contentContainerOrder: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentContainerStyleProducts: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	styleContainer: {
		height: 54,
	},
	styleTextBtn: {
		fontWeight: '600',
		fontSize: 14,
		color: colors.white,
	},
	shadow: {
		backgroundColor: colors.white,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 18,
		},
		shadowOpacity: 0.25,
		shadowRadius: 10.0,
		elevation: 24,
	},
})

export default StoreS
