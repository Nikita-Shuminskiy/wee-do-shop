import React, { useState } from 'react'
import { Box, Image, Text, Input, Spinner } from 'native-base'
import promoCodeImg from '../../../assets/images/promoCode.png'
import arrowRightImg from '../../../assets/images/courierImages/arrow-right.png'
import { colors } from '../../../assets/colors/colors'
import { TouchableOpacity } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextInput from '../../../components/TextInput'
import { Feather } from '@expo/vector-icons'
import AuthStore from '../../../store/AuthStore/auth-store'
import CartStore from '../../../store/CartStore/cart-store'

const PromoCode = ({ onPress, namePromoCode }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Box
				borderRadius={16}
				h={10}
				alignItems={'center'}
				flexDirection={'row'}
				paddingX={3}
				backgroundColor={colors.grayLightWhite}
			>
				<Image source={promoCodeImg} alt={'promo-img'} style={{ width: 17, height: 18 }} />
				<Box
					ml={4}
					flex={1}
					flexDirection={'row'}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Text fontSize={12} fontWeight={'500'}>
						{namePromoCode !== '' ? namePromoCode : 'Add promo code'}
					</Text>
					<Image source={arrowRightImg} alt={'promo-img'} style={{ width: 6, height: 12 }} />
				</Box>
			</Box>
		</TouchableOpacity>
	)
}

export const Accordions = ({ userId, addedPromoCode }) => {
	const { sendPromoCode, setPromoCode: setAddedPromo } = CartStore
	const [isCollapsed, setIsCollapsed] = useState(true)
	const [loading, setLoading] = useState(false)
	const [promoCode, setPromoCode] = useState('')
	const [promoCodeFromServer, setPromoFromServer] = useState('')
	const [errorText, setErrorText] = useState('')

	const toggleAccordion = () => {
		setIsCollapsed(!isCollapsed)
	}

	const handlePromoCodeChange = (text) => {
		if (addedPromoCode?.key) {
			setAddedPromo(null)
			setPromoFromServer('')
		}
		setErrorText('')
		setPromoCode(text)
	}

	const savePromoCode = () => {
		if (!promoCode.trim()) return
		setErrorText('')
		setLoading(true)
		sendPromoCode(promoCode.trim(), userId)
			.then((data) => {
				setPromoFromServer(data.key)
				toggleAccordion()
			})
			.catch((error) => {
				setErrorText(error?.response?.data.message)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<Box>
			<PromoCode namePromoCode={promoCodeFromServer} onPress={toggleAccordion} />
			<Collapsible collapsed={isCollapsed}>
				<Box mt={2}>
					<Text mb={2} fontSize={13}>
						Enter promo code:
					</Text>
					<Input
						borderRadius={16}
						borderColor={errorText ? colors.red : colors.grayLight}
						focusOutlineColor={errorText ? colors.red : colors.grayLight}
						InputRightElement={
							<Box mr={2}>
								{loading ? (
									<Spinner size="sm" color={colors.green} />
								) : (
									<TouchableOpacity onPress={() => savePromoCode()}>
										<Feather name="send" size={24} color={colors.green} />
									</TouchableOpacity>
								)}
							</Box>
						}
						type={'text'}
						placeholder={'Promo code'}
						value={promoCode}
						onChangeText={handlePromoCodeChange}
					/>
				</Box>
			</Collapsible>
		</Box>
	)
}
