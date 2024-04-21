import React, { memo, useCallback, useRef } from "react";
import PhoneInput, {PhoneInputProps} from "react-native-phone-number-input"
import {colors} from "../assets/colors/colors"
import {Box, FormControl, WarningOutlineIcon} from "native-base"
import {useTranslation} from "react-i18next"

type PhoneNumberFieldProps = PhoneInputProps & {
	isRequired: boolean
	isInvalid: boolean
	errorMessage?: any
	onChangeText?: any
	onValidNumber?: (isValid: boolean) => void
}
const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({ isRequired, isInvalid,onChangeText, onValidNumber, errorMessage, ...rest }) => {
	//const phoneInput = useRef<PhoneInput>(null)
	const {t} = useTranslation(['common']);

	const onChangeTextHandler = useCallback( (text) => {
		onChangeText(text)
		//onValidNumber?.(phoneInput.current?.isValidNumber(text))
	}, [])
	return (
		<Box w={'100%'}>
			<FormControl  isInvalid={isInvalid} isRequired={isRequired}>
				<PhoneInput
					textInputProps={{
						keyboardType: 'numeric'
					}}
					containerStyle={{
						width: '100%',
						height: 40,
						borderWidth: 1,
						borderColor: colors.grayLight,
						backgroundColor: 'transparent',
						borderRadius: 16,
						alignItems: 'center',
					}}
					textContainerStyle={{ borderRadius: 16, backgroundColor: 'transparent', height: 50 }}
					codeTextStyle={{ color: colors.gray, height: 23, fontSize: 16 }}
					textInputStyle={{ color: colors.gray, fontSize: 16 }}
					defaultCode={'TH'}
					placeholder={t('phone')}
					layout='first'
					onChangeText={onChangeTextHandler}
					{...rest}
				/>
				<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>
					{errorMessage ? errorMessage : t('fieldIsRequired')}
				</FormControl.ErrorMessage>
			</FormControl >
		</Box>
	)
}

export default memo(PhoneNumberField)
