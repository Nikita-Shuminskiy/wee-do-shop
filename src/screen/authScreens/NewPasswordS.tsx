import React, { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { Box, Image } from 'native-base'
import logoImg from '../../assets/images/logoWeeDo.png'
import CustomInput from '../../components/TextInput'
import { colors } from '../../assets/colors/colors'
import Button from '../../components/Button'
import { StyleSheet } from 'react-native'
import AuthStore from '../../store/AuthStore/auth-store'
import { routerConstants } from '../../constants/routerConstants'
import { observer } from 'mobx-react-lite'
import { LoadingEnum } from '../../store/types/types'
import NotificationStore from '../../store/NotificationStore'
import { useTranslation } from "react-i18next";

type NewPasswordSProps = {
	navigation: NavigationProp<ParamListBase>
}
const NewPasswordS = observer(({ navigation }: NewPasswordSProps) => {
	const {t} = useTranslation(['login', 'newPassword', 'errors']);
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)
	const { resetPassword, infoResetPassword } = AuthStore
	const { setIsLoading } = NotificationStore
	const handleSubmit = () => {
		if (password.length <= 5) {
			setError(true)
			return
		}
		setIsLoading(LoadingEnum.fetching)
		resetPassword({
			verificationCode: infoResetPassword.verificationCode,
			email: infoResetPassword.email,
			password: password,
		})
			.then((data) => {
				if (data.success) {
					navigation.navigate(routerConstants.LOGIN)
				}
			})
			.finally(() => {
				setIsLoading(LoadingEnum.success)
			})
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={4} w={'100%'} alignItems={'center'} justifyContent={'flex-start'} flex={1}>
				<Image w={247} h={318} alt={'logo'} source={logoImg} mt={12} />
				<Box width={'100%'} mt={5}>
					<CustomInput
						onChangeText={(text) => {
							setPassword(text)
							setError(false)
						}}
						value={password}
						isInvalid={error}
						errorMessage={!!error && t('errors:passwordMustBe')}
						isRequired={true}
						placeholder={t('enterPassword')}
						borderRadius={16}
						type={'password'}
					/>
					<Box mt={3}>
						<Button
							styleText={styles.textBtn}
							backgroundColor={colors.green}
							disabled={error}
							onPress={handleSubmit}
							title={t('newPassword:reset')}
						/>
					</Box>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
})
const styles = StyleSheet.create({
	linkCourierText: {
		fontSize: 18,
		color: colors.gray,
	},
	textBtn: {
		color: colors.white,
	},
	styleContainerBtn: {
		marginTop: 10,
		borderWidth: 1,
		borderColor: colors.gray,
	},
})

export default NewPasswordS
