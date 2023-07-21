import React, {useEffect, useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import arrowLeftBack from '../../assets/images/arrow-left-back.png'
import testBackground from '../../assets/images/testBackground.png'
import {Box, Text} from "native-base";
import ArrowBack from "../../components/ArrowBack";
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";
import {colors} from "../../assets/colors/colors";
import Button from "../../components/Button";
import {Dimensions, FlatList, ImageBackground, StyleSheet} from "react-native";
import SubCategoriesViewer from "../../components/list-viewer/CategoriesViewer";
import EmptyList from "../../components/list-viewer/empty-list";
import {observer} from "mobx-react-lite";
import rootStore from "../../store/RootStore/root-store";
import ProductViewer from "../../components/list-viewer/ProductViewer";
import {SubCategoryType} from "../../api/subCategoriesApi";
import {ProductType} from "../../api/productApi";
import PopUpProduct from "../../components/modalPopUp/PopUpProduct";
import {CartType} from "../../store/CartStore/cart-store";

const renderEmptyContainer = (height, text) => {
    const onPressLink = () => {

    }
    return (
        <EmptyList
            height={height}
            text={text}
            onPressLink={onPressLink}
        />
    )
}
const updateProduct = (currentCartStore, item, productValue, setCurrentCartStore) => {
    const updatedProducts = currentCartStore.products.map((product) => {
        if (product._id === item._id) {
            return {
                ...product,
                productValue: productValue,
            };
        }
        return product;
    });

    const totalSum = updatedProducts.reduce(
        (sum, product) => sum + product.productValue * product.price,
        0
    );
    setCurrentCartStore({
        ...currentCartStore,
        totalSum: totalSum,
        products: updatedProducts,
    });
};
const addProductToCart = (currentCartStore, item, productValue, setCurrentCartStore) => {
    const newProduct = {...item, productValue: productValue}
    setCurrentCartStore({
        ...currentCartStore,
        totalSum: currentCartStore.totalSum ?
            currentCartStore.totalSum + productValue * item.price
            : productValue * item.price,
        products: [...currentCartStore.products, newProduct]
    })
}
type StoreSProps = {
    navigation: NavigationProp<ParamListBase>
}
const StoreS = observer(({navigation}: StoreSProps) => {
    const {StoresStore} = rootStore
    const {store} = StoresStore

    // need get All product for first screen
    const navigate = useNavigation()
    const [currentCartStore, setCurrentCartStore] = useState<CartType>()

    useEffect(() => {
        const newCart: CartType = {
            idStore: store._id,
            totalSum: 0,
            products: []
        }
        setCurrentCartStore(newCart)
    }, [])

    const [isShowModalProduct, setIsShowModalProduct] = useState<boolean>(false)
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryType>()
    const [selectedProduct, setSelectedProduct] = useState<ProductType>()
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>('');
    const currentValueToCartProduct = currentCartStore?.products.find(cart => cart?._id === selectedProduct?._id)

    const onPressGoBack = () => {
        navigate.goBack()
    }
    const onPressAboutStore = () => {

    }
    const onPressConfirmButton = () => {

    }
    const onClosePopUpProduct = () => {
        setIsShowModalProduct(false)
    }
    const saveProductValueToCard = (productValue: number) => {
        const findProduct = currentCartStore.products.find(
            (product) => product._id === selectedProduct._id
        );
        if (findProduct) {
            updateProduct(currentCartStore, selectedProduct, productValue, setCurrentCartStore);
            return;
        }
        addProductToCart(currentCartStore, selectedProduct, productValue, setCurrentCartStore)
    }


    const productViews = ({item}: { item: ProductType }) => {
        const onPressProduct = () => {
            setSelectedProduct(item)
            setIsShowModalProduct(true)
        }

        const saveProductToCard = (productValue: number) => {
            const findProduct = currentCartStore.products.find(
                (product) => product._id === item._id
            );
            if (findProduct) {
                updateProduct(currentCartStore, item, productValue, setCurrentCartStore);
                return;
            }
            addProductToCart(currentCartStore, item, productValue, setCurrentCartStore)
        }

        return (
            <ProductViewer
                currentCartStore={currentCartStore}
                saveProductToCart={saveProductToCard}
                onPressProduct={onPressProduct}
                product={item}
            />
        )
    }
    const sebCategoriesViews = ({item}: { item: SubCategoryType }) => {
        const onPressSelectedSubCategory = () => {
            setSelectedSubCategory(item)
            setSelectedSubCategoryId(item?._id);
        }
        return (
            <SubCategoriesViewer
                selectedSubCategoryId={selectedSubCategoryId}
                onPress={onPressSelectedSubCategory}
                subCategory={item}
            />
        )
    }

    return (
        <>
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <Box>
                    <Box w={'100%'} height={239} flex={1}>
                        <ImageBackground style={{flex: 1, width: '100%'}} alt={'shop-image'} source={testBackground}>
                            <Box mt={5} mb={5} position={'absolute'} left={5}>
                                <ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack}/>
                            </Box>
                            <Box flex={1} w={'100%'} alignItems={'flex-start'} justifyContent={'center'}>
                                <Box ml={4} mt={5} justifyContent={'flex-start'}>
                                    <Text color={colors.white} fontWeight={'700'} fontSize={32}>Simply crafted
                                        store</Text>
                                </Box>
                                <Box position={'absolute'} bottom={7} right={2}>
                                    <Button backgroundColor={'transparent'}
                                            styleContainer={{borderWidth: 1, borderColor: colors.white}}
                                            onPress={onPressAboutStore} title={'About store'}/>
                                </Box>
                            </Box>
                        </ImageBackground>
                    </Box>
                    <Box w={'100%'} position={'relative'} top={-13} backgroundColor={colors.white}
                         borderTopLeftRadius={16}
                         borderTopRightRadius={16}>
                        <Box mt={5} mb={2}>
                            <FlatList
                                extraData={selectedSubCategoryId}
                                data={store.subCategories}
                                renderItem={sebCategoriesViews}
                                keyExtractor={(item, index) => item.toString()}
                                style={{width: '100%'}}
                                contentContainerStyle={
                                    !store.subCategories?.length &&
                                    styles.contentContainerStyleSubCategories
                                }
                                ListEmptyComponent={() => renderEmptyContainer(0, '')}
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                            />
                        </Box>
                        <Box mb={20}>
                            <FlatList
                                data={selectedSubCategory?.products}
                                horizontal={false}
                                renderItem={productViews}
                                keyExtractor={(item, index) => index.toString()}
                                style={{width: '100%'}}
                                ListEmptyComponent={() => renderEmptyContainer(Dimensions.get('window').height, 'List is empty')}
                                numColumns={2}
                                columnWrapperStyle={{justifyContent: 'space-between'}}
                                contentContainerStyle={
                                    !selectedSubCategory?.products &&
                                    styles.contentContainerStyleProducts
                                }
                            />
                        </Box>
                    </Box>
                </Box>

            </BaseWrapperComponent>
            {
                !!currentCartStore?.totalSum && <Box style={styles.shadow}
                                                     position={'absolute'}
                                                     borderTopRightRadius={16}
                                                     borderTopLeftRadius={16}
                                                     height={90}
                                                     justifyContent={'center'} w={'100%'} bottom={0}>
                    <Box w={'100%'} height={54} paddingX={2}>
                        <Button backgroundColor={colors.green}
                                styleContainer={styles.styleContainer}
                                onPress={onPressConfirmButton}>
                            <Box flexDirection={'row'}
                                 alignItems={'center'}
                                 flex={1}
                                 w={'100%'}
                                 justifyContent={'space-between'}>
                                <Text style={styles.styleTextBtn}>฿ {currentCartStore?.totalSum}</Text>
                                <Text color={colors.white} fontWeight={'700'} fontSize={16}>Confirm</Text>
                                <Text style={styles.styleTextBtn}>{store?.deliveryTime} min</Text>
                            </Box>
                        </Button>
                    </Box>
                </Box>
            }
            <PopUpProduct totalSumCart={currentCartStore?.totalSum} saveProductValueToCard={saveProductValueToCard}
                          currentValueToCartProduct={currentValueToCartProduct}
                          product={selectedProduct} onClose={onClosePopUpProduct}
                          show={isShowModalProduct}/>
        </>
    );
});
const styles = StyleSheet.create({
    contentContainerStyleSubCategories: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainerStyleProducts: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    styleContainer: {
        height: 54,
    },
    styleTextBtn: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.white
    },
    shadow: {
        backgroundColor: colors.white,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 18,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10.00,
        elevation: 24
    },
})

export default StoreS;
