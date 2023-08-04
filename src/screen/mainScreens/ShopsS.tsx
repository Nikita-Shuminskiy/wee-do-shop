import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {colors} from "../../assets/colors/colors";
import {Box, Text} from "native-base";
import HeaderUser from "../../components/headerUser";
import SearchStores from "../../components/SearchStores";
import {Dimensions, FlatList, StyleSheet} from "react-native";
import AuthStore from "../../store/AuthStore/auth-store";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {StoreType} from "../../api/storesApi";
import {routerConstants} from "../../constants/routerConstants";
import EmptyList from "../../components/list-viewer/empty-list";
import rootStore from "../../store/RootStore/root-store";
import ShopsViewer from "../../components/list-viewer/ShopsViewer";
import {observer} from "mobx-react-lite";

export type ShopsSType = {
    navigation: NavigationProp<ParamListBase>
}
const ShopsS = observer(({navigation}: ShopsSType) => {

    const {user} = AuthStore
    const {StoresStore} = rootStore
    const {stores, setStore} = StoresStore
    const storesViews = ({item}: { item: StoreType }) => {
        const onPress = () => {
            setStore(item)
            navigation.navigate(routerConstants.STORE)
        }
        return (
            <ShopsViewer
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
        <BaseWrapperComponent backgroundColor={colors.white} isKeyboardAwareScrollView={true}>
            <Box>
                <HeaderUser
                    address={user?.address}
                    navigation={navigation}
                />
                <Box mt={2} w={'100%'} backgroundColor={colors.white} borderTopLeftRadius={16}
                     borderTopRightRadius={16}>
                    <SearchStores/>
                    <Text ml={4} mt={2} mb={2} fontSize={24} fontWeight={'500'}>Shops near you</Text>
                    <Box mb={20}>
                        <FlatList
                            numColumns={2}
                            contentContainerStyle={
                                !stores.length &&
                                styles.contentContainerStyleProducts
                            }
                            columnWrapperStyle={{justifyContent: 'space-between'}}
                            data={stores}
                            renderItem={storesViews}
                            keyExtractor={(item, index) => item._id.toString()}
                            style={{width: '100%'}}
                            horizontal={false}
                            ListEmptyComponent={() => renderEmptyContainer(Dimensions.get('window').height, 'List is empty')}
                        />
                    </Box>
                </Box>
            </Box>
        </BaseWrapperComponent>
    );
})
const styles = StyleSheet.create({
    contentContainerStyleProducts: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainerStyle: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ShopsS;
