import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {observer} from "mobx-react-lite";
import AuthStore from "../../store/AuthStore/auth-store";
import {Box, Text} from "native-base";
import {routerConstants} from "../../constants/routerConstants";
import StoresViewer from "../../components/list-viewer/StoresViewer";
import EmptyList from "../../components/list-viewer/empty-list";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {Dimensions, FlatList, StyleSheet} from "react-native";
import rootStore from "../../store/RootStore/root-store";
import ArrowBack from "../../components/ArrowBack";
import arrowLeftBack from "../../assets/images/arrow-left.png";
import {colors} from "../../assets/colors/colors";
import {StoreTypeLocalType} from "../../store/StoresStore/stores-store";
import {StoreType} from "../../api/storesApi";
import {VirtualizedList} from "../../components/virtualized-list";

type FavoriteSType = {
    navigation: NavigationProp<ParamListBase>
}
const FavoriteS = observer(({navigation}: FavoriteSType) => {
        const {user} = AuthStore
        const {StoresStore, StoresService} = rootStore
        const {setStore, favoriteStores} = StoresStore

        const storesViews = ({item}: { item: StoreType }) => {
            const onPress = () => {
                setStore(item)
                navigation.navigate(routerConstants.STORE)
            }
            const onPressSaveFavoriteStore = () => {

            }
            const onPressRemoveFavoriteStore = () => {
                StoresService.deleteFavoriteStore(item._id)
            }
            return (
                <StoresViewer
                    checkFavoriteStore={true}
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
        const onPressGoBack = () => {
            navigation.goBack()
        }
        return (
            <BaseWrapperComponent isKeyboardAwareScrollView={true}>
                <Box paddingX={2} mt={5}>
                    <Box alignItems={'center'} flexDirection={'row'} mb={10}>
                        <Box mr={5}>
                            <ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack}/>
                        </Box>
                        <Text color={colors.black} fontWeight={'700'} fontSize={32}>Favorite stores</Text>
                    </Box>

                    <FlatList
                        data={favoriteStores}
                        renderItem={storesViews}
                        keyExtractor={(item, index) => index.toString()}
                        style={{width: '100%'}}
                        ListEmptyComponent={() => renderEmptyContainer(Dimensions.get('window').height, 'List is empty')}
                        contentContainerStyle={
                            !favoriteStores?.length ? styles.contentContainerStyle : null
                        }
                    />
                </Box>
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
