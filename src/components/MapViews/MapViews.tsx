import React, {useEffect, useState} from "react"
import MapView, {Marker} from "react-native-maps"
import {Image, Modal, Platform, StyleSheet, TouchableOpacity, View} from "react-native"
import {Box, Text} from "native-base"
import arrowLeft from "../../assets/images/arrow-left-back.png"
import myLocationImg from "../../assets/images/myLocation.png"
import ArrowBack from "../ArrowBack"
import AddressAutocomplete, {AutoCompleteDataType} from "../AddressAutocomplete"
import Button from "../Button"
import {colors} from "../../assets/colors/colors"
import * as Location from "expo-location"
import AuthStore from "../../store/AuthStore"
import {routerConstants} from "../../constants/routerConstants"
import {useNavigation} from "@react-navigation/native"
import NotificationStore from "../../store/NotificationStore/notification-store"
import {LoadingEnum} from "../../store/types/types"
import {allowLocation, getInfoAddressForCoords} from "./utils"
import {fullAddressType} from "../../store/AuthStore/auth-store"
import {BaseWrapperComponent} from "../baseWrapperComponent"
import { da } from "date-fns/locale";

type CoordinatesType = {latitude: number; longitude: number}
const getCurrentInfo = async (location) => {
	if (!location) return
	const {latitude, longitude} = location
	const data = await getInfoAddressForCoords({latitude, longitude})
	return {
		city: data?.city,
		country: data?.country,
		postalCode: data?.postalCode,
		street: data?.street,
		house: data?.house,
	}
}
type MapViewsProps = {
	navigation: any
}
export const MapViews = ({navigation}: MapViewsProps) => {
	const {setLocation} = AuthStore
	const [mapInteractionEnabled, setMapInteractionEnabled] = useState(true)
	const [myLocation, setMyLocation] = useState<{latitude: number; longitude: number} | null>(null)
	const [mapRef, setMapRef] = useState(null)
	const [fullInfo, setFullInfo] = useState<fullAddressType>(null)
	const onPressGoBack = () => {
		navigation.goBack()
	}
	useEffect(() => {
		getCurrentPositionHandler()
	}, []);
	useEffect(() => {
		if (mapRef && myLocation?.latitude) {
			mapRef.fitToCoordinates([{latitude: myLocation.latitude, longitude: myLocation.longitude}], {
				edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
				animated: true,
			})
		}
	}, [myLocation])
	const getCurrentPositionHandler = async (event?: any) => {
		event?.stopPropagation()
		setMapInteractionEnabled(false) // Отключаем взаимодействие с картой
		try {
			const status = await allowLocation()
			if (status) {
				let currentLocation = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.BestForNavigation,
				})
				const {latitude, longitude} = currentLocation.coords
				setMyLocation({latitude, longitude})
				const {formatted_address, ...rest} = await getInfoAddressForCoords({
					latitude,
					longitude,
				})
				setFullInfo({...rest})
			}
		} catch (e) {
			console.log("err", e)
		} finally {
			setMapInteractionEnabled(true)
		}
	}
	const handleMapPress = async (event) => {
		if (!mapInteractionEnabled) return
		const {latitude, longitude} = event.nativeEvent.coordinate
		const {formatted_address, ...rest} = await getInfoAddressForCoords({latitude, longitude})
		setFullInfo({...rest})
		setMyLocation({latitude, longitude})
	}
	const onPressSaveLocationHandler = () => {
		if (!myLocation?.longitude) return
		setLocation({
			fullAddress: {...fullInfo},
			location: {
				type: "Point",
				coordinates: [myLocation.longitude, myLocation.latitude],
			},
		})
		onPressGoBack()
	}
	const initialRegion = {
		latitude: 7.816786999999999,
		longitude: 98.3403676,
		latitudeDelta: 12,
		longitudeDelta: 2,
	}
	const onSaveAutoCompleteHandler = async (data: AutoCompleteDataType) => {
		setMyLocation(data.location)
		getCurrentInfo(data?.location).then((data) => {
			setFullInfo({
				city: data?.city,
				country: data?.country,
				postalCode: data?.postalCode,
				street: data?.street,
				house: data?.house,
			})
		})
	}
	return (
		<BaseWrapperComponent>
			<Box flex={1}>
				<Box
					mt={5}
					zIndex={10}
					mb={5}
					top={Platform.OS === "ios" ? 5 : 2}
					position={"absolute"}
					left={5}
				>
					<ArrowBack goBackPress={onPressGoBack} img={arrowLeft} />
				</Box>

				<Box alignItems={"center"} position={"absolute"} style={{top: "10%"}} zIndex={2} w={"100%"}>
					<AddressAutocomplete onSave={onSaveAutoCompleteHandler} />
				</Box>
				<MapView
					ref={(ref) => setMapRef(ref)}
					style={styles.map}
					initialRegion={initialRegion}
					onPress={handleMapPress}
					key={"4139a6460624d97f"}
				>
					{myLocation?.latitude && (
						<Marker
							coordinate={{
								latitude: myLocation?.latitude,
								longitude: myLocation?.longitude,
							}}
							title={""}
						/>
					)}
				</MapView>
				<Box mt={5} zIndex={10} position={"absolute"} w={"100%"} bottom={5}>
					<Box zIndex={100} position={"absolute"} bottom={100} right={0}>
						<TouchableOpacity style={{pointerEvents: "auto"}} onPress={getCurrentPositionHandler}>
							<Image style={{width: 80, height: 80}} source={myLocationImg} alt={"my-location"} />
						</TouchableOpacity>
					</Box>
					<Box w={"100%"} mb={3} flex={1}>
						<Button
							backgroundColor={colors.green}
							styleContainer={styles.styleContainerBtn}
							onPress={onPressSaveLocationHandler}
							title={"I'm here"}
						/>
					</Box>
				</Box>
			</Box>
		</BaseWrapperComponent>
	)
}

const styles = StyleSheet.create({
	styleContainerBtn: {
		height: 54,
		justifyContent: "center",
		flex: 1,
		alignItems: "center",
		marginRight: 10,
		marginLeft: 10,
	},
	map: {
		width: "100%",
		height: "100%",
	},
})