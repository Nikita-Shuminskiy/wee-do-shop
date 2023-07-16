import React, { useState } from 'react'
import { Box, FormControl, Input, WarningOutlineIcon } from 'native-base'
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { InterfaceInputProps } from 'native-base/lib/typescript/components/primitives/Input/types'
import { colors } from '../assets/colors/colors'

type InputCustomProps = {
	label?: string
	errorMessage?: string
	error?: boolean
	textErrorStyles?: StyleProp<TextStyle>
	iconRight?: JSX.Element,
	iconLeft?: JSX.Element,
	onClearText?: () => void
} & InterfaceInputProps
const InputCustom = ({
											 label,
											 onChangeText,
											 placeholder,
											 errorMessage,
											 error,
											 textErrorStyles,
											 keyboardType,
											 onBlur,
											 style,
											 value,
											 isRequired,
											 isInvalid,
											 type = 'text',
											 iconRight,
											 iconLeft,
											 ...rest
										 }: InputCustomProps) => {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<Box pt={2} width={'100%'}>
			<FormControl isInvalid={isInvalid} isRequired={isRequired}>
				{label && <FormControl.Label>{label}</FormControl.Label>}
				<Input
					value={value}
					style={style}
					borderColor={colors.grayLight}
					keyboardType={keyboardType}
					onBlur={onBlur}
					onChangeText={onChangeText}
					placeholder={placeholder}
					h={10}
					mt={1}
					InputRightElement={
						type === 'text' ? (
							<Box mr={2}>{iconRight}</Box>
						) : (
							<TouchableOpacity
								style={{ marginRight: 10 }}
								onPress={() => setShowPassword(!showPassword)}
							>
								<Feather name={!showPassword ? 'eye' : 'eye-off'} size={24} color={colors.gray} />
							</TouchableOpacity>
						)
					}
					InputLeftElement={<Box mr={2}>{iconLeft}</Box>}
					type={type === 'text' ? 'text' : showPassword ? 'text' : 'password'}
					{...rest}
				/>
				<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size='xs' />}>
					{errorMessage ? errorMessage : 'Field is required'}
				</FormControl.ErrorMessage>
			</FormControl>
		</Box>
	)
}

export default InputCustom
