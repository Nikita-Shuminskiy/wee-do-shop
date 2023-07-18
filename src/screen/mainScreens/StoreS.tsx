import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import arrowLeftBack from '../../assets/images/arrow-left-back.png'
import testBackground from '../../assets/images/testBackground.png'
import {Box, Image, Text} from "native-base";
import ArrowBack from "../../components/ArrowBack";
import {useNavigation} from "@react-navigation/native";
import {colors} from "../../assets/colors/colors";
import Button from "../../components/Button";
import {Dimensions, FlatList, ImageBackground} from "react-native";
import {CategoryType} from "../../api/categoriesApi";
import CategoriesViewer from "../../components/list-viewer/CategoriesViewer";
import EmptyList from "../../components/list-viewer/empty-list";
import {StoreType} from "../../api/storesApi";
import StoresViewer from "../../components/list-viewer/StoresViewer";

const StoreS = () => {
    const [isConfirmButton, setIsConfirmButton] = useState()
    const navigate = useNavigation()
    const onPressGoBack = () => {
        navigate.goBack()
    }
    const onPressAboutStore = () => {

    }
    const categoriesViews = ({item}: { item: CategoryType }) => {
        return (
            <CategoriesViewer
                category={item}
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
    const onPressConfirmButton = () => {

    }
    const storesViews = ({item}: { item: StoreType }) => {
        const onPress = () => {

        }
        return (
            <StoresViewer
                onPress={onPress}
                stores={item}
            />
        )
    }
    return (
        <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box>
                <Box w={'100%'} height={239} flex={1}>
                    <ImageBackground style={{ flex: 1, width: '100%' }}  alt={'shop-image'} source={testBackground}>
                        <Box mt={5} mb={5} position={'absolute'} left={5}>
                            <ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack}/>
                        </Box>
                        <Box flex={1} w={'100%'} alignItems={'flex-start'} justifyContent={'center'}>
                            <Box ml={4} mt={5} justifyContent={'flex-start'}>
                                <Text color={colors.white} fontWeight={'700'} fontSize={32}>Simply crafted store</Text>
                            </Box>
                            <Box position={'absolute'} bottom={7} right={2}>
                                <Button backgroundColor={'transparent'}
                                        styleContainer={{ borderWidth: 1, borderColor: colors.white }} onPress={onPressAboutStore} title={'About store'}/>
                            </Box>
                        </Box>
                    </ImageBackground>
                </Box>

                <Box w={'100%'} position={'relative'} top={-13}  backgroundColor={colors.white} borderTopLeftRadius={16}
                     borderTopRightRadius={16}>
                    <Box mt={5} mb={2}>
                        <FlatList
                            data={[]}
                            renderItem={categoriesViews}
                            keyExtractor={(item, index) => index.toString()}
                            style={{width: '100%'}}
                            contentContainerStyle={
                                ![]?.length && {
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
                    <Box>
                        <FlatList
                            data={[]}
                            renderItem={storesViews}
                            keyExtractor={(item, index) => index.toString()}
                            style={{width: '100%'}}
                            ListEmptyComponent={() => renderEmptyContainer(Dimensions.get('window').height, 'List is empty')}
                            contentContainerStyle={
                                ![]?.length ? {
                                    flex: 1,
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                } : {width: '100%', flex: 1}
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
    );
};

export default StoreS;
