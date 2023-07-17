import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import {Box, Image, Text} from "native-base";
import AuthStore from "../../store/AuthStore/auth-store";
import likeImg from '../../assets/images/likeGreen.png'
import userImg from '../../assets/images/userGreen.png'
import searchImg from '../../assets/images/search.png'
import settingImg from '../../assets/images/setting.png'
import {FlatList, StyleSheet, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {colors} from "../../assets/colors/colors";
import TextInput from "../../components/TextInput";
import EmptyList from "../../components/list-viewer/empty-list";
import CategoriesViewer from "../../components/list-viewer/CategoriesViewer";
import StoresViewer from "../../components/list-viewer/StoresViewer";

const categories = [
    {_id: '13', name: 'Food'},
    {_id: '132', name: 'Drink'},
    {_id: '132', name: 'Alcohol'},
    {_id: '132', name: 'Alcohol'},
    {_id: '1312', name: 'Alcohol'},
    {_id: '1332', name: 'Alcohol'},
    {_id: '1322', name: 'Alcohol'},
]
const store = [
    {
        _id: '1',
        name: 'store',
        description: 'test',
        phone: '14',
        website: '113131',
        address: '1313131'
    },
    {
        _id: '2',
        name: 'store',
        description: 'test',
        phone: '14',
        website: '113131',
        address: '1313131'
    },
    {
        _id: '3',
        name: 'store',
        description: 'test',
        phone: '14',
        website: '113131',
        address: '1313131'
    },
]
type TouchableWrappedProps = TouchableOpacityProps & {
    children: JSX.Element
}
const TouchableWrapped = ({children, ...rest}: TouchableWrappedProps) => {
    return <TouchableOpacity {...rest}>
        {children}
    </TouchableOpacity>
}
const HomeS = observer(() => {
    const {user} = AuthStore
    const [search, setSearch] = useState('')
    const onChangeTextSearch = (e) => {
        setSearch(e)
    }
    const categoriesViews = ({item}) => {
        return (
            <CategoriesViewer
                data={item}
            />
        )
    }
    const storesViews = ({item}) => {
        return (
            <StoresViewer
                data={item}
            />
        )
    }
    const renderEmptyContainer = () => {
        const onPressLink = () => {

        }
        return (
            <EmptyList
                text={'У вас нет кошельков'}
                textLink={'Создать кошелек'}
                onPressLink={onPressLink}
            />
        )
    }

    return (
        <BaseWrapperComponent>
            <Box mt={2}>
                <Box paddingX={5} h={45} w={'100%'} flexDirection={'row'} justifyContent={'space-between'}>
                    <TouchableWrapped>
                        <Image source={userImg} alt={'user'}/>
                    </TouchableWrapped>
                    <Text fontSize={16} w={'60%'} textAlign={'center'}
                          fontWeight={'600'}>{user?.location}1313111113</Text>
                    <TouchableWrapped>
                        <Image source={likeImg} alt={'like'}/>
                    </TouchableWrapped>
                </Box>

                <Box mt={10} w={'100%'} backgroundColor={colors.white} borderTopLeftRadius={16}
                     borderTopRightRadius={16}>
                    <Box w={'100%'} paddingX={5}>
                        <TextInput
                            iconLeft={<Image ml={2} source={searchImg} alt={'search'}/>}
                            iconRight={
                                <Box flexDirection={'row'} mr={2}>
                                    <Box borderRightWidth={1} borderColor={colors.gray} mr={4}/>
                                    <Image source={settingImg} alt={'setting'}/>
                                </Box>
                            }
                            h={50}
                            placeholder={'Name, strain or shop'}
                            borderRadius={16}
                            backgroundColor={'transparent'}
                            borderColor={colors.grayLight}
                            value={search}
                            onChangeText={onChangeTextSearch}/>
                    </Box>

                    <Box mt={5} mb={2}>
                        <FlatList
                            data={categories}
                            renderItem={categoriesViews}
                            keyExtractor={(item, index) => index.toString()}
                            style={{width: '100%'}}
                            ListEmptyComponent={renderEmptyContainer}
                            /*  contentContainerStyle={
                                  !wallets?.length ? styles.contentContainerStyle : {width: '100%', padding: 10}
                              }*/
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                        />
                    </Box>
                    <Box flexGrow={1} w={'100%'}>
                        <FlatList
                            data={store}
                            renderItem={storesViews}
                            keyExtractor={(item, index) => index.toString()}
                            style={{width: '100%'}}
                            ListEmptyComponent={renderEmptyContainer}
                            contentContainerStyle={
                                !store?.length ? {
                                    flex: 1,
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                } : {width: '100%', padding: 10}
                            }
                            horizontal={false}
                            showsVerticalScrollIndicator={true}
                        />
                    </Box>
                </Box>

            </Box>
        </BaseWrapperComponent>
    );
});
const styles = StyleSheet.create({})

export default HomeS;
