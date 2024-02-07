import React from 'react'
import { Box, Text } from 'native-base'
import userImg from '../assets/images/userGreen.png'
import likeImg from '../assets/images/likeGreen.png'
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { routerConstants } from '../constants/routerConstants'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { getFormattedAddress } from './MapViews/utils'
import AuthStore, { AddressType } from '../store/AuthStore/auth-store'
import StoresStore from '../store/StoresStore/stores-store'
import rootStore from '../store/RootStore/root-store'
import { colors } from "../assets/colors/colors";
import { observer } from "mobx-react-lite";
import { validateEmail } from "../utils/utils";
import Button from "./Button";
import { useTranslation } from "react-i18next";

export type HeaderUserType = {
	navigation: NavigationProp<ParamListBase>
	address: AddressType
	setFavoritesStores?: () => void
}
export const HeaderUser = observer(({ navigation, address, setFavoritesStores }: HeaderUserType) => {
	const {t} = useTranslation(['login', 'common']);
	const formatted_address = getFormattedAddress(address)
	const {isAuth} = AuthStore
	const onPressFavoriteHandler = () => {
		setFavoritesStores?.()
		navigation.navigate(routerConstants.FAVORITE)
	}
	const onPressUserHandler = () => {
		navigation.navigate(routerConstants.PROFILE_USER)
	}
	const onPressUserAddressHandler = () => {
		navigation.navigate(routerConstants.ADDRESS)
	}
	const onPressSignIn = () => {
		navigation.navigate(routerConstants.LOGIN)
	}
	const onPressSignUp = () => {
		navigation.navigate(routerConstants.REGISTRATION)
	}
	return (
		<Box mt={6} mb={2} w={'100%'} flexDirection={'row'} justifyContent={isAuth ? 'space-between' : 'center'}>
			{
				isAuth ? <>
						<TouchableOpacity onPress={onPressUserHandler}>
							<Image style={{ width: 32, height: 32 }} source={userImg} alt={'user'} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{ alignItems: 'center', width: '70%' }}
							onPress={onPressUserAddressHandler}
						>
							<Text fontSize={14} w={'60%'} textAlign={'center'} fontWeight={'600'}>
								{formatted_address}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onPressFavoriteHandler}>
							<Image style={{ width: 32, height: 28 }} source={likeImg} alt={'like'} />
						</TouchableOpacity>
					</> :
					<Box flexDirection={'row'} justifyContent={'space-evenly'} flex={1}>
						<Button
							styleText={styles.textBtn}
							backgroundColor={colors.green}
							onPress={onPressSignIn}
							title={t('signIn')}
						/>
						<Button
							styleText={{ color: colors.black }}
							styleContainer={styles.styleContainerBtn}
							onPress={onPressSignUp}
							title={t('signUp')}
						/>
					</Box>
			}

		</Box>
	)
})
const styles = StyleSheet.create({
	textBtn: {
		color: colors.white,
	},
	styleContainerBtn: {
		marginTop: 0,
		borderWidth: 1,
		borderColor: colors.gray,
	},
})

export default HeaderUser
