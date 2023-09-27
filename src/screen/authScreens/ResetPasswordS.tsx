import React from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import ArrowBack from '../../components/ArrowBack'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Box, Text } from 'native-base'
import { observer } from 'mobx-react-lite'
import AuthStore from '../../store/AuthStore/auth-store'
import { colors } from '../../assets/colors/colors'
import PhoneVerificationCode from '../../components/PhoneVerificationCode'
import Link from '../../components/Link'
import NotificationStore from '../../store/NotificationStore/notification-store'
import { LoadingEnum } from '../../store/types/types'

type ForgotPasswordSProps = {
	navigation: NavigationProp<ParamListBase>
	route: any
}
const ResetPasswordS = observer(({ navigation, route }: ForgotPasswordSProps) => {
	const { infoResetPassword, forgotPassword } = AuthStore
	const { setIsLoading } = NotificationStore

	const goBackPress = () => {
		navigation.goBack()
	}
	const onPressSendCode = () => {
		setIsLoading(LoadingEnum.fetching)
		forgotPassword(infoResetPassword.email).finally(() => {
			setIsLoading(LoadingEnum.success)
		})
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={4} alignItems={'flex-start'}>
				<Box mb={5} mt={5}>
					<ArrowBack goBackPress={goBackPress} />
				</Box>
				<Text fontSize={28}>Phone verification</Text>
				<Text fontSize={15} color={colors.gray}>
					The code was sent to{' '}
					<Text fontSize={15} color={colors.blue}>
						{infoResetPassword.email}
					</Text>
				</Text>
				<Box mt={5} mb={5} flex={1} w={'100%'}>
					<PhoneVerificationCode navigation={navigation} />
				</Box>
				<Box>
					<Link onPress={onPressSendCode} styleText={{ fontSize: 15 }} text={'Re-send code'} />
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})

export default ResetPasswordS
