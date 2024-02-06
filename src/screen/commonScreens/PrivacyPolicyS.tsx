import React, { memo } from "react";
import { BaseWrapperComponent } from '../../components/baseWrapperComponent'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Box, Image, Text } from 'native-base'
import ArrowBack from '../../components/ArrowBack'
import arrowLeft from '../../assets/images/arrow-left.png'
import logoImg from '../../assets/images/logoWeeDo.png'
import { Linking, TouchableOpacity } from 'react-native'
import Link from '../../components/Link'
import { useTranslation } from "react-i18next";

type PrivacyPolicySProps = {
	navigation: NavigationProp<ParamListBase>
}
const PrivacyPolicyS = ({ navigation }: PrivacyPolicySProps) => {
	const {t} = useTranslation(['privacyPolicy', 'common']);
	const onPressGoBack = () => {
		navigation.goBack()
	}
	const handleEmailLinkPress = async () => {
		await Linking.openURL('mailto:weedoshop420@gmail.com') // Use Linking to open default email app
	}
	return (
		<BaseWrapperComponent isKeyboardAwareScrollView={true}>
			<Box paddingX={5} alignItems={'center'}>
				<Box mt={5} mb={5} position={'absolute'} left={5}>
					<ArrowBack goBackPress={onPressGoBack} img={arrowLeft} />
				</Box>
				<Image w={123} h={158} alt={'logo'} source={logoImg} mt={5} mb={5} />
			</Box>
			<Box paddingX={5} mb={2} alignItems={'flex-start'}>
				<Text fontSize={18} fontWeight={'600'}>
					{' '}
					{t('privacyPoliceFor')}
				</Text>

				<Text fontSize={18} fontWeight={'600'}>
					{' '}
					1. {t('introductionHeader')}
				</Text>

				<Text>
					{t('introduction')}
				</Text>

				<Text fontSize={18} fontWeight={'600'}>
					2. {t('collectedDataHeader')}
				</Text>

				<Text>
					{t('collectedData')}
				</Text>
				<Text fontSize={18} fontWeight={'600'}>
					{' '}
					3. {t('dataUsageHeader')}
				</Text>

				<Text>
					{t('dataUsage')}
				</Text>
				<Text fontSize={18} fontWeight={'600'}>
					4. {t('dataStorageHeader')}
				</Text>

				<Text>
					{t('dataStorage')}
				</Text>

				<Text fontSize={18} fontWeight={'600'}>
					5. {t('dataDisclosureHeader')}
				</Text>

				<Text>
					{t('dataDisclosure')}
				</Text>

				<Text fontSize={18} fontWeight={'600'}>
					6. {t('YourRightsHeader')}
				</Text>

				<Text>
					{t('yourRights')}
				</Text>
				<Text fontSize={18} fontWeight={'600'}>
					7. {t('contactUseHeader')}
				</Text>

				<Text>
					{t('contactUs')}{' '}
					<Link
						onPress={handleEmailLinkPress}
						styleLink={{ borderBottomWidth: 1 }}
						text={t('common:ownerMail')}
					/>
				</Text>

				<Text fontSize={18} fontWeight={'600'}>
					{' '}
					8. {t('changesPrivacy')}
				</Text>

				<Text>
					{t('changesToPrivacyPolicy')}
				</Text>

				<Text fontSize={15} fontWeight={'600'}>
					{t('common:effectiveDate')}
				</Text>
			</Box>
		</BaseWrapperComponent>
	)
}

export default memo(PrivacyPolicyS)
