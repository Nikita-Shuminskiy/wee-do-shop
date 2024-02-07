import React, {useEffect} from "react"
import {BaseWrapperComponent} from "../../components/baseWrapperComponent"
import {NavigationProp, ParamListBase} from "@react-navigation/native"
import {Box, Image, Text} from "native-base"
import AuthStore from "../../store/AuthStore/auth-store"
import { NativeModules, StyleSheet, TouchableOpacity } from "react-native";
import {colors} from "../../assets/colors/colors"
import ArrowBack from "../../components/ArrowBack"
import arrowLeftBack from "../../assets/images/arrow-left.png"
import {routerConstants} from "../../constants/routerConstants"
import userImg from "../../assets/images/userMockAvatar.png"
import {observer} from "mobx-react-lite"
import settingImg from "../../assets/images/setting.png"
import privacyImg from "../../assets/images/courierImages/privacy.png"
import termsImg from "../../assets/images/courierImages/terms.png"
import logoutImg from "../../assets/images/courierImages/Log-out.png"
import myOrdersImg from "../../assets/images/courierImages/my-orders.png"
import arrowRightImg from "../../assets/images/courierImages/arrow-right.png"
import locationImg from "../../assets/images/location.png"
import deleleImg from "../../assets/images/delete.png"
import rootStore from "../../store/RootStore/root-store"
import OrderStore from "../../store/OrderStore/order-store"
import {createAlert} from "../../components/Alert"
import {useTranslation} from "react-i18next"
import Constants from "expo-constants"
import SelectPicker from "../../components/select-picker"

