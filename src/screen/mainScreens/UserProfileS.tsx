import React from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Box, Text } from 'native-base'
import AuthStore from '../../store/AuthStore/auth-store'
import Link from '../../components/Link'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../assets/colors/colors'
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons'
import ArrowBack from '../../components/ArrowBack'
import arrowLeftBack from '../../assets/images/arrow-left.png'
import PrivacyPolicy from '../../components/PrivacyPolicy'
import { routerConstants } from '../../constants/routerConstants'
import userImg from '../../assets/images/User.png'

type UserProfileSProps = {
	navigation: NavigationProp<ParamListBase>
}
const UserProfileS = ({ navigation }: UserProfileSProps) => {
	const { user, logOut } = AuthStore

	const onPressGoBack = () => {
		navigation.navigate(routerConstants.HOME)
	}
	const onPressLogOut = () => {
		logOut()
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
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={4} mt={2} flex={1} justifyContent={'space-between'}>
				<Box>
					<Box>
						<ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack} />
					</Box>

					<Box mb={10} mt={5} alignItems={'flex-start'}>
						<Box flexDirection={'row'} justifyContent={'flex-end'} alignItems={'center'}>
							<Box mr={2}>
								<Image style={{ width: 64, height: 64 }} source={userImg} />
							</Box>
							<Box flex={1}>
								<Text fontSize={18} fontWeight={'bold'}>
									{user.firstName} {user.lastName}
								</Text>

								<Box>
									<TouchableOpacity onPress={onPressEditProfile}>
										<Text color={colors.gray} fontSize={14} fontWeight={'600'}>
											Edit profile
										</Text>
									</TouchableOpacity>
								</Box>
							</Box>
						</Box>
					</Box>
					<Box
						flexDirection={'row'}
						alignItems={'center'}
						pb={4}
						mt={4}
						borderBottomWidth={1}
						borderColor={colors.grayLight}
					>
						<FontAwesome5 name="clipboard-list" size={18} color="black" />
						<Box ml={1}>
							<Link styleText={styles.text} onPress={onPressOrderHandler} text={'Orders'} />
						</Box>
					</Box>
					<Box
						flexDirection={'row'}
						alignItems={'center'}
						pb={4}
						mt={4}
						borderBottomWidth={1}
						borderColor={colors.grayLight}
					>
						<Ionicons name="md-location" size={18} color="black" />
						<Link styleText={styles.text} onPress={onPressGoAddress} text={'Address'} />
					</Box>
					<Box flexDirection={'row'} mt={4} alignItems={'center'}>
						<Entypo name="log-out" size={18} color="black" />
						<Link styleText={styles.text} onPress={onPressLogOut} text={'Logout'} />
					</Box>
				</Box>
				<PrivacyPolicy />
			</Box>
		</BaseWrapperComponent>
	)
}
const styles = StyleSheet.create({
	text: {
		fontSize: 17,
		marginLeft: 10,
		fontWeight: '500',
	},
})
export default UserProfileS;
