import React, {useEffect} from "react"
import {BaseWrapperComponent} from "../../components/baseWrapperComponent"
import AuthStore from "../../store/AuthStore/auth-store"
import {Box, Image, Text} from "native-base"
import {colors} from "../../assets/colors/colors"
import userProfile from "../../assets/images/courierImages/user-mock-profile.png"
import phoneImg from "../../assets/images/courierImages/phone-green.png"
import mailImg from "../../assets/images/courierImages/mail.png"
import contactImg from "../../assets/images/courierImages/contact-us.png"
import privacyImg from "../../assets/images/courierImages/privacy.png"
import termsImg from "../../assets/images/courierImages/terms.png"
import logoutImg from "../../assets/images/courierImages/Log-out.png"
import myOrdersImg from "../../assets/images/courierImages/my-orders.png"
import arrowRightImg from "../../assets/images/courierImages/arrow-right.png"
import CourierOrderStore from "../../store/CourierOrderStore/courier-order-store"
import {observer} from "mobx-react-lite"
import {StatusType} from "../../api/ordersApi"
import rootStore from "../../store/RootStore/root-store"
import {Linking, StyleSheet, TouchableOpacity} from "react-native"
import {routerConstants} from "../../constants/routerConstants"

const ProfileCourierS = observer(({navigation}: any) => {
	const {user} = AuthStore
	const {completedOrdersNumber} = CourierOrderStore
	const {CourierOrderService, AuthStoreService} = rootStore
	const formattedAddress = `${user?.address?.fullAddress?.country}, ${user?.address?.fullAddress?.city}`
	const logOutHandler = () => {
		navigation.navigate(routerConstants.LOGIN)
		AuthStoreService.logOutCourier()
	}
	const handleEmailLinkPress = async () => {
		await Linking.openURL("mailto:weedoshop420@gmail.com")
	}
	const onPressPrivacy = () => {
		navigation.navigate(routerConstants.PRIVACY_POLICE)
	}
	const onPressTermOfUse = () => {
		navigation.navigate(routerConstants.TERM_SERVICE)
	}
	useEffect(() => {
		CourierOrderService.getTakenCourierOrders({
			status: StatusType.Completed,
		})
	}, [])

	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={5} mt={12} justifyContent={"space-between"} w={"100%"} flex={1}>
				<Box alignItems={"center"}>
					<Image mb={2} w={109} h={109} alt={"logo-we-do"} source={userProfile} />

					<Text fontSize={24} mt={2} fontWeight={"500"}>
						{user?.firstName} {user?.lastName}
					</Text>
					{user?.address?.fullAddress?.country && (
						<Text fontSize={15} color={colors.gray} fontWeight={"500"}>
							{formattedAddress}
						</Text>
					)}

					<Box
						flexDirection={"row"}
						flexWrap={"wrap"}
						justifyContent={"center"}
						mt={1}
						alignItems={"center"}
					>
						<Box mr={2} flexDirection={"row"} alignItems={"center"}>
							<Image mr={2} w={4} h={4} alt={"phone"} source={phoneImg} />
							<Text fontSize={12} fontWeight={"500"} color={colors.black}>
								{user?.phone}
							</Text>
						</Box>
						<Box flexDirection={"row"} mt={1} alignItems={"center"}>
							<Image mr={2} w={4} h={4} alt={"mail"} source={mailImg} />
							<Text color={colors.black} fontWeight={"500"} fontSize={12}>
								{user?.email}
							</Text>
						</Box>
					</Box>
					<Box
						mt={5}
						flexDirection={"row"}
						alignItems={"center"}
						backgroundColor={colors.grayLightWhite}
						p={4}
						borderRadius={16}
						w={"100%"}
					>
						<Image w={8} h={8} alt={"img-order"} source={myOrdersImg} />
						<Box ml={2}>
							<Text color={colors.black} fontWeight={"700"} fontSize={12}>
								My orders
							</Text>
							<Text color={colors.gray} fontWeight={"500"} fontSize={12}>
								Completed {completedOrdersNumber}
							</Text>
						</Box>
					</Box>
				</Box>
				<Box flex={1} mt={7} justifyContent={"flex-start"}>
					<TouchableOpacity onPress={handleEmailLinkPress}>
						<Box
							flexDirection={"row"}
							alignItems={"flex-start"}
							pb={4}
							mt={4}
							borderBottomWidth={1}
							borderColor={colors.grayLight}
						>
							<Image w={5} h={5} alt={"img"} source={contactImg} />
							<Box
								flexDirection={"row"}
								flex={1}
								justifyContent={"space-between"}
								w={"100%"}
								ml={1}
							>
								<Text style={styles.text}>Contact us</Text>
								<Image source={arrowRightImg} alt={"img-arrow"} style={{width: 24, height: 24}} />
							</Box>
						</Box>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressPrivacy}>
						<Box
							flexDirection={"row"}
							alignItems={"flex-start"}
							pb={4}
							mt={4}
							borderBottomWidth={1}
							borderColor={colors.grayLight}
						>
							<Image w={5} h={5} alt={"img"} source={privacyImg} />
							<Box
								flexDirection={"row"}
								flex={1}
								justifyContent={"space-between"}
								w={"100%"}
								ml={1}
							>
								<Text style={styles.text}>Privacy police</Text>
								<Image source={arrowRightImg} alt={"img-arrow"} style={{width: 24, height: 24}} />
							</Box>
						</Box>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressTermOfUse}>
						<Box
							flexDirection={"row"}
							alignItems={"flex-start"}
							pb={4}
							mt={4}
							borderBottomWidth={1}
							borderColor={colors.grayLight}
						>
							<Image w={5} h={5} alt={"img"} source={termsImg} />
							<Box
								flexDirection={"row"}
								flex={1}
								justifyContent={"space-between"}
								w={"100%"}
								ml={1}
							>
								<Text style={styles.text}>Terms of service</Text>
								<Image source={arrowRightImg} alt={"img-arrow"} style={{width: 24, height: 24}} />
							</Box>
						</Box>
					</TouchableOpacity>
					<TouchableOpacity onPress={logOutHandler}>
						<Box
							flexDirection={"row"}
							alignItems={"flex-start"}
							pb={4}
							mt={4}
							borderColor={colors.grayLight}
						>
							<Image w={5} h={5} alt={"img"} source={logoutImg} />
							<Box
								flexDirection={"row"}
								flex={1}
								justifyContent={"space-between"}
								w={"100%"}
								ml={1}
							>
								<Text style={{...styles.text, color: colors.red}}>Log out</Text>
								<Image source={arrowRightImg} alt={"img-arrow"} style={{width: 24, height: 24}} />
							</Box>
						</Box>
					</TouchableOpacity>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginLeft: 2,
    fontWeight: "600"
  }
});
export default ProfileCourierS;
