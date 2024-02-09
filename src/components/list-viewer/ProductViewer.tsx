import React, { memo, useCallback, useMemo } from "react";
import {Box, Image, Pressable, Text} from "native-base"
import {Dimensions, StyleSheet} from "react-native"
import {colors} from "../../assets/colors/colors"
import Button from "../Button"
import InputNumber from "../InputNumber"
import {ProductType} from "../../api/productApi"
import {formatProductPrice} from "../MapViews/utils"
import ImageDisplay from "../ImageDisplay"
import {LinearGradient} from "expo-linear-gradient"
import lockImg from "../../assets/images/lock.png"

type StoreViewerProps = {
	product: ProductType
	onPressProduct: (product: ProductType) => void
	saveProductToCart: (valueProduct: number, product: ProductType) => void
	currentCartProductAmount: number
	isAuth: boolean
}
const ProductViewer = memo(
	({
		product,
		onPressProduct,
		saveProductToCart,
		currentCartProductAmount,
		isAuth,
	}: StoreViewerProps) => {
		const {width} = Dimensions.get("window")
		const productWidth = useMemo(() => (width - 10) / 2, [width])

		const productTotalPrice = useMemo(() => formatProductPrice(product.price), [product.price])

		const onPressProductHandler = useCallback(() => {
			saveProductToCart(1, product)
		}, [product])
		const onChangeValueNumber = useCallback((valueProduct: number) => {
			saveProductToCart(valueProduct, product)
		}, [product])
		const formattedEffectName = product?.effect?.charAt(0).toUpperCase() + product?.effect?.slice(1)
		return (
			<Pressable
				style={{
					alignItems: "center",
					paddingHorizontal: 5,
					minWidth: productWidth,
					maxWidth: productWidth,
				}}
				onPress={() => {
					if (product?.isNeedAuth && !isAuth) return
					onPressProduct(product)
				}}
			>
				<Box style={styles.shadow} borderRadius={16} alignItems={"center"} w={"100%"} mb={5}>
					<Box>
						{!!product.effect && (
							<Box maxWidth={'85%'} minWidth={15} w={'auto'} position={"absolute"} p={1} top={2} left={0} zIndex={10}>
								<LinearGradient
									colors={["#5AB0FF", "#BF38FF"]}
									start={[0, 0.5]}
									end={[1, 0.5]}
									style={{
										flex: 1,
										borderRadius: 10,
										paddingVertical: 2,
										paddingHorizontal: 10,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Text
										color={colors.white}
										/*style={styles.textWithShadow}
                  borderRadius={16}*/
										fontSize={10}
										fontWeight={"600"}
										textAlign={"center"}
									>
										{formattedEffectName}
									</Text>
								</LinearGradient>
							</Box>
						)}
						<Box width={productWidth - 10} h={170}
								 alignItems={"center"}
								 zIndex={product.isNeedAuth && !isAuth ? 12 : 2}
								 backgroundColor={product.isNeedAuth && !isAuth ? colors.grayLight : 'transparent'}
								 borderTopLeftRadius={16}
								 borderTopRightRadius={16}
								 justifyContent={"center"}>
							{product.isNeedAuth && !isAuth ? (
								<Image alt={"lock-img"} w={30} h={30} source={lockImg} />
							) : (
								<ImageDisplay
									alt={"image-store"}
									source={{uri: product?.image}}
									style={{
										width: "100%",
										height: "100%",
										borderTopLeftRadius: 16,
										borderTopRightRadius: 16,
									}}
								/>
							)}
						</Box>
					</Box>
					<Box
						paddingY={1}
						paddingX={2}
						w={"100%"}
						minWidth={"100%"}
						justifyContent={"space-evenly"}
						borderBottomRightRadius={16}
						borderBottomLeftRadius={16}
					>
						<Text fontSize={14} fontWeight={"700"} color={colors.balck}>
							{product?.name}
						</Text>
						<Box mt={5} height={50}>
							{!currentCartProductAmount ? (
								<Button
									styleText={styles.styleTextBtn}
									backgroundColor={colors.grayDarkLight}
									onPress={onPressProductHandler}
									title={`฿ ${productTotalPrice}`}
								/>
							) : (
								<InputNumber
									values={currentCartProductAmount}
									onChangeValue={onChangeValueNumber}
								/>
							)}
						</Box>
					</Box>
				</Box>
			</Pressable>
		)
	}
)
const styles = StyleSheet.create({
	textWithShadow: {
		fontWeight: "bold",
		textShadowColor: "black", // Цвет тени
		textShadowOffset: {width: 2, height: 2},
		textShadowRadius: 2,
	},
	styleTextBtn: {
		fontWeight: "600",
		fontSize: 16,
		color: colors.black,
	},
	shadow: {
		backgroundColor: colors.white,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,

		elevation: 7,
	},
})
export default ProductViewer;
