import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import AuthStore from '../../store/AuthStore/auth-store'
import { Box, Image, Text } from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import arrowLeft from '../../assets/images/arrow-left.png'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import CustomInput from '../../components/TextInput'
import { validateEmail } from '../../utils/utils'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../assets/colors/colors'
import { observer } from 'mobx-react-lite'
import Button from '../../components/Button'
import { StyleSheet } from 'react-native'
import { routerConstants } from '../../constants/routerConstants'
import logoImg from '../../assets/images/logoWeeDo.png'
import { createAlert } from '../../components/Alert'

type ForgotPasswordSProps = {
	navigation: NavigationProp<ParamListBase>
}
const ForgotPasswordS = observer(({ navigation }: ForgotPasswordSProps) => {
	const { forgotPassword, setInfoResetPassword, infoResetPassword } = AuthStore
	const [error, setError] = useState(false)
	const onPressGoBack = () => {
		navigation.goBack()
	}
	const handleSubmit = () => {
		if (!validateEmail(infoResetPassword?.email?.trim())) {
			setError(true)
			return
		}
		console.log(infoResetPassword)
		forgotPassword(infoResetPassword.email)
			.then((data) => {
				if (data.success) {
					navigation.navigate(routerConstants.RESET_PASSWORD)
				}
			})
			.catch((data) => {
				createAlert({
					title: 'Message',
					message: "That email doesn't exist.",
					buttons: [{ text: 'Ok', style: 'default' }],
				})
			})
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box mt={5} mb={5} position={'absolute'} left={5}>
				<ArrowBack goBackPress={onPressGoBack} img={arrowLeft} />
			</Box>
			<Box paddingX={4} w={'100%'} alignItems={'center'} justifyContent={'flex-start'} flex={1}>
				<Image w={247} h={318} alt={'logo'} source={logoImg} mt={12} />
				<Box width={'100%'} mt={5}>
					<CustomInput
						onChangeText={(text) => setInfoResetPassword('email', text)}
						value={infoResetPassword?.email}
						errorMessage={
							!validateEmail(infoResetPassword?.email?.trim()) &&
							error &&
							'Incorrect email address entered'
						}
						isInvalid={error && !validateEmail(infoResetPassword?.email?.trim())}
						isRequired={true}
						placeholder={'Enter your email'}
						borderRadius={16}
						type={'text'}
						iconRight={
							<MaterialCommunityIcons name={'email-edit-outline'} size={24} color={colors.gray} />
						}
					/>
					<Box mt={3}>
						<Button
							styleText={styles.textBtn}
							backgroundColor={colors.green}
							disabled={error && !validateEmail(infoResetPassword?.email.trim())}
							onPress={handleSubmit}
							title={'Sign in'}
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

export default ForgotPasswordS
