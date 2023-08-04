import React from 'react';
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import cartStore from "../../store/CartStore/cart-store";
import EmptyCart from "../../components/EmptyCart";
import {observer} from "mobx-react-lite";
import PrivacyPolicy from "../../components/PrivacyPolicy";
import {Box, Text } from "native-base";
import {colors} from "../../assets/colors/colors";
import Button from "../../components/Button";
import {StyleSheet} from "react-native";

const CartS = observer(() => {
    const {carts} = cartStore
    console.log(carts)
    const onPressCheckout = () => {

    }

    return (
        <>
            <BaseWrapperComponent backgroundColor={'white'}>
                {/*  {
                carts.length && <EmptyCart/>
            }*/}

                <Box paddingX={2} mt={2}>
                    <Box alignItems={'center'}>
                        <Text fontSize={20} fontWeight={'500'}>Cart</Text>
                    </Box>
                    <PrivacyPolicy/>
                    <Box>
                        <Text fontSize={24} fontWeight={'700'}>Anything else?</Text>
                    </Box>
                </Box>
            </BaseWrapperComponent>
            <Box
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
                <Box mr={2} >
                    <Text fontSize={18} fontWeight={'500'}>270110</Text>
                    <Text fontSize={13} color={colors.gray}>30-40 min</Text>
                </Box>
                <Button styleContainer={styles.styleBtnContainer} styleText={styles.styleTextBtn}  onPress={onPressCheckout} title={'Checkout'}/>
            </Box>
        </>
    );
})
const styles = StyleSheet.create({
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
