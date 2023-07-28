import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box, Image, Text} from "native-base";
import AuthStore from "../../store/AuthStore/auth-store";
import likeImg from '../../assets/images/likeGreen.png'
import userImg from '../../assets/images/userGreen.png'
import {Dimensions, FlatList, StyleSheet, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {colors} from "../../assets/colors/colors";
import EmptyList from "../../components/list-viewer/empty-list";
import SubCategoriesViewer from "../../components/list-viewer/CategoriesViewer";
import StoresViewer from "../../components/list-viewer/StoresViewer";
import rootStore from "../../store/RootStore/root-store";
import {CategoryType} from "../../api/categoriesApi";
import {routerConstants} from "../../constants/routerConstants";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import SearchStores from "../../components/SearchStores";
import {getFormattedAddress} from "../../components/MapViews/utils";
import {StoreType} from "../../api/storesApi";

type TouchableWrappedProps = TouchableOpacityProps & {
    children: JSX.Element
}
const TouchableWrapped = ({children, ...rest}: TouchableWrappedProps) => {
    return <TouchableOpacity {...rest}>
        {children}
    </TouchableOpacity>
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

    const formatted_address = getFormattedAddress(user?.address)

    const categoriesViews = ({item}: { item: CategoryType }) => {
        const onPressCategory = () => {
            setSelectedSubCategoryId(item._id)
            StoresService.searchStores({categoryId: item._id})
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
        const test = favoriteStores.some((test1) => test1._id === item._id)
        return (
            <StoresViewer
                checkFavoriteStore={test}
                onPressSaveFavoriteStore={onPressSaveFavoriteStore}
                onPressRemoveFavoriteStore={onPressRemoveFavoriteStore}
                user={user}
                onPress={onPress}
                stores={item}
            />
        )
    }
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

    useEffect(() => {
        StoresService.getStores()
        CategoriesService.getCategories()
    }, [])
    const onPressFavoriteHandler = () => {
        navigation.navigate(routerConstants.FAVORITE)
    }
    const onPressUserHandler = () => {
        navigation.navigate(routerConstants.PROFILE_USER)
    }
    return (
        <BaseWrapperComponent backgroundColor={colors.white} isKeyboardAwareScrollView={true}>
            <Box>
                <Box paddingX={5} mt={6} mb={2} h={45} w={'100%'} flexDirection={'row'}
                     justifyContent={'space-between'}>
                    <TouchableWrapped onPress={onPressUserHandler}>
                        <Image source={userImg} alt={'user'}/>
                    </TouchableWrapped>
                    <Text fontSize={16} w={'60%'} textAlign={'center'}
                          fontWeight={'600'}>{formatted_address}</Text>
                    <TouchableWrapped onPress={onPressFavoriteHandler}>
                        <Image source={likeImg} alt={'like'}/>
                    </TouchableWrapped>
                </Box>

                <Box mt={2} w={'100%'} backgroundColor={colors.white} borderTopLeftRadius={16}
                     borderTopRightRadius={16}>
                    <SearchStores selectedSubCategoryId={selectedSubCategoryId}/>

                    <Box mt={5} marginX={2} mb={2}>
                        <FlatList
                            data={categories}
                            renderItem={categoriesViews}
                            keyExtractor={(item, index) => index.toString()}
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
                    <Box>
                        <FlatList
                            data={stores}
                            renderItem={storesViews}
                            keyExtractor={(item, index) => item._id}
                            style={{width: '100%'}}
                            ListEmptyComponent={() => renderEmptyContainer(Dimensions.get('window').height, 'List is empty')}
                            contentContainerStyle={
                                !stores?.length ? styles.contentContainerStyle : {width: '100%', flex: 1}
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
