import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Box, Text } from 'native-base'

import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { colors } from '../assets/colors/colors'
import { observer } from 'mobx-react-lite'
import rootStore from '../store/RootStore/root-store'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { routerConstants } from '../constants/routerConstants'
import AuthStore from '../store/AuthStore/auth-store'

const CELL_COUNT = 4
type PhoneVerificationProps = {
	navigation: NavigationProp<ParamListBase>
}
const PhoneVerificationCode = observer(({ navigation }: PhoneVerificationProps) => {
	const { resetPassword, infoResetPassword, setInfoResetPassword } = AuthStore
	const [isValid, setIsValid] = useState(true)
	const [statusServer, setStatusServer] = useState<'warning' | '' | 'error'>('')
	const handleCodeChange = (newCode: string) => {
		setInfoResetPassword('validationCode', newCode)
		setStatusServer('')
		setIsValid(true)
	}
	useEffect(() => {
		if (infoResetPassword.validationCode.trim().length === CELL_COUNT) {
			console.log(infoResetPassword)
			resetPassword(infoResetPassword)
				.then((data) => {
					if (data.success) {
						alert('ok')
						setIsValid(true)
						navigation.navigate(routerConstants.FORGOT_PASSWORD, { from: 'reset' })
					}
				})
				.catch((data) => {
					setIsValid(false)
					console.log(data)
					setStatusServer('error')
				})
		}
	}, [infoResetPassword.validationCode])

	const ref = useBlurOnFulfill({ value: infoResetPassword.validationCode, cellCount: CELL_COUNT })

	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: infoResetPassword.validationCode,
		setValue: handleCodeChange,
	})

	return (
		<View>
			<CodeField
				ref={ref}
				{...props}
				// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
				value={infoResetPassword.validationCode}
				onChangeText={handleCodeChange}
				cellCount={CELL_COUNT}
				rootStyle={styles.codeFieldRoot}
				keyboardType="number-pad"
				textContentType="oneTimeCode"
				renderCell={({ index, symbol, isFocused }) => (
					<Box
						key={index}
						mr={3}
						style={[
							styles.boxCell,
							isFocused && styles.activeCell,
							(statusServer === 'warning' || statusServer === 'error') && styles.failedCodeBack,
						]}
						backgroundColor={'#F5F5F6'}
						borderRadius={16}
						alignItems={'center'}
						justifyContent={'center'}
					>
						<Text
							style={[styles.cell, isFocused && styles.focusCell]}
							onLayout={getCellOnLayoutHandler(index)}
						>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					</Box>
				)}
			/>
			{!isValid && (
				<Text mt={2} fontSize={15} color={colors.red}>
					Incorrect confirmation code
				</Text>
			)}
		</View>
	)
})
const styles = StyleSheet.create({
	failedCodeBack: {
		borderWidth: 1,
		borderColor: colors.red,
	},
	activeCell: {
		borderWidth: 1,
		borderColor: colors.blue,
	},
	boxCell: { width: 56, height: 64 },
	root: { flex: 1, padding: 10 },
	title: { textAlign: 'center', fontSize: 22 },
	codeFieldRoot: { justifyContent: 'flex-start' },
	cell: {
		color: colors.black,
		lineHeight: 38,
		fontSize: 22,
		textAlign: 'center',
	},
	focusCell: {
		borderColor: '#000',
	},
})
export default PhoneVerificationCode
