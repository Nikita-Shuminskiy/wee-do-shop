import React, {useEffect} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import cartStore, {CartType, ProductCartType} from "../../store/CartStore/cart-store";
import {observer} from "mobx-react-lite";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import {Box, Text} from "native-base";
import {colors} from "../../assets/colors/colors";
import Button from "../../components/Button";
import {Dimensions, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import EmptyList from "../../components/list-viewer/empty-list";
import ProductCartViewer from "../../components/list-viewer/ProductCartViewer";
import {FontAwesome5} from '@expo/vector-icons';
import {formatProductPrice} from "../../components/MapViews/utils";
import storesStore from "../../store/StoresStore/stores-store";
import EmptyCart from "../../components/EmptyCart";
import {createAlert} from "../../components/Alert";

const CartS = observer(() => {
    const {cart, setToCartStore, removeCart, removeProductToCart, updateProductToCart} = cartStore
    const cartProducts = cart?.products
    /* useEffect(() => {
         return () => {
             setToCartStore({} as CartType)
         }
     }, [])*/

    const onPressCheckout = () => {

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
    const productCartViews = ({item}: { item: ProductCartType }) => {
        const onPressRemoveProduct = () => {
            removeProductToCart(item._id)
        }

        const onChangeValueNumber = (productValue: number) => {
            updateProductToCart(item._id, productValue)
        }

        return (
            <ProductCartViewer onPressRemoveProduct={onPressRemoveProduct} product={item}
                               onChangeValueNumber={onChangeValueNumber}/>
        )
    }
    const onPressRemoveStoreFromCart = () => {
        const onPressRemove = () => {
            removeCart()
        }
        createAlert({
            title: 'Message',
            message: 'Do you really want to delete the order?',
            buttons: [{text: 'Remove', style: "cancel", onPress: onPressRemove}, {text: 'Exit', style: "cancel"}]
        })

    }
    const productTotalPrice = formatProductPrice(cart?.totalSum ?? 0)
    return (
        <>
            <BaseWrapperComponent backgroundColor={'white'} isKeyboardAwareScrollView={!!cartProducts}>
                {
                    !cartProducts ? <EmptyCart/> : (
                        <Box paddingX={4} mt={2}>
                            <Box alignItems={'center'}>
                                <Text fontSize={20} fontWeight={'500'}>Cart</Text>
                            </Box>
                            <Box mt={2} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Text fontSize={28} fontWeight={'800'}>
                                    {
                                        cart?.storeName
                                    }
                                </Text>
                                <TouchableOpacity onPress={onPressRemoveStoreFromCart}>
                                    <FontAwesome5 name="trash" size={24} color="black"/>
                                </TouchableOpacity>
                            </Box>
                            <FlatList
                                data={cartProducts ?? []}
                                horizontal={false}
                                renderItem={productCartViews}
                                keyExtractor={(item, index) => item?._id.toString()}
                                style={{width: '100%'}}
                                ListEmptyComponent={() => renderEmptyContainer(Dimensions.get('window').height, 'List is empty')}
                                contentContainerStyle={
                                    !cartProducts &&
                                    styles.contentContainerStyleProducts
                                }
                            />
                            <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}
                                 borderBottomWidth={1} pb={2} borderColor={colors.grayDarkLight}>
                                <Text>Delivery</Text>
                                <Text color={colors.gray}>0</Text>
                            </Box>
                            <PrivacyPolicy/>
                            {/*   <Box mt={5}>
                        <Text fontSize={24} fontWeight={'700'}>Anything else?</Text>
                    </Box>*/}
                        </Box>
                    )
                }
            </BaseWrapperComponent>
            {!!cartProducts && <Box
                flexDirection={'row'}
                shadow={'black'}
                borderTopRightRadius={16}
                borderTopLeftRadius={16}
                height={99}
                alignItems={'center'}
                justifyContent={'center'}
                paddingX={5}
                style={styles.shadow}
                backgroundColor={colors.white}
            >
                <Box mr={2}>
                    <Text fontSize={18} fontWeight={'500'}>฿{' '}{productTotalPrice}</Text>
                    <Text fontSize={13} color={colors.gray}>30-40 min</Text>
                </Box>
                <Button styleContainer={styles.styleBtnContainer} styleText={styles.styleTextBtn}
                        onPress={onPressCheckout} title={'Checkout'}/>
            </Box>}

        </>
    );
})
const styles = StyleSheet.create({
    contentContainerStyleProducts: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: -3.5,
            height: -41.5
        },
        shadowOpacity: 0.5,
        shadowRadius: 19.9,
        elevation: 24,
    },
    styleBtnContainer: {
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
        backgroundColor: colors.green
    },
    styleTextBtn: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: '500'
    }
})
export default CartS;
