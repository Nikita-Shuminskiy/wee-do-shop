import React, { memo, useCallback, useEffect, useState } from "react";
import { BaseWrapperComponent } from '../../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import ArrowBack from '../../../components/ArrowBack'
import arrowLeftBack from '../../../assets/images/arrow-left.png'
import { Box, Text } from 'native-base'
import AuthStore from '../../../store/AuthStore/auth-store'
import TextInput from '../../../components/TextInput'
import Button from '../../../components/Button'
import { colors } from '../../../assets/colors/colors'
import { validateEmail } from '../../../utils/utils'
import { useFormik } from 'formik'
import PhoneNumberField from '../../../components/PhoneField'
import rootStore from '../../../store/RootStore/root-store'
import { OptionalUserType } from '../../../api/userApi'
import { useTranslation } from "react-i18next";
import { CountryData, countryDataDefault } from "../../authScreens/helpers";
import { schema } from "./helpers";
import { observer } from "mobx-react-lite";

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
const UpdateUserS = observer(({ navigation }: UpdateUserSProps) => {
	const {t} = useTranslation(['update_profile', 'common', 'registration', 'errors']);
	const { user } = AuthStore
	const { AuthStoreService } = rootStore
	const [countryCode, setCountryCode] = useState<CountryData>(countryDataDefault)
	const onPressGoBack = useCallback(() => {
		navigation.goBack()
	}, [])
	const onSubmit = (values: DataType) => {
		setSubmitting(true)
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
		}).finally(() => {
			setSubmitting(false)
		})
	}
	const { handleChange, isSubmitting, setFieldError, setSubmitting, handleBlur, touched, handleSubmit, values, errors, setTouched } = useFormik(
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
			validationSchema: schema(t, countryCode),
			validate: (values) => {
				const errors = {}
				if (values.phone === '') {
					setTouched({ phone: false })
				}
				return errors
			},
		}
	)

	const onChangeCountry = useCallback((country) => {
		setCountryCode(country)
	}, [])

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
								isRequired={false}
								label={t('registration:firstName')}
								borderRadius={16}
							/>
						</Box>
						<Box ml={1} flex={1}>
							<TextInput
								borderRadius={16}
								value={values.lastName}
								isRequired={false}
								onChangeText={handleChange('lastName')}
								label={t('registration:lastName')}
							/>
						</Box>
					</Box>
					<Box mt={3}>
						<Text mb={1} color={colors.gray} fontWeight={'500'}>
							{t('currentPhone')}: <Text color={colors.blue}>{user?.phone}</Text>
						</Text>
						<PhoneNumberField
							onChangeCountry={onChangeCountry}
							errorMessage={errors['phone']}
							isInvalid={touched['phone'] && Boolean(errors['phone'])}
							isRequired={false}
							defaultValue={values.phone}
							value={values.phone}
							onChangeText={handleChange('phone')}
						/>
					</Box>
					<TextInput
						onChangeText={handleChange('email')}
						value={values.email}
						onBlur={handleBlur('email')}
						errorMessage={errors['email']}
						isRequired={false}
						borderRadius={16}
						isInvalid={touched['email'] && Boolean(errors['email'])}
						label={t('registration:email')}
					/>
				</Box>
				<Box mt={5}>
					<Button
						disabled={isSubmitting}
						onPress={handleSubmit}
						backgroundColor={isSubmitting ? colors.grayLight : colors.green}
						title={t('common:save')}
					/>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default UpdateUserS
