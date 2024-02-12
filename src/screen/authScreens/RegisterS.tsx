import React, {useCallback, useMemo, useState} from "react"
import {Linking, StyleSheet, TouchableOpacity} from "react-native"
import {NavigationProp, ParamListBase} from "@react-navigation/native"
import {BaseWrapperComponent} from "../../components/baseWrapperComponent"
import {Box, Checkbox, Image, Text} from "native-base"
import CustomInput from "../../components/TextInput"
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons"
import logoImg from "../../assets/images/logoWeeDo.png"
import {FormikHelpers, useFormik} from "formik"
import {colors} from "../../assets/colors/colors"
import location from "../../assets/images/location-register.png"
import arrowLeft from "../../assets/images/arrow-left.png"
import {RoleType, UserRegisterDataType} from "../../api/authApi"
import {routerConstants} from "../../constants/routerConstants"
import ArrowBack from "../../components/ArrowBack"
import {observer} from "mobx-react-lite"
import {getFormattedAddress} from "../../components/MapViews/utils"
import {createAlert} from "../../components/Alert"
import {useTranslation} from "react-i18next"
import "yup-phone-lite"
import {CountryData, countryDataDefault, schema} from "./helpers"
import AuthStore, {AddressType, fullAddressType} from "../../store/AuthStore/auth-store"
import rootStore from "../../store/RootStore/root-store"
import Link from "../../components/Link"
import Button from "../../components/Button"
import PhoneNumberField from "../../components/PhoneField"

type LoginSProps = {
	navigation: NavigationProp<ParamListBase>;
};

const RegisterS = observer(({navigation}: LoginSProps) => {
	const {t} = useTranslation(['registration', 'login', 'errors', 'common']);
	const {AuthStoreService} = rootStore
	const {currentLocation, setLocation} = AuthStore
	const [checkAge, setAgeCheck] = useState(false)
	const [isErrorCheckAge, setCheckError] = useState(false)
	const [countryCode, setCountryCode] = useState<CountryData>(countryDataDefault)

	const onSubmit = (values: UserRegisterDataType, helpers: FormikHelpers<any>) => {
		setSubmitting(true)
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
    }).finally(() => {
			setSubmitting(false)
		})
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
		onSubmit,
		validateOnChange: true,
		validateOnMount: false,
		validateOnBlur: true,
		validationSchema: schema(t, countryCode),
	});

	const onPressGoBack = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	const onPressNavigateToLocation = useCallback(async () => {
		navigation.navigate(routerConstants.AUTOCOMPLETE_MAP);
	}, [navigation]);
	const formatted_address = useMemo(() => getFormattedAddress(currentLocation), [currentLocation]);

	const onChangeCountry = useCallback((country) => {
		setCountryCode(country);
	}, []);

	const onChangeTextAddress = useCallback(
		(text: string, key: keyof fullAddressType) => {
			if (text?.length > 10) return;
			setLocation({
				...currentLocation,
				fullAddress: { ...currentLocation?.fullAddress, [key]: text },
			});
		},
		[currentLocation]
	);

	const onPressOpenLegalNotice = useCallback(() => {
		Linking.openURL(
			"https://docs.google.com/document/d/e/2PACX-1vT1f6tmdyx4tiXcwLdHDoZcTvtquB0jF__AFWFb1QuYYG7ERhqwaejgTa-VLYU7dE55LMs8KASbt8tl/pub"
		);
	}, []);

	const onChangeChecked = useCallback((e) => {
		setCheckError(!e);
		setAgeCheck(e);
	}, []);
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
						errorMessage={errors['firstName']}
						isInvalid={touched['firstName'] && Boolean(errors['firstName'])}
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
						errorMessage={errors['lastName']}
						isInvalid={touched['lastName'] && Boolean(errors['lastName'])}
						isRequired={true}
						borderRadius={16}
						iconRight={<AntDesign name="user" size={24} color={colors.gray} />}
						type={"text"}
					/>

					<CustomInput
						onChangeText={handleChange("email")}
						value={values.email}
						onBlur={handleBlur("email")}
						errorMessage={errors['email']}
						isInvalid={touched['email'] && Boolean(errors['email'])}
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
							errorMessage={errors['phone']}
							placeholder={t('phone')}
						//	onBlur={handleBlur("phone")}
							isInvalid={touched['phone'] && Boolean(errors['phone'])}
							isRequired={true}
							defaultValue={values.phone}
							value={values.phone}
							onChangeText={handleChange("phone")}
						/>
					</Box>
					<CustomInput
						onChangeText={handleChange("password")}
						placeholder={t('login:password')}
						onBlur={handleBlur("password")}
						isInvalid={touched['password'] && Boolean(errors['password'])}
						errorMessage={t('errors:passwordMustBe')}
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
						errorMessage={errors['confirmPassword']}
						isInvalid={touched['confirmPassword'] && Boolean(errors['confirmPassword'])}
						isRequired={true}
						type={"password"}
						borderRadius={16}
					/>
				</Box>
				<Box alignItems={"center"} mb={1}>
					<TouchableOpacity style={{ alignItems: "center" }} onPress={onPressNavigateToLocation}>
						<Image w={170} h={105} alt={"location"} source={location} />
						<Text color={colors.gray} mt={2} fontWeight={"500"}>
							{" "}
							{t("addLocationAddress")}
						</Text>
					</TouchableOpacity>
					{formatted_address && <Text fontSize={16} fontWeight={"600"}>{formatted_address}</Text>}
				</Box>
				<Box w={"100%"} flex={1} alignItems={"flex-start"}>
					<Box mt={2} w={"100%"}>
						<CustomInput
							borderRadius={16}
							placeholder={t("enterApartment")}
							keyboardType="numeric"
							value={currentLocation?.fullAddress?.apartment}
							onChangeText={(text) => onChangeTextAddress(text, "apartment")}
						/>
					</Box>
				</Box>
				<Box mt={5} w={"100%"} alignItems={"flex-start"}>
					<TouchableOpacity>
						<Box flexDirection={"row"} alignItems={"center"}>
							<Checkbox accessibilityLabel={"111"} value="info" onChange={onChangeChecked} colorScheme="info" />
							<Box flexDirection={"row"} justifyContent={"flex-start"} alignItems={"center"}>
								<Text fontSize={13} alignItems={"center"} ml={1} mr={1}>
									{t("Iagree")}
								</Text>
								<Link
									onPress={onPressOpenLegalNotice}
									styleText={{ color: colors.green, fontWeight: "500" }}
									text={t("legalnotice")}
								/>
							</Box>
						</Box>
					</TouchableOpacity>
					{isErrorCheckAge && (
						<Text fontSize={14} color={colors.red} fontWeight={"500"} ml={1}>
							{t("youMustConfirmNotice")}
						</Text>
					)}
				</Box>
				<Box w={"100%"} mt={5} mb={5}>
					<Button
						styleContainer={styles.styleContainerBtnUp}
						loading={isSubmitting}
						onPress={handleSubmit}
						title={t('login:signUp')}
					/>
				</Box>
			</Box>
		</BaseWrapperComponent>
	);
});

const styles = StyleSheet.create({
	styleContainerBtnUp: {
		marginTop: 10,
		backgroundColor: colors.green,
	},
});

export default RegisterS;
