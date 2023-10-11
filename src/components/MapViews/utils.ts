import * as Location from 'expo-location'
import { AddressType } from '../../store/AuthStore/auth-store'

export const allowLocation = async () => {
	try {
		let { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== 'granted') {
			console.error('Permission to access location was denied')
			return
		}
		return status
	} catch (e) {
		console.log('error', e)
	} finally {
	}
}
export const getInfoAddressForCoords = async ({ latitude, longitude }) => {
	try {
		const reverseGeocode = await Location.reverseGeocodeAsync({
			latitude,
			longitude,
		})

		if (reverseGeocode && reverseGeocode.length > 0) {
			const { country, city, street, region, name, district, postalCode, streetNumber } =
				reverseGeocode[0]
			const formatted_address = `${country} ${city ? city : district ? district : ''} ${
				street ?? ''
			} ${streetNumber ?? ''} ${region ?? ''}`
			return {
				formatted_address,
				country: country ?? region,
				city: city ? city : region ? region : district ? district : '',
				street: street ?? district,
				house: streetNumber,
				postalCode: postalCode,
			}
		}
	} catch (e) {
		console.log('error', e)
	}
}
export const getFormattedAddress = (currentLocation: AddressType) => {
	const fullAddress = currentLocation?.fullAddress
	return `${fullAddress?.city ?? ''} ${fullAddress?.street ?? ''} ${fullAddress?.house ?? ''} ${
		fullAddress?.apartment ?? ''
	}`
}
/*export const getFormattedAddress = (currentLocation: AddressType) => {
	const fullAddress = currentLocation?.fullAddress;
	return `${fullAddress?.city ? `City: ${fullAddress.city}` : ''} ${fullAddress?.street ? `Street: ${fullAddress.street}` : ''} ${fullAddress?.house ? `House: ${fullAddress.house}` : ''} ${fullAddress?.apartment ? `Apartment: ${fullAddress.apartment}` : ''}`;
}*/
export const formatProductPrice = (price) => {
	if (!price) return ''
	const priceInDollars = price / 100
	return price % 100 === 0 ? String(priceInDollars) : priceInDollars.toFixed(2)
}
export const getCurrentPositionHandler = async () => {
	try {
		const status = await allowLocation()
		if (status) {
			let currentLocation = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.BestForNavigation,
			})
			const { latitude, longitude } = currentLocation.coords
			return { latitude, longitude }
		}
	} catch (e) {
		/*		createAlert({
          title: 'Message',
          message: 'Permission to access location was denied',
          buttons: [{ text: 'Exit'}],
        })*/
	} finally {
	}
}
