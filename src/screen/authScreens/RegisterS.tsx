import React, { useCallback, useState } from "react";
import {Linking, StyleSheet, TextInput, TouchableOpacity} from "react-native"
import {NavigationProp, ParamListBase} from "@react-navigation/native"
import {BaseWrapperComponent} from "../../components/baseWrapperComponent"
import {Box, Checkbox, Image, Text} from "native-base"
import CustomInput from "../../components/TextInput"
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons"
import logoImg from "../../assets/images/logoWeeDo.png"
import {useFormik} from "formik"
import {validateEmail} from "../../utils/utils"
import {colors} from "../../assets/colors/colors"
import Button from "../../components/Button"
import PhoneNumberField from "../../components/PhoneField"
import location from "../../assets/images/location-register.png"
import arrowLeft from "../../assets/images/arrow-left.png"
import rootStore from "../../store/RootStore"
import {RoleType} from "../../api/authApi"
import {routerConstants} from "../../constants/routerConstants"
import ArrowBack from "../../components/ArrowBack"
import {observer} from "mobx-react-lite"
import AuthStore, {AddressType, fullAddressType} from "../../store/AuthStore/auth-store"
import {getFormattedAddress} from "../../components/MapViews/utils"
import {createAlert} from "../../components/Alert"
import {usePermissionsPushGeo} from "../../utils/hook/usePermissionsPushGeo"
import {color} from "native-base/lib/typescript/theme/styled-system"
import Link from "../../components/Link"
import { useTranslation } from "react-i18next";

export type CountryData = {
	callingCode: string[]
	cca2: string
	currency: string[]
	flag: string
	name: string
	region: string
	subregion: string
}
export const countryDataDefault = {
	callingCode: ["66"],
	cca2: "TH",
	currency: ["THB"],
	flag: "flag-th",
	name: "Thailand",
	region: "Asia",
	subregion: "South-Eastern Asia",
}

type LoginSProps = {
	navigation: NavigationProp<ParamListBase>
}

