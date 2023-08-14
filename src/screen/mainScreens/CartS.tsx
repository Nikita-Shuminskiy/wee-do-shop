import React, {useState} from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import cartStore, {ProductCartType} from "../../store/CartStore/cart-store";
import {observer} from "mobx-react-lite";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import {Box, Text} from "native-base";
import {colors} from "../../assets/colors/colors";
import Button from "../../components/Button";
import {Dimensions, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import EmptyList from "../../components/list-viewer/empty-list";
import ProductCartViewer from "../../components/list-viewer/ProductCartViewer";
import {FontAwesome5} from '@expo/vector-icons';
import {formatProductPrice, getFormattedAddress} from "../../components/MapViews/utils";
import EmptyCart from "../../components/EmptyCart";
import {createAlert} from "../../components/Alert";
import rootStore from "../../store/RootStore/root-store";
import TextInput from "../../components/TextInput";
import {SendDataOrderType} from "../../api/ordersApi";
import authStore from "../../store/AuthStore/auth-store";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {routerConstants} from "../../constants/routerConstants";

type CartSProps = {
    navigation: NavigationProp<ParamListBase>
}

const CartS = observer(({navigation}: CartSProps) => {
    const {cart, removeCart, removeProductToCart, updateProductToCart, setToCartStore} = cartStore
    const {user} = authStore
    const {OrderService} = rootStore
    const cartProducts = cart?.products
    const [textComment, setTextComment] = useState('')
    const onChangeTextCommentHandler = (text: string) => {
        setTextComment(text)
    }
    const onPressCheckout = () => {
        const getProductsForOrder = cart.products.map((product) => {
            return {amount: product.amount, productId: product._id}
        })
        const dataOrder: SendDataOrderType = {
            comment: textComment,
            products: getProductsForOrder,
            userId: user._id
        }
        OrderService.sendOrder(dataOrder).then((data) => {
            if (data) {
                setToCartStore(null)
                navigation.navigate(routerConstants.ORDER_STATUSES)
            }
        })
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
            if(!productValue) {
                return removeProductToCart(item._id)
            }
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
    const formatted_address = getFormattedAddress(user.address)
    return (
        <>
            <BaseWrapperComponent extraScrollHeight={50} backgroundColor={'white'}
                                  isKeyboardAwareScrollView={!!cartProducts}>
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
                                scrollEnabled={false}
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
                            <Box>
                                <Text>Your Address</Text>
                                <Text ml={3} fontSize={14} color={colors.gray} fontWeight={'500'}>{formatted_address}</Text>
                            </Box>
                            <Box>
                                <TextInput onChangeText={onChangeTextCommentHandler} heightInput={40}
                                    /*onFocus={(event: Event) => {
                                        // `bind` the function if you're using ES6 classes
                                        inputRef.current(event.target)
                                    }}*/
                                           placeholder={'Add comment'} textAlignVertical={'top'}
                                           multiline={true} numberOfLines={4}/>
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
