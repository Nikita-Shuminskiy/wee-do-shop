import React, { useState } from 'react'
import ModalPopup from '../pop-up'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Box, Image, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import closeCircleGrayImg from '../../assets/images/close.png'

type PaymentMethodPopUpProps = {
	visible: boolean
	onClose: () => void
}
const PromoCodePopUp = ({ visible, onClose }: PaymentMethodPopUpProps) => {
	const [chosenMethod, setChosenMethod] = useState<boolean>(false)
	const onPressNewPayment = () => {}

	return (
		<ModalPopup modalHeight={400} style={{}} visible={visible} onClose={onClose}>
			<Box>
				<Box mb={5} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<Text fontSize={22} fontWeight={'500'}>
						Promo code
					</Text>
					<TouchableOpacity onPress={onClose}>
						<Image alt={'close'} source={closeCircleGrayImg} />
					</TouchableOpacity>
				</Box>
			</Box>
		</ModalPopup>
	)
}

export default PromoCodePopUp;
