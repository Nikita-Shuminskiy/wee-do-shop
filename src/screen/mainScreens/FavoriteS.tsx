import React, {useEffect} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {observer} from "mobx-react-lite";
import AuthStore from "../../store/AuthStore/auth-store";
import {Box, Text} from "native-base";
import {StoreType} from "../../api/storesApi";
import {routerConstants} from "../../constants/routerConstants";
import StoresViewer from "../../components/list-viewer/StoresViewer";
import EmptyList from "../../components/list-viewer/empty-list";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Dimensions, FlatList, StyleSheet} from "react-native";
import rootStore from "../../store/RootStore/root-store";

type FavoriteSType = {
    navigation: NavigationProp<ParamListBase>
}
const FavoriteS = observer(({navigation}: FavoriteSType) => {
        const {user} = AuthStore
        const {StoresStore} = rootStore
        const {setStore} = StoresStore
        useEffect(() => {
            AuthStore.getUser(user._id)
        }, [])
        const storesViews = ({item}: { item: StoreType }) => {
            const onPress = () => {
                setStore(item)
                navigation.navigate(routerConstants.STORE)
            }
            const onPressSaveFavoriteStore = () => {

            }
            const onPressRemoveFavoriteStore = () => {

            }
            return (
                <StoresViewer
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

        return (
            <BaseWrapperComponent>
                <FlatList
                    data={user.favoritesStores}
                    renderItem={storesViews}
                    keyExtractor={(item, index) => index.toString()}
                    style={{width: '100%'}}
                    ListEmptyComponent={() => renderEmptyContainer(Dimensions.get('window').height, 'List is empty')}
                    contentContainerStyle={
                        !user.favoritesStores?.length ? styles.contentContainerStyle : null
                    }
                />
            </BaseWrapperComponent>
        );
    }
)
const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default FavoriteS;
