import React from 'react'
import { Box, Text } from 'native-base'
import { Linking, StyleSheet, View } from 'react-native'
import ModalPopup from '../pop-up'
import { colors } from '../../assets/colors/colors'
import { StoreType } from '../../api/storesApi'
import Link from '../Link'
import { Feather, Fontisto, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import {
	capitalizeFirstLetter,
	getCurrentDayName,
	getCurrentUntilTimeStoreTo,
	isCurrentTimeInRange,
} from '../../utils/utils'
import { getFormattedAddress } from '../MapViews/utils'
import { PhoneNumberComponent } from '../PhoneNumberLink'
import { getInfoAboutStoreWorkTime } from '../list-viewer/utils'

type PopUpAboutStoreProps = {
	show: boolean
	currentStore: StoreType
	onClose: () => void
}
/*const test = {
	monday: 'Closed',

	tuesday: '10:00 - 03:00',
	wednesday: '10:19 - 15:05',
	thursday: 'Closed',
	friday: 'Closed',
	saturday: 'Closed',
	sunday: 'Closed',
}*/
const PopUpAboutStore = ({ show, onClose, currentStore }: PopUpAboutStoreProps) => {
	const workingHoursArray = Object.entries(currentStore?.workingHours ?? {})

	const isOpenStoreNow = isCurrentTimeInRange(currentStore?.workingHours)
	const untilTimeStoreTo = getCurrentUntilTimeStoreTo(currentStore?.workingHours)
	const currentDayOfWeek = getCurrentDayName()

	const formatted_address = getFormattedAddress({
		fullAddress: currentStore?.address,
		location: currentStore?.location,
	})
	const openWebsiteLink = (url: string) => {
		Linking.openURL(url)
	}
	const initRegion = {
		latitude: currentStore?.location?.coordinates[1],
		longitude: currentStore?.location?.coordinates[0],
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	}
	if (!currentStore?.location) {
		return <View style={styles.container} />
	}
	return (
		<ModalPopup visible={show} onClose={onClose}>
			<Box flex={1} w={'100%'} alignItems={'flex-start'} justifyContent={'space-between'}>
				<Text fontSize={22} fontWeight={'700'} mb={2}>
					{currentStore?.name}
				</Text>
				<Text mb={2}>{currentStore?.description}</Text>
				<Box flexDirection={'row'} mb={2} alignItems={'center'}>
					<SimpleLineIcons name="location-pin" size={24} color={'#BABABA'} />
					<Text fontSize={18} ml={2}>
						{currentStore?.address?.city} {currentStore?.address?.street}{' '}
						{currentStore?.address?.house}
					</Text>
				</Box>
				<Box alignItems={'flex-start'}>
					<Box justifyContent={'flex-end'} alignItems={'center'} flexDirection={'row'}>
						<Ionicons name="time-outline" size={27} color={'#BABABA'} />
						<Text
							ml={1}
							fontSize={18}
							fontWeight={'600'}
							color={isOpenStoreNow ? colors.green : colors.red}
						>
							{isOpenStoreNow ? 'Open' : 'Closed'}
						</Text>
						<Text color={colors.grayLight} fontSize={22}>
							{' '}
							|{' '}
						</Text>
						<Text fontWeight={'400'} width={200} fontSize={18}>
							Closes: {untilTimeStoreTo}
						</Text>
					</Box>
					<Box ml={8} mb={2} alignItems={'flex-start'}>
						{workingHoursArray?.map((day) => {
							const checkCurrentWorkDay = currentDayOfWeek === day[0]
							return (
								<Box flexDirection={'row'} w={'60%'} justifyContent={'space-between'} key={day[0]}>
									<Text fontWeight={checkCurrentWorkDay ? '700' : '400'} textAlign={'right'}>
										{capitalizeFirstLetter(day[0])}:{' '}
									</Text>
									<Text fontWeight={checkCurrentWorkDay ? '700' : '400'} textAlign={'right'}>
										{day[1]}
									</Text>
								</Box>
							)
						})}
					</Box>
				</Box>
				{currentStore?.website && (
					<Box flexDirection={'row'} mb={5} alignItems={'center'}>
						<Fontisto name="world-o" size={24} color={'#BABABA'} />
						<Link
							styleLink={styles.linkWebSite}
							onPress={() => openWebsiteLink(currentStore?.website)}
							text={currentStore?.website}
						/>
					</Box>
				)}
				{currentStore?.phone && (
					<Box flexDirection={'row'} alignItems={'center'}>
						<Feather name="phone-call" size={24} color={'#BABABA'} />{' '}
						<PhoneNumberComponent phoneNumber={currentStore?.phone} />
					</Box>
				)}

				<Box w={'100%'} mt={2} mb={2} flexGrow={1} h={300}>
					<MapView style={styles.mapView} initialRegion={initRegion} provider={PROVIDER_GOOGLE}>
						<Marker
							coordinate={{
								latitude: initRegion?.latitude,
								longitude: initRegion?.longitude,
							}}
							title={formatted_address ?? ''}
						/>
					</MapView>
				</Box>
				{/* <Link styleText={styles.styleTextLink} onPress={onPressLink} text={'Legal information'}/>*/}
			</Box>
		</ModalPopup>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mapView: {
		width: '100%',
		height: '100%',
	},
	linkWebSite: {
		marginLeft: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.grayDarkLight,
	},
	styleTextLink: {
		color: colors.black,
	},
})

export default PopUpAboutStore
