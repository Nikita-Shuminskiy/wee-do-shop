import React from "react";
import { Box, Text } from "native-base";
import { StyleSheet } from "react-native";
import ModalPopup from "../pop-up";
import { colors } from "../../assets/colors/colors";
import Button from "../Button";
import SliderComponent from "../Slider";
import InputNumber from "../InputNumber";
import { ProductType } from "../../api/productApi";
import CartStore from "../../store/CartStore/cart-store";
import { formatProductPrice } from "../MapViews/utils";
import ImageDisplay from "../ImageDisplay";
import { BaseWrapperComponent } from "../baseWrapperComponent";
import { observer } from "mobx-react-lite";
import AuthStore from "../../store/AuthStore/auth-store";
import { useTranslation } from "react-i18next";

type PopUpProductProps = {
  show: boolean
  isOpenStoreNow: boolean
  onClose: () => void
  onPressGoToCardHandler: () => void
  product: ProductType
  saveProductValueToCart: (productValue: number) => void
}
const PopUpProduct = observer(
  ({
     show,
     onClose,
     product,
     saveProductValueToCart,
     onPressGoToCardHandler,
     isOpenStoreNow
   }: PopUpProductProps) => {
    const { cart } = CartStore;
    const { isAuth } = AuthStore;
    const totalSumCart = formatProductPrice(cart?.totalSum ?? 0);
    const {t} = useTranslation(['store', 'common']);
    const saveInputNumberValue = (productValue: number) => {
      saveProductValueToCart(productValue);
    };
    const saveSliderValue = (productValue: number) => {
      saveProductValueToCart(productValue);
    };
    const currentValueToCartProduct = cart?.products?.find(
      (productCart) => productCart?._id === product?._id
    );
    return (
      <>
        <ModalPopup style={{}} visible={show} onClose={onClose}>
          <BaseWrapperComponent isKeyboardAwareScrollView={true}>
            <Box flex={1} mb={120} w={"100%"} justifyContent={"space-between"}>
              <ImageDisplay
                source={{ uri: product?.image }}
                style={{
                  width: "100%",
                  aspectRatio: 200 / 171
                }}
                contentFit={'cover'}
                alt={"photoProduct"}
              />
              <Text mb={2} mt={2} fontSize={16} fontWeight={"600"}>
                {product?.name}
              </Text>
              <Text mb={2}>{product?.description}</Text>
              <Box mt={2} w={"100%"} flex={1}>
                <Box
                  mb={4}
                  flexDirection={"row"}
                  flex={1}
                  w={"100%"}
                  justifyContent={"space-between"}
                >
                  <Text>{t('price')}: 1x</Text>
                  <Text>฿ {formatProductPrice(product?.price)}</Text>
                </Box>
                {
                  isOpenStoreNow && isAuth && <SliderComponent
                    valueSlider={currentValueToCartProduct?.amount ?? 0}
                    onChangeValue={saveSliderValue}
                  />
                }
              </Box>
            </Box>
            {show && isAuth && (
              <Box
                justifyContent={"space-evenly"}
                zIndex={10000}
                w={'100%'}
                position={'absolute'}
                bottom={0}
                height={50}
                flexDirection={"row"}

                alignItems={"center"}
              >
                <Box w={"40%"}>
                  <InputNumber
                    values={currentValueToCartProduct?.amount ?? 0}
                    onChangeValue={saveInputNumberValue}
                  />
                </Box>
                <Box minWidth={150}>
                  <Button
                    backgroundColor={colors.green}
                    styleContainer={styles.styleContainerBtn}
                    styleText={styles.styleTextBtn}
                    onPress={onPressGoToCardHandler}
                    title={`${t('goToCart')} ${totalSumCart ? `฿${totalSumCart}`: ""}`}
                  />
                </Box>
              </Box>
            )}
          </BaseWrapperComponent>

        </ModalPopup>
      </>
    );
  }
);
const styles = StyleSheet.create({
  styleContainerBtn: {},
  styleTextBtn: {
    fontWeight: "600",
    fontSize: 16
  },
  container: {
    width: 200,
    height: 100,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  shadow: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 18
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24
  }
});
export default PopUpProduct;
