import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box} from "native-base";
import AuthStore from "../../store/AuthStore/auth-store";
import {Dimensions, FlatList, StyleSheet, TouchableOpacityProps} from "react-native";
import {colors} from "../../assets/colors/colors";
import EmptyList from "../../components/list-viewer/empty-list";
import SubCategoriesViewer from "../../components/list-viewer/CategoriesViewer";
import StoresViewer from "../../components/list-viewer/StoresViewer";
import rootStore from "../../store/RootStore/root-store";
import {CategoryType} from "../../api/categoriesApi";
import {routerConstants} from "../../constants/routerConstants";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import SearchStores from "../../components/SearchStores";
import {StoreType} from "../../api/storesApi";
import HeaderUser from "../../components/headerUser";
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
type HomeSProps = {
    navigation: NavigationProp<ParamListBase>
}
const HomeS = observer(({navigation}: HomeSProps) => {
    const {user} = AuthStore
    const {StoresService, StoresStore, CategoriesService, CategoriesStore} = rootStore
    const {stores, setStore, favoriteStores} = StoresStore
    const {categories} = CategoriesStore
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>('');


    const categoriesViews = ({item}: { item: CategoryType }) => {
        const onPressCategory = () => {
            const isCurrentChosenSubCategory= item._id === selectedSubCategoryId
            if (isCurrentChosenSubCategory) {
                setSelectedSubCategoryId('')
            } else {
                setSelectedSubCategoryId(item._id)
            }

            StoresService.searchStores({categoryId: isCurrentChosenSubCategory? '' : item._id})
        }
        return (
            <SubCategoriesViewer<CategoryType>
                selectedSubCategoryId={selectedSubCategoryId}
                onPress={onPressCategory}
                subCategory={item}
            />
        )
    }
    const storesViews = ({item}: { item: StoreType }) => {
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
    }, [])

    return (
        <BaseWrapperComponent backgroundColor={colors.white} isKeyboardAwareScrollView={!!stores?.length}>
            <Box w={'100%'} flex={1} >
                <HeaderUser
                    address={user?.address}
                    navigation={navigation}
                />
                <Box mt={2} w={'100%'} flex={1}  borderTopLeftRadius={16}
                     borderTopRightRadius={16}>
                    <SearchStores selectedSubCategoryId={selectedSubCategoryId}/>

                    <Box mt={5} marginX={2} mb={2} w={'100%'} flex={1}>
                        <FlatList
                            data={categories}
                            renderItem={categoriesViews}
                            keyExtractor={(item, index) => item._id.toString()}
                            style={{width: '100%'}}
                            contentContainerStyle={
                                !categories?.length && styles.contentContainerStyle
                            }
                            ListEmptyComponent={() => renderEmptyContainer(0, '')}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </Box>
                    <Box flex={5} >
                        <FlatList
                            scrollEnabled={false}
                            data={stores}
                            renderItem={storesViews}
                            keyExtractor={(item, index) => item._id.toString()}
                            style={{width: '100%'}}
                            ListEmptyComponent={() => renderEmptyContainer(0, 'List is empty')}
                            contentContainerStyle={
                                !stores?.length && styles.contentContainerStyle
                            }
                        />
                    </Box>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
});
const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HomeS;
