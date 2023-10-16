import React from 'react'
import { Box, Text } from 'native-base'
import userImg from '../assets/images/userGreen.png'
import likeImg from '../assets/images/likeGreen.png'
import { Image, TouchableOpacity } from 'react-native'
import { routerConstants } from '../constants/routerConstants'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { getFormattedAddress } from './MapViews/utils'
import { AddressType } from '../store/AuthStore/auth-store'
import StoresStore from '../store/StoresStore/stores-store'
import rootStore from '../store/RootStore/root-store'

export type HeaderUserType = {
	navigation: NavigationProp<ParamListBase>
	address: AddressType
	setFavoritesStores?: () => void
}
export const HeaderUser = ({ navigation, address, setFavoritesStores }: HeaderUserType) => {
	const formatted_address = getFormattedAddress(address)
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
	return (
		<Box mt={6} mb={2} w={'100%'} flexDirection={'row'} justifyContent={'space-between'}>
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
		</Box>
	)
}

export default HeaderUser
