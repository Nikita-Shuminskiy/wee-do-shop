import React, { useState } from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import AuthStore from '../../store/AuthStore'
import { Box, Text } from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import arrowLeftBack from '../../assets/images/arrow-left.png'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { getFormattedAddress } from '../../components/MapViews/utils'
import { colors } from '../../assets/colors/colors'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { MapViews } from '../../components/MapViews/MapViews'
import CustomInput from '../../components/TextInput'
import Button from '../../components/Button'
import rootStore from '../../store/RootStore/root-store'
import { observer } from 'mobx-react-lite'
import { routerConstants } from '../../constants/routerConstants'

type AddressSProps = {
	navigation: NavigationProp<ParamListBase>
}
const AddressS = observer(({ navigation }: AddressSProps) => {
	const { user, currentLocation, setLocation } = AuthStore
	const { AuthStoreService } = rootStore
	const { address } = user
	const { location } = address
	const [showLocationMap, setShowLocationMap] = useState(false)
	const formatted_address = getFormattedAddress(address)
	const onPressGoBack = () => {
		navigation.goBack()
	}
	const onPressEditAddress = () => {
		setShowLocationMap(true)
	}
	const onPressSaveNewAddress = () => {
		AuthStoreService.updateUser(user._id, { address: currentLocation }).then((data) => {
			if (data) {
				navigation.navigate(routerConstants.HOME)
			}
		})
	}
	const onChangeText = (key: string, value: string) => {
		setLocation({
			...currentLocation,
			fullAddress: { ...currentLocation?.fullAddress, [key]: value },
		})
	}
	const currentMapLocation = {
		latitude: location?.coordinates[1],
		longitude: location?.coordinates[0],
	}
	return (
		<>
			<BaseWrapperComponent isKeyboardAwareScrollView={true}>
				<Box paddingX={5} mt={2}>
					<Box top={5} zIndex={10} position={'absolute'} left={5}>
						<ArrowBack goBackPress={onPressGoBack} img={arrowLeftBack} />
					</Box>
					<Box flexDirection={'row'} mt={5} mb={10} justifyContent={'center'} alignItems={'center'}>
						<Text fontSize={22} fontWeight={'bold'}>
							Address
						</Text>
					</Box>

					<Text fontSize={14} color={colors.gray} fontWeight={'500'}>
						Current address:
					</Text>
					<Box
						mt={2}
						flexDirection={'row'}
						justifyContent={'space-between'}
						borderBottomWidth={1}
						pb={1}
						borderColor={colors.grayLight}
					>
						<Text fontSize={15}>{formatted_address}</Text>
						<TouchableOpacity onPress={onPressEditAddress}>
							<AntDesign name="edit" size={24} color={colors.black} />
						</TouchableOpacity>
					</Box>

					{currentLocation?.fullAddress && (
						<Box mt={5}>
							<Box alignItems={'center'}>
								<Text fontSize={22} color={colors.black} fontWeight={'500'}>
									New Address
								</Text>
							</Box>
							<Box>
								<CustomInput
									isDisabled={true}
									label={'Country'}
									value={currentLocation.fullAddress?.country}
									borderRadius={16}
									type={'text'}
								/>
								<CustomInput
									label={'City'}
									onChangeText={(text) => onChangeText('city', text)}
									value={currentLocation.fullAddress?.city}
									borderRadius={16}
									type={'text'}
								/>
								<CustomInput
									label={'Street'}
									onChangeText={(text) => onChangeText('street', text)}
									value={currentLocation.fullAddress?.street}
									borderRadius={16}
									type={'text'}
								/>
								<CustomInput
									label={'House'}
									onChangeText={(text) => onChangeText('house', text)}
									value={currentLocation.fullAddress?.house}
									borderRadius={16}
									type={'text'}
								/>
								<CustomInput
									label={'Apartment'}
									onChangeText={(text) => onChangeText('apartment', text)}
									value={currentLocation.fullAddress?.apartment}
									borderRadius={16}
									type={'text'}
								/>

								<Box mt={5}>
									<Button
										backgroundColor={colors.green}
										title={'Save new address'}
										onPress={onPressSaveNewAddress}
									/>
								</Box>
							</Box>
						</Box>
					)}
				</Box>
				{showLocationMap && (
					<MapViews
						from={'edit'}
						currentDataMap={{
							location: currentMapLocation,
							positionMarker: currentMapLocation,
							address: { name: '', formatted_address: formatted_address },
						}}
						close={() => setShowLocationMap(false)}
						visible={showLocationMap}
					/>
				)}
			</BaseWrapperComponent>
		</>
	)
})

export default AddressS
