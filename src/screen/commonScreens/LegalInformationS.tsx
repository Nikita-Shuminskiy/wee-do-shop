import React from 'react'
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Box, Image, Text } from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import arrowLeft from '../../assets/images/arrow-left.png'
import logoImg from '../../assets/images/logoWeeDo.png'

type LegalInformationSProps = {
	navigation: NavigationProp<ParamListBase>
}
const LegalInformationS = ({ navigation }: LegalInformationSProps) => {
	const onPressGoBack = () => {
		navigation.goBack()
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={5} alignItems={'center'}>
				<Box mt={5} mb={5} position={'absolute'} left={5}>
					<ArrowBack goBackPress={onPressGoBack} img={arrowLeft} />
				</Box>
				<Image w={123} h={158} alt={'logo'} source={logoImg} mt={5} mb={5} />
			</Box>
			<Box paddingX={5} mb={2} alignItems={'center'}>
				<Text>
					Welcome to weeDoo Delivery Team - your trusted partner in the world of quality services
					and pleasures! We are a team of enthusiasts dedicated to providing you with the best
					experience in the realm of delivery and service.
				</Text>

				<Text>
					If you value top-notch service, our team is thrilled to offer you a wide range of
					services. From swift delivery to providing practical solutions, our services will make
					your experience truly unforgettable. We meticulously adhere to quality standards to ensure
					only the best for you.
				</Text>
				<Text>
					Additionally, we also offer unique solutions for everyday tasks. solutions to practical
					tools - we're here to make your life more convenient and fulfilling.
				</Text>

				<Text>
					We value our customers and aim to provide you with exceptional service. Our friendly team
					is always ready to help you choose the best solution and answer any questions you might
					have.
				</Text>

				<Text>
					The weeDoo Delivery Team is more than a delivery service; we're dedicated to creating
					exceptional experiences. We take immense pride in our work and are excited to provide you
					with a service experience you won't forget. Join us and let us add an extraordinary touch
					to your day!
				</Text>
			</Box>
		</BaseWrapperComponent>
	)
}

export default LegalInformationS;
