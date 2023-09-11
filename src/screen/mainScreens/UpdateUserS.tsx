import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import ArrowBack from '../../components/ArrowBack'
import arrowLeftBack from '../../assets/images/arrow-left.png'
import { Box, Text } from 'native-base'
import AuthStore, { AddressType } from '../../store/AuthStore/auth-store'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { colors } from '../../assets/colors/colors'
import { validateEmail } from '../../utils/utils'
import { useFormik } from 'formik'
import { CountryData, countryDataDefault, UserRegisterDataType } from '../authScreens/RegisterS'
import PhoneNumberField from '../../components/PhoneField'
import rootStore from '../../store/RootStore/root-store'

type UpdateUserSProps = {
	navigation: NavigationProp<ParamListBase>
}
type DataType = {
	email: string
	password: string
	firstName: string
	lastName: string
	phone: string
	confirmPassword: string
}
const UpdateUserS = ({ navigation }: UpdateUserSProps) => {
	const { user } = AuthStore
	const { AuthStoreService } = rootStore
	const [isValidPhone, setIsValidPhone] = useState(true)
	const [countryCode, setCountryCode] = useState<CountryData>(countryDataDefault)

	const onSubmit = (values: DataType) => {
		if(!isValidPhone && values.phone) return
		const formattedPhoneNumber = `+${countryCode.callingCode[0]}${values.phone}`
		AuthStoreService.updateUser({
			email: values.email,
			password: values.password,
			phone: formattedPhoneNumber,
			firstName: values.firstName,
			lastName: values.lastName
		}).then((data) => {
			if(data) {
				navigation.goBack()
			}
		})
		/*console.log({
			email: values.email,
			password: values.password,
			phone: values.phone.length ? formattedPhoneNumber : '',
			firstName: values.firstName,
			lastName: values.lastName,
		})*/
	}
	const onPressGoBack = () => {
		navigation.goBack()
	}
	const { handleChange, handleBlur, touched, handleSubmit, values, errors, setTouched } = useFormik(
		{
			initialValues: {
				email: user.email,
				password: '',
				confirmPassword: '',
				firstName: user.firstName,
				lastName: user.lastName,
				phone: '',
			},
			onSubmit: onSubmit,
			validateOnChange: false,
			validateOnMount: false,
			validateOnBlur: false,
			validate: (values) => {
				const errors = {}
				if (values.phone === '') {
					console.log('false')
					setTouched({ phone: false })
				}
				if (!!(user.email !== values.email && !validateEmail(values.email))) {
					if (touched.email) {
						errors['email'] = true
					}
				}
				if (!!(values.password.length && values.password.length <= 5) && touched.password) {
					errors['password'] = true
				}
				if (
					!!(values.password.length && values.password !== values.confirmPassword) &&
					touched.confirmPassword
				) {
					errors['confirmPassword'] = true
				}
				return errors
			},
		}
	)
	const onValidNumberHandler = (isValidNumber: boolean) => {
		setIsValidPhone(isValidNumber)
	}
	const onChangeCountry = (country) => {
		setIsValidPhone(true)
		setCountryCode(country)
	}

	const disabledBtnSignUp =
		!!(errors.email && !validateEmail(values.email.trim())) ||
		!!(errors.password && values.password.length <= 5) ||
		!!(errors.confirmPassword && !values.confirmPassword) ||
		!!(touched.phone && !isValidPhone && values.phone !== '')
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={4} mt={2}>
				<ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack} />
				<Box mt={2}>
					<Box flexDirection={'row'}>
						<Box flex={1}>
							<TextInput
								value={values.firstName}
								onChangeText={handleChange('firstName')}
								label={'First name'}
								borderRadius={16}
							/>
						</Box>
						<Box ml={1} flex={1}>
							<TextInput
								borderRadius={16}
								value={values.lastName}
								onChangeText={handleChange('lastName')}
								label={'Last name'}
							/>
						</Box>
					</Box>
					<Box mt={3}>
						<Text mb={1} color={colors.gray} fontWeight={'500'}>
							Current phone: <Text color={colors.blue}>{user.phone}</Text>
						</Text>
						<PhoneNumberField
							onValidNumber={onValidNumberHandler}
							onChangeCountry={onChangeCountry}
							errorMessage={'Incorrect phone number'}
							isInvalid={touched.phone && !isValidPhone && values.phone !== ''}
							isRequired={true}
							defaultValue={values.phone}
							onChangeText={handleChange('phone')}
						/>
					</Box>
					<TextInput
						onChangeText={handleChange('email')}
						value={values.email}
						onBlur={handleBlur('email')}
						errorMessage={
							!validateEmail(values.email.trim()) &&
							errors.email &&
							'Incorrect email address entered'
						}
						borderRadius={16}
						isInvalid={!!(errors.email && !validateEmail(values.email.trim()))}
						label={'E-mail'}
					/>
					<TextInput
						onChangeText={handleChange('password')}
						placeholder={'Password*'}
						onBlur={handleBlur('password')}
						isInvalid={!!(errors.password && values.password.length <= 5)}
						errorMessage={
							!!errors.password &&
							values.password.length <= 5 &&
							'The password must be at least 6 characters long'
						}
						value={values.password}
						isRequired={true}
						type={'password'}
						borderRadius={16}
						label={'Password'}
					/>
					<TextInput
						onChangeText={handleChange('confirmPassword')}
						onBlur={handleBlur('confirmPassword')}
						value={values.confirmPassword}
						errorMessage={
							(touched.confirmPassword && errors.confirmPassword && !values.confirmPassword) ||
							(values.confirmPassword !== values.password && touched.confirmPassword)
								? 'The passwords dont match'
								: ''
						}
						isRequired={true}
						isInvalid={
							!!(touched.confirmPassword && errors.confirmPassword && !values.confirmPassword) ||
							!!(values.confirmPassword !== values.password && touched.confirmPassword)
						}
						type={'password'}
						borderRadius={16}
						label={'Confirm Password'}
					/>
				</Box>
				<Box mt={5}>
					<Button
						disabled={disabledBtnSignUp}
						onPress={handleSubmit}
						backgroundColor={disabledBtnSignUp ? colors.grayLight : colors.green}
						title={'Save'}
					/>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
}

export default UpdateUserS