type UserProfileSProps = {
	navigation: NavigationProp<ParamListBase>
}
const UserProfileS = observer(({ navigation }: UserProfileSProps) => {
	const {t, i18n} = useTranslation(['profile', 'registration', 'common']);
	const { user } = AuthStore
	const { completedOrdersNum } = OrderStore
	const { OrderService, AuthStoreService } = rootStore
	const formattedAddress = `${user?.address?.fullAddress?.country}, ${user?.address?.fullAddress?.city}`
	const onPressGoBack = () => {
		navigation.navigate(routerConstants.HOME)
	}
	const onPressLogOutHandler = ()=> {
		navigation.navigate(routerConstants.LOGIN)
		AuthStoreService.logOut()
	}
	const onPressOrderHandler = () => {
		navigation.navigate(routerConstants.ORDERS)
	}
	const onPressGoAddress = () => {
		navigation.navigate(routerConstants.ADDRESS)
	}
	const onPressEditProfile = () => {
		navigation.navigate(routerConstants.USER_UPDATE)
	}
	const onPressPrivacy = () => {
		navigation.navigate(routerConstants.PRIVACY_POLICE)
	}
	const onPressTermOfUse = () => {
		navigation.navigate(routerConstants.TERM_SERVICE)
	}
	const onPressDeleteUser = () => {
		const onPressDelete = () => {
			navigation.navigate(routerConstants.LOGIN)
			AuthStoreService.deleteUser()
		}
		createAlert({
			title: t('common:Message'),
			message: t('reallyDeleteAccount'),
			buttons: [{ text: t('common:exit'), style: 'default' },{ text: t('common:delete'), style: 'default', onPress:  onPressDelete}],
		})

	}
	useEffect(() => {
		OrderService.getOrders({
			inProgressOrdersNum: true,
		})
	}, [])
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={5} mt={5} justifyContent={'space-between'} w={'100%'} flex={1}>
				<Box>
					<ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack} />
				</Box>
				<Box alignItems={'center'}>
					<Image mb={1} w={90} h={90} alt={'logo-we-do'} source={userImg} />
					<Text fontSize={24} mt={1} fontWeight={'500'}>
						{user?.firstName} {user?.lastName}
					</Text>
					{user?.address?.fullAddress?.country && (
						<Text fontSize={15} color={colors.gray} fontWeight={'500'}>
							{formattedAddress}
						</Text>
					)}
					<Box
						mt={2}
						flexDirection={'row'}
						alignItems={'center'}
						backgroundColor={colors.grayLightWhite}
						p={4}
						borderRadius={16}
						w={'100%'}
					>
						<Image w={8} h={8} alt={'img-order'} source={myOrdersImg} />
						<Box ml={2} flex={1}>
							<TouchableOpacity onPress={onPressOrderHandler}>
								<Box
									style={{
										justifyContent: 'space-between',
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<Box>
										<Text color={colors.black} fontWeight={'700'} fontSize={12}>
											{t('history')}
										</Text>
										<Text color={colors.gray} fontWeight={'500'} fontSize={12}>
											{t('inProgress')}: {completedOrdersNum ?? 0}
										</Text>
									</Box>
									<Image
										source={arrowRightImg}
										alt={'img-arrow'}
										style={{ width: 24, height: 24 }}
									/>
								</Box>
							</TouchableOpacity>
						</Box>
					</Box>
				</Box>
				<Box maxWidth={200}>
					<SelectPicker
						arrItem={[
							{value: 'ru', name: t('ru')},
							{value: 'en', name: t('en')},
						]}
						onValueChange={(val) => {
							i18n.changeLanguage(val, (err, t) => {
								if (err) return console.log('something went wrong loading', err);
								//NativeModules.DevSettings.reload();
							})
						}}
						values={i18n.language.slice(0,2)}
						label={t('changeLanguage')}
						onReturnValueId={true}
					/>
				</Box>
				<Box flex={1} mt={2} justifyContent={'flex-start'}>
					<TouchableOpacity onPress={onPressEditProfile}>
						<Box
							flexDirection={'row'}
							alignItems={'flex-start'}
							pb={4}
							mt={4}
							borderBottomWidth={1}
							borderColor={colors.grayLight}
						>
							<Image w={5} h={5} alt={'img'} source={settingImg} />
							<Box
								flexDirection={'row'}
								flex={1}
								justifyContent={'space-between'}
								w={'100%'}
								ml={1}
							>
								<Text style={styles.text}>{t('editProfile')}</Text>
								<Image source={arrowRightImg} alt={'img-arrow'} style={{ width: 24, height: 24 }} />
							</Box>
						</Box>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressGoAddress}>
						<Box
							flexDirection={'row'}
							alignItems={'flex-start'}
							pb={4}
							mt={4}
							borderBottomWidth={1}
							borderColor={colors.grayLight}
						>
							<Image w={5} h={5} alt={'img'} source={locationImg} />
							<Box
								flexDirection={'row'}
								flex={1}
								justifyContent={'space-between'}
								w={'100%'}
								ml={1}
							>
								<Text style={styles.text}>{t('address')}</Text>
								<Image source={arrowRightImg} alt={'img-arrow'} style={{ width: 24, height: 24 }} />
							</Box>
						</Box>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressPrivacy}>
						<Box
							flexDirection={'row'}
							alignItems={'flex-start'}
							pb={4}
							mt={4}
							borderBottomWidth={1}
							borderColor={colors.grayLight}
						>
							<Image w={5} h={5} alt={'img'} source={privacyImg} />
							<Box
								flexDirection={'row'}
								flex={1}
								justifyContent={'space-between'}
								w={'100%'}
								ml={1}
							>
								<Text style={styles.text}>{t('privacyPolice:privacyPolice')}</Text>
								<Image source={arrowRightImg} alt={'img-arrow'} style={{ width: 24, height: 24 }} />
							</Box>
						</Box>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressTermOfUse}>
						<Box
							flexDirection={'row'}
							alignItems={'flex-start'}
							pb={4}
							mt={4}
							borderBottomWidth={1}
							borderColor={colors.grayLight}
						>
							<Image w={5} h={5} alt={'img'} source={termsImg} />
							<Box
								flexDirection={'row'}
								flex={1}
								justifyContent={'space-between'}
								w={'100%'}
								ml={1}
							>
								<Text style={styles.text}>{t('privacyPolice:termsOfService')}</Text>
								<Image source={arrowRightImg} alt={'img-arrow'} style={{ width: 24, height: 24 }} />
							</Box>
						</Box>
					</TouchableOpacity>
					<TouchableOpacity onPress={onPressLogOutHandler}>
						<Box
							flexDirection={'row'}
							alignItems={'center'}
							mt={4}
							borderColor={colors.grayLight}
						>
							<Image w={5} h={5} alt={'img'} source={logoutImg} />
							<Box
								flexDirection={'row'}
								flex={1}
								justifyContent={'space-between'}
								w={'100%'}
								ml={1}
							>
								<Text style={{ ...styles.text, color: colors.red }}>{t('logOut')}</Text>
								<Image source={arrowRightImg} alt={'img-arrow'} style={{ width: 24, height: 24 }} />
							</Box>
						</Box>
					</TouchableOpacity>
				</Box>
				<TouchableOpacity onPress={onPressDeleteUser}>
					<Box
						flexDirection={'row'}
						alignItems={'center'}
						justifyContent={'center'}
						pb={4}
						mt={0}
						borderColor={colors.grayLight}
					>
						<Image w={5} h={5} alt={'img'} source={deleleImg} />
						<Text style={{ ...styles.text, color: colors.red }}>{t('deleteAccount')}</Text>
					</Box>
				</TouchableOpacity>
				<Text textAlign={'center'} color={colors.gray}>{`${t('common:appVersion')} ${Constants?.expoConfig?.version}`}</Text>
			</Box>
		</BaseWrapperComponent>
	)
})
const styles = StyleSheet.create({
	text: {
		fontSize: 17,
		marginLeft: 10,
		fontWeight: '500',
	},
})
export default UserProfileS
