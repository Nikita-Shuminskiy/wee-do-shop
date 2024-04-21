import React from 'react'
import { Image } from 'react-native'
import motorcycle from '../assets/images/moto.svg'
import { Text } from 'native-base'
import { colors } from '../assets/colors/colors'
import { LinearGradient } from 'expo-linear-gradient'
import Svg, { Path } from 'react-native-svg'

const DeliveryTime = ({ time, styleImg, styleGradient, fontSizeText, t }: any) => {
	return (
		<LinearGradient
			colors={['rgba(73,74,79,0.51)', '#699315']}
			start={[0, 0.5]}
			end={[1, 0.5]}
			style={{
				flex: 1,
				borderRadius: 50,
				paddingVertical: 6,
				paddingHorizontal: 5,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				...styleGradient,
			}}
		>
			<Svg
				style={{ width: 17, height: 19, resizeMode: 'center', ...styleImg }}
				viewBox="0 0 17 11"
				fill="none"
			>
				<Path
					d="M14.45 1.57143C14.45 1.15466 14.2709 0.754961 13.9521 0.460261C13.6333 0.165561 13.2009 0 12.75 0H10.2V1.57143H12.75V3.65357L9.775 7.07143H6.8V3.14286H3.4C1.5215 3.14286 0 4.54929 0 6.28571V8.64286H1.7C1.7 9.94714 2.839 11 4.25 11C5.661 11 6.8 9.94714 6.8 8.64286H10.625L14.45 4.20357V1.57143ZM4.25 9.42857C3.7825 9.42857 3.4 9.075 3.4 8.64286H5.1C5.1 9.075 4.7175 9.42857 4.25 9.42857ZM5.1 7.07143H1.7V6.28571C1.7 5.42143 2.465 4.71429 3.4 4.71429H5.1V7.07143ZM14.45 6.28571C13.039 6.28571 11.9 7.33857 11.9 8.64286C11.9 9.94714 13.039 11 14.45 11C15.861 11 17 9.94714 17 8.64286C17 7.33857 15.861 6.28571 14.45 6.28571ZM14.45 9.42857C13.9825 9.42857 13.6 9.075 13.6 8.64286C13.6 8.21071 13.9825 7.85714 14.45 7.85714C14.9175 7.85714 15.3 8.21071 15.3 8.64286C15.3 9.075 14.9175 9.42857 14.45 9.42857ZM6.8 2.35714H2.55V0.785714H6.8V2.35714Z"
					fill="white"
				/>
			</Svg>
			<Text ml={1} color={colors.white} fontSize={fontSizeText ?? 13} fontWeight={'500'}>
				{time} {t('min')}
			</Text>
		</LinearGradient>
	)
}

export default DeliveryTime
