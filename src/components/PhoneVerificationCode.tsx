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
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { routerConstants } from '../constants/routerConstants'
import AuthStore from '../store/AuthStore/auth-store'
import NotificationStore from '../store/NotificationStore/notification-store'
import { LoadingEnum } from '../store/types/types'
import { useTranslation } from "react-i18next";

const CELL_COUNT = 4
type PhoneVerificationProps = {
	navigation: NavigationProp<ParamListBase>
}
const PhoneVerificationCode = observer(({ navigation }: PhoneVerificationProps) => {
	const {t} = useTranslation(['newPassword', 'errors']);
	const { resetPassword, infoResetPassword, setInfoResetPassword, checkVerificationCode } =
		AuthStore
	const { setIsLoading } = NotificationStore
	const [isValid, setIsValid] = useState(true)
	const [statusServer, setStatusServer] = useState<'warning' | '' | 'error'>('')
	const handleCodeChange = (newCode: string) => {
		setInfoResetPassword('verificationCode', newCode)
		setStatusServer('')
		setIsValid(true)
	}
	useEffect(() => {
		if (infoResetPassword.verificationCode.trim().length === CELL_COUNT) {
			setIsLoading(LoadingEnum.fetching)
			checkVerificationCode({
				verificationCode: infoResetPassword.verificationCode,
				email: infoResetPassword.email,
			})
				.then((data) => {
					if (data.success) {
						setIsValid(true)
						navigation.navigate(routerConstants.NEW_PASSWORD, { from: 'reset' })
					}
				})
				.catch((data) => {
					setIsValid(false)
					setStatusServer('error')
					setTimeout(() => {
						setInfoResetPassword('verificationCode', '')
						setStatusServer('')
						setIsValid(true)
					}, 500)
				})
				.finally(() => {
					setIsLoading(LoadingEnum.success)
				})
		}
	}, [infoResetPassword.verificationCode])
	useEffect(() => {
		return () => {
			setInfoResetPassword('verificationCode', '')
		}
	}, [])
	const ref = useBlurOnFulfill({ value: infoResetPassword.verificationCode, cellCount: CELL_COUNT })

	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: infoResetPassword.verificationCode,
		setValue: handleCodeChange,
	})

	return (
		<View>
			<CodeField
				ref={ref}
				{...props}
				// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
				value={infoResetPassword.verificationCode}
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
					{t('errors:incorrectConfirmationCode')}
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
