import React, {useState} from "react"
import {BaseWrapperComponent} from "../../components/baseWrapperComponent"
import AuthStore from "../../store/AuthStore"
import {Box, Text} from "native-base"
import ArrowBack from "../../components/ArrowBack"
import arrowLeftBack from "../../assets/images/arrow-left.png"
import {NavigationProp, ParamListBase} from "@react-navigation/native"
import {getFormattedAddress} from "../../components/MapViews/utils"
import {colors} from "../../assets/colors/colors"
import {AntDesign} from "@expo/vector-icons"
import {TouchableOpacity} from "react-native"
import CustomInput from "../../components/TextInput"
import Button from "../../components/Button"
import rootStore from "../../store/RootStore/root-store"
import {observer} from "mobx-react-lite"
import {routerConstants} from "../../constants/routerConstants"
import {fullAddressType} from "../../store/AuthStore/auth-store"

type AddressSProps = {
	navigation: NavigationProp<ParamListBase>
}
type AddressErrorState = {
	[K in keyof fullAddressType]?: boolean
}
const AddressS = observer(({navigation}: AddressSProps) => {
	const {user, currentLocation, setLocation} = AuthStore
	const {AuthStoreService} = rootStore
	const {address} = user
	const [errorField, setErrorField] = useState<AddressErrorState | null>(null)
	const formatted_address = getFormattedAddress(address)
	const onPressGoBack = () => {
		navigation.goBack()
	}
	const onPressEditAddress = () => {
		setErrorField(null)
		navigation.navigate(routerConstants.AUTOCOMPLETE_MAP)
	}
	const onPressSaveNewAddress = () => {
		if (!currentLocation.fullAddress.country) {
			setErrorField({country: true})
			return
		}
		if (!currentLocation.fullAddress.city) {
			setErrorField({city: true})
			return
		}
		if (!currentLocation.fullAddress.street) {
			setErrorField({street: true})
			return
		}
		AuthStoreService.updateUser(user._id, {address: currentLocation}).then((data) => {
			if (data) {
				navigation.navigate(routerConstants.HOME)
			}
		})
	}
	const onChangeText = (key: string, value: string) => {
		setErrorField(null)
		setLocation({
			...currentLocation,
			fullAddress: {...currentLocation?.fullAddress, [key]: value},
		})
	}
	return (
		<>
			<BaseWrapperComponent isKeyboardAwareScrollView={true}>
				<Box paddingX={5} mt={2}>
					<Box top={5} zIndex={10} position={"absolute"} left={5}>
						<ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack} />
					</Box>
					<Box flexDirection={"row"} mt={5} mb={10} justifyContent={"center"} alignItems={"center"}>
						<Text fontSize={22} fontWeight={"bold"}>
							Address
						</Text>
					</Box>

					<Text fontSize={14} color={colors.gray} fontWeight={"500"}>
						Current address:
					</Text>
					<Box
						mt={2}
						flexDirection={"row"}
						justifyContent={"space-between"}
						borderBottomWidth={1}
						pb={1}
						borderColor={colors.grayLight}
					>
						<Text fontSize={15}>{formatted_address}</Text>
						<TouchableOpacity onPress={onPressEditAddress}>
							<AntDesign name="edit" size={24} color={colors.black} />
						</TouchableOpacity>
					</Box>

					{currentLocation?.fullAddress && (
						<Box mt={5}>
							<Box alignItems={"center"}>
								<Text fontSize={22} color={colors.black} fontWeight={"500"}>
									New Address
								</Text>
							</Box>
							<Box>
								<CustomInput
									label={"Country"}
									value={currentLocation?.fullAddress?.country}
									onChangeText={(text) => onChangeText("country", text)}
									borderRadius={16}
									type={"text"}
								/>
								<CustomInput
									label={"City"}
									onChangeText={(text) => onChangeText("city", text)}
									value={currentLocation?.fullAddress?.city}
									borderRadius={16}
									type={"text"}
								/>
								<CustomInput
									label={"Street"}
									onChangeText={(text) => onChangeText("street", text)}
									value={currentLocation?.fullAddress?.street}
									borderRadius={16}
									type={"text"}
								/>
								<CustomInput
									label={"House"}
									onChangeText={(text) => onChangeText("house", text)}
									value={currentLocation?.fullAddress?.house}
									borderRadius={16}
									type={"text"}
								/>
								<CustomInput
									label={"Apartment"}
									onChangeText={(text) => onChangeText("apartment", text)}
									value={currentLocation?.fullAddress?.apartment}
									borderRadius={16}
									type={"text"}
								/>

								<Box mt={2}>
									<Box mb={1}>
										{errorField &&
											Object.entries(errorField)?.map(
												([field, hasError]) =>
													hasError && (
														<Text
															key={field}
															fontSize={15}
															fontWeight={"500"}
															color={colors.red}
														>{`Field '${field}' required`}</Text>
													)
											)}
									</Box>
									<Button
										backgroundColor={colors.green}
										title={"Save new address"}
										onPress={onPressSaveNewAddress}
									/>
								</Box>
							</Box>
						</Box>
					)}
				</Box>
			</BaseWrapperComponent>
		</>
	)
})

export default AddressS;
