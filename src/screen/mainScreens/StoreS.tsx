import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import arrowLeftBack from '../../assets/images/arrow-left-back.png'
import testBackground from '../../assets/images/testBackground.png'
import photoTest from '../../assets/images/photoTest.png'
import {Box, Image, Text} from "native-base";
import ArrowBack from "../../components/ArrowBack";
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";
import {colors} from "../../assets/colors/colors";
import Button from "../../components/Button";
import {Dimensions, FlatList, ImageBackground, TouchableOpacity, View} from "react-native";
import {CategoryType} from "../../api/categoriesApi";
import SubCategoriesViewer from "../../components/list-viewer/CategoriesViewer";
import EmptyList from "../../components/list-viewer/empty-list";
import {observer} from "mobx-react-lite";
import rootStore from "../../store/RootStore/root-store";
import ProductViewer from "../../components/list-viewer/ProductViewer";
import {SubCategoryType} from "../../api/subCategoriesApi";
import ModalPopup from "../../components/pop-up";
import {ProductType} from "../../api/productApi";
import PopUpProduct from "../../components/modalPopUp/PopUpProduct";

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

type StoreSProps = {
    navigation: NavigationProp<ParamListBase>
}
const StoreS = observer(({navigation}: StoreSProps) => {
    const navigate = useNavigation()

    const {StoresService, StoresStore, CategoriesService, CategoriesStore} = rootStore
    const {store, setStore} = StoresStore
    const {categories} = CategoriesStore

    const [isConfirmButton, setIsConfirmButton] = useState<boolean>(false)
    const [isShowModalProduct, setIsShowModalProduct] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<ProductType>()

    const [currentCartStore, setCurrentCardStore] = useState()

    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>('');


    const onPressGoBack = () => {
        navigate.goBack()
    }
    const onPressAboutStore = () => {

    }
    const onPressConfirmButton = () => {

    }

    const productViews = ({item}: { item: any }) => {
        const onPressProduct = () => {
            setSelectedProduct(item)
            setIsShowModalProduct(true)
        }
        const saveProductToCard = (productValue: number) => {
            //setIsConfirmButton(true)
        }
        return (
            <ProductViewer
                //cartProductValue={currentCartStore}
                saveProductToCart={saveProductToCard}
                onPressProduct={onPressProduct}
                store={item}
            />
        )
    }
    const sebCategoriesViews = ({item}: { item: any }) => {  //SubCategoryType
        const onPressSelectedSubCategory = () => {
            setSelectedSubCategoryId(item?._id);
        }
        return (
            <SubCategoriesViewer
                selectedSubCategoryId={selectedSubCategoryId}
                onPress={onPressSelectedSubCategory}
                category={item}
            />
        )
    }
    const onClosePopUpProduct = () => {
        setIsShowModalProduct(false)
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
                                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                renderItem={sebCategoriesViews}
                                keyExtractor={(item, index) => item.toString()}
                                style={{width: '100%'}}
                                contentContainerStyle={
                                    ![1, 2, 3, 4]?.length && {
                                        flex: 1,
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }
                                }
                                ListEmptyComponent={() => renderEmptyContainer(0, '')}
                                horizontal={true}
                                showsVerticalScrollIndicator={false}
                            />
                        </Box>
                        <Box flex={1}>
                            <FlatList
                                data={[1, 2, 3, 4, 5]}
                                horizontal={false}
                                renderItem={productViews}
                                keyExtractor={(item, index) => index.toString()}
                                style={{width: '100%'}}
                                ListEmptyComponent={() => renderEmptyContainer(Dimensions.get('window').height, 'List is empty')}
                                numColumns={2}
                                columnWrapperStyle={{ justifyContent:'space-between' }}
                                contentContainerStyle={
                                    ![1, 2, 3, 4, 5] ? {
                                        flex: 1,
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    } : null
                                }
                            />
                        </Box>
                    </Box>
                </Box>
                {
                    isConfirmButton && <Box position={'absolute'} flex={1} w={'100%'} bottom={0}>
                        <Button onPress={onPressConfirmButton} title={'Confirm'}/>
                    </Box>
                }
            </BaseWrapperComponent>
            <PopUpProduct onClose={onClosePopUpProduct} show={isShowModalProduct}/>
        </>
    );
});

export default StoreS;