export type UserRegisterDataType = {
	email: string
	password: string
	confirmPassword: string
	firstName: string
	lastName: string
	phone: string
	privacyPolicyIsVerified: boolean
	address: AddressType
	role: RoleType
}
const RegisterS = observer(({navigation}: LoginSProps) => {
	const {t} = useTranslation(['registration', 'login', 'errors', 'common']);
	const {AuthStoreService} = rootStore
	const {currentLocation, setLocation} = AuthStore
	const [checkAge, setAgeCheck] = useState(false)
	const [isErrorCheckAge, setCheckError] = useState(false)
	const [countryCode, setCountryCode] = useState<CountryData>(countryDataDefault)
	const onSubmit = (values: UserRegisterDataType) => {
		if (!checkAge) {
			setCheckError(true)
			setSubmitting(false)
			return
		}

		if ((!currentLocation?.fullAddress?.country && !currentLocation?.fullAddress?.city)
			|| !currentLocation?.location.coordinates[0]) {
			createAlert({
				title: t('message'),
				message: t('common:enterLocation'),
				buttons: [{text: t('common:ok'), style: "cancel"}],
			})
			setSubmitting(false)
			return
		}
		const formattedPhoneNumber = `+${countryCode.callingCode[0]}${values.phone}`
		AuthStoreService.registration({
      ...values,
      role: RoleType.Customer,
      email: values.email.trim(),
      phone: formattedPhoneNumber,
      address: currentLocation,
    }).then((data) => {
      if(data) {
        navigation.navigate(routerConstants.MAIN)
      }
    })
		setSubmitting(false)
	}
	const {
		handleChange,
		handleBlur,
		touched,
		handleSubmit,
		values,
		errors,
		isSubmitting,
		setSubmitting,
		setValues,
	} = useFormik({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: "",
			firstName: "",
			lastName: "",
			address: {} as AddressType,
			phone: "",
			role: RoleType.Customer,
			privacyPolicyIsVerified: true,
		},
		onSubmit: onSubmit,
		validateOnChange: false,
		validateOnMount: false,
		validateOnBlur: false,
		validate: (values) => {
			const errors = {}
			if (!validateEmail(values.email)) {
				errors["email"] = true
			}
			if (values.password.length <= 5) {
				errors["password"] = true
			}
			if (!values.firstName.trim()) {
				errors["firstName"] = true
			}
			if (!values.lastName.trim()) {
				errors["lastName"] = true
			}
			if (values.phone.length <= 3) {
				errors["phone"] = true
			}
			if (values.password !== values.confirmPassword) {
				errors["confirmPassword"] = true
			}

			return errors
		},
	})
	const onPressGoBack = useCallback(() => {
		navigation.goBack()
	}, [])
	const disabledBtnSignUp =
		!!(errors.email && !validateEmail(values.email.trim())) ||
		!!(errors.firstName && !values.firstName.trim()) ||
		!!(errors.lastName && !values.lastName.trim()) ||
		!!(errors.password && values.password.length <= 5) ||
		!!(errors.confirmPassword && !values.confirmPassword) ||
		!!(errors.phone && values.phone.length <= 3) ||
		isSubmitting

	const onPressNavigateToLocation = useCallback( async () => {
		//	await Linking.openSettings()
		navigation.navigate(routerConstants.AUTOCOMPLETE_MAP)
	}, [])

	const formatted_address = getFormattedAddress(currentLocation)
	const onChangeCountry = useCallback( (country) => {
		setCountryCode(country)
	}, [])
	const onChangeTextAddress = (text: string, key: keyof fullAddressType) => {
		if(text?.length > 10) return
		setLocation({
			...currentLocation,
			fullAddress: {...currentLocation?.fullAddress, [key]: text},
		})
	}
	const onPressOpenLegalNotice = useCallback(() => {
		Linking.openURL(
			"https://docs.google.com/document/d/e/2PACX-1vT1f6tmdyx4tiXcwLdHDoZcTvtquB0jF__AFWFb1QuYYG7ERhqwaejgTa-VLYU7dE55LMs8KASbt8tl/pub"
		)
	}, [])
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box alignItems={"center"}>
				<Box mt={5} mb={5} position={"absolute"} left={5}>
					<ArrowBack goBackPress={onPressGoBack} img={arrowLeft} />
				</Box>
				<Image w={123} h={158} alt={"logo"} source={logoImg} mt={5} mb={5} />
			</Box>
			<Box w={"100%"} alignItems={"center"} justifyContent={"flex-start"} flex={1} paddingX={5}>
				<Box w={"100%"} mb={5}>
					<CustomInput
						onChangeText={handleChange("firstName")}
						placeholder={t('firstName')}
						value={values.firstName}
						onBlur={handleBlur("firstName")}
						errorMessage={!values.firstName.trim() && t('enterName')}
						isInvalid={!!(errors.firstName && !values.firstName.trim())}
						isRequired={true}
						borderRadius={16}
						iconRight={<AntDesign name="user" size={24} color={colors.gray} />}
						type={"text"}
					/>

					<CustomInput
						onChangeText={handleChange("lastName")}
						placeholder={t('lastName')}
						value={values.lastName}
						onBlur={handleBlur("lastName")}
						errorMessage={!values.lastName.trim() && t('enterName')}
						isInvalid={!!(errors.lastName && !values.lastName.trim())}
						isRequired={true}
						borderRadius={16}
						iconRight={<AntDesign name="user" size={24} color={colors.gray} />}
						type={"text"}
					/>

					<CustomInput
						onChangeText={handleChange("email")}
						value={values.email}
						onBlur={handleBlur("email")}
						errorMessage={
							!validateEmail(values.email.trim()) &&
							errors.email &&
							t('errors:incorrectEmail')
						}
						isInvalid={!!(errors.email && !validateEmail(values.email.trim()))}
						isRequired={true}
						placeholder={t('email')}
						borderRadius={16}
						type={"text"}
						iconRight={
							<MaterialCommunityIcons name={"email-edit-outline"} size={24} color={colors.gray} />
						}
					/>
					<Box mt={2}>
						<PhoneNumberField
							onChangeCountry={onChangeCountry}
							errorMessage={t('errors:incorrectPhone')}
							placeholder={t('phone')}
							isInvalid={!!(errors.phone && values.phone.length <= 3)}
							isRequired={true}
							defaultValue={values.phone}
							onChangeText={handleChange("phone")}
						/>
					</Box>
					<CustomInput
						onChangeText={handleChange("password")}
						placeholder={t('login:password')}
						onBlur={handleBlur("password")}
						isInvalid={!!(errors.password && values.password.length <= 3)}
						errorMessage={
							!!errors.password &&
							values.password.length <= 5 &&
							t('errors:passwordMustBe')
						}
						value={values.password}
						isRequired={true}
						type={"password"}
						borderRadius={16}
					/>

					<CustomInput
						onChangeText={handleChange("confirmPassword")}
						placeholder={t('confirmPassword')}
						onBlur={handleBlur("confirmPassword")}
						value={values.confirmPassword}
						errorMessage={
							(touched.confirmPassword && errors.confirmPassword && !values.confirmPassword) ||
							(values.confirmPassword !== values.password && touched.confirmPassword)
								? t('errors:passwordDontMatch')
								: ""
						}
						isRequired={true}
						isInvalid={
							!!(touched.confirmPassword && errors.confirmPassword && !values.confirmPassword) ||
							!!(values.confirmPassword !== values.password && touched.confirmPassword)
						}
						type={"password"}
						borderRadius={16}
					/>
				</Box>
				<Box alignItems={"center"} mb={1}>
					<TouchableOpacity style={{ alignItems: 'center' }} onPress={onPressNavigateToLocation}>
						<Image w={170} h={105} alt={"location"} source={location} />
						<Text color={colors.gray} mt={2} fontWeight={"500"}>
							{" "}{t('addLocationAddress')}
						</Text>
					</TouchableOpacity>
					{formatted_address && (
						<Text fontSize={16} fontWeight={"600"}>
							{formatted_address}
						</Text>
					)}
				</Box>
				<Box w={"100%"} flex={1} alignItems={"flex-start"}>
					<Box mt={2} w={"100%"}>
						<TextInput
							placeholder={t('enterApartment')}
							style={styles.input}
							keyboardType="numeric"
							value={currentLocation?.fullAddress?.apartment}
							onChangeText={(text) => onChangeTextAddress(text, "apartment")}
						/>
					</Box>
				</Box>
				<Box mt={5} w={"100%"} alignItems={"flex-start"}>
					<TouchableOpacity>
						<Box flexDirection={"row"} alignItems={"center"}>
							<Checkbox
								accessibilityLabel={"111"}
								value="info"
								onChange={(e) => {
									setCheckError(!e)
									setAgeCheck(e)
								}}
								colorScheme="info"
							/>
							<Box flexDirection={"row"} justifyContent={"flex-start"} alignItems={"center"}>
								<Text fontSize={13} alignItems={"center"} ml={1} mr={1}>
									{t('Iagree')}
								</Text>
								<Link
									onPress={onPressOpenLegalNotice}
									styleText={{color: colors.green, fontWeight: "500"}}
									text={t('legalnotice')}
								/>
							</Box>
						</Box>
					</TouchableOpacity>
					{isErrorCheckAge && (
						<Text fontSize={14} color={colors.red} fontWeight={"500"} ml={1}>
							{t('youMustConfirmNotice')}
						</Text>
					)}
				</Box>
				<Box w={"100%"} mt={5} mb={5}>
					<Button
						styleContainer={styles.styleContainerBtnUp}
						disabled={disabledBtnSignUp}
						onPress={handleSubmit}
						title={t('login:signUp')}
					/>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})
const styles = StyleSheet.create({
	input: {
		width: "100%",
		paddingVertical: 5,
		paddingLeft: 20,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.grayLight,
		color: colors.gray,
	},
	styleContainerBtn: {
		borderWidth: 1,
		backgroundColor: "transparent",
		borderColor: colors.gray,
	},
	styleContainerBtnUp: {
		marginTop: 10,
		backgroundColor: colors.green,
	},
})

export default RegisterS;
