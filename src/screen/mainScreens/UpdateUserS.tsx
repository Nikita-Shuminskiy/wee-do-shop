import React, { useEffect, useState } from 'react'
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
import { OptionalUserType } from '../../api/userApi'

type UpdateUserSProps = {
	navigation: NavigationProp<ParamListBase>
}
type DataType = {
	email: string
	firstName: string
	lastName: string
	phone: string
	confirmPassword: string
}
const UpdateUserS = ({ navigation }: UpdateUserSProps) => {
	const { user } = AuthStore
	const { AuthStoreService } = rootStore
	const [countryCode, setCountryCode] = useState<CountryData>(countryDataDefault)
	const onPressGoBack = () => {
		navigation.goBack()
	}
	const onSubmit = (values: DataType) => {
		if(values?.phone?.length <= 3 && touched.phone) {
			setFieldError('phone', 'true')
			return
		}
		const formattedPhoneNumber = `+${countryCode.callingCode[0]}${values.phone}`
		const dataToSend: OptionalUserType = {}
		if (values.firstName && values.firstName !== '') {
			dataToSend.firstName = values.firstName
		}
		if (values.email && values.email !== '') {
			dataToSend.email = values.email
		}
		if (values.lastName && values.lastName !== '') {
			dataToSend.lastName = values.lastName
		}
		if (values.phone && values.phone !== '') {
			dataToSend.phone = formattedPhoneNumber
		}

		AuthStoreService.updateUser(user._id, dataToSend).then((data) => {
			if (data) {
				navigation.goBack()
			}
		})
	}
	const { handleChange, setFieldError, handleBlur, touched, handleSubmit, values, errors, setTouched } = useFormik(
		{
			initialValues: {
				email: user.email,
				confirmPassword: '',
				firstName: user.firstName,
				lastName: user.lastName,
				phone: '',
			},
			onSubmit: onSubmit,
			validateOnChange: true,
			validateOnMount: false,
			validateOnBlur: false,
			validate: (values) => {
				const errors = {}
				if (values.phone === '') {
					setTouched({ phone: false })
				}
				if (!!(user.email !== values.email && !validateEmail(values.email))) {
					errors['email'] = true
				}
				return errors
			},
		}
	)

	const onChangeCountry = (country) => {
		setCountryCode(country)
	}

	const disabledBtnSignUp =
		!!(errors.email && !validateEmail(values.email.trim())) ||
		!!(touched.phone && values.phone.length <=3)
	console.log(disabledBtnSignUp);
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
							Current phone: <Text color={colors.blue}>{user?.phone}</Text>
						</Text>
						<PhoneNumberField
							onChangeCountry={onChangeCountry}
							errorMessage={'Incorrect phone number'}
							isInvalid={(touched.phone && errors.phone) && values?.phone?.length <= 3}
							isRequired={false}
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
