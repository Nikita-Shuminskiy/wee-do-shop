import React, { memo } from "react";
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Box, Image, Text } from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import arrowLeft from '../../assets/images/arrow-left.png'
import logoImg from '../../assets/images/logoWeeDo.png'
import { useTranslation } from "react-i18next";

type LegalInformationSProps = {
	navigation: NavigationProp<ParamListBase>
}
const LegalInformationS = ({ navigation }: LegalInformationSProps) => {
	const {t} = useTranslation(['legalInformation', 'common']);
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
					{t('welcomeMessage')}
				</Text>
				<Text>
					{t('servicesOffered')}
				</Text>
				<Text>
					{t('uniqueSolutions')}
				</Text>

				<Text>
					{t('exceptionalService')}
				</Text>
				<Text>
					{t('dedicationToExcellence')}
				</Text>
			</Box>
		</BaseWrapperComponent>
	)
}

export default memo(LegalInformationS)
