import React, { memo, useEffect, useRef } from 'react'
import { Animated, ImageBackground, Modal, StyleSheet } from 'react-native'
import logo from '../assets/images/logo-loading.png'
import logoBorder from '../assets/images/border-logo.png'
import { Box } from 'native-base'
import { BlurView } from 'expo-blur'

const Loading = memo(({ visible }: any) => {
	const rotateAnim = new Animated.Value(0)
	useEffect(() => {
		const rotationAnimation = Animated.loop(
			Animated.timing(rotateAnim, {
				toValue: 2,
				duration: 2000,
				useNativeDriver: true,
			})
		)

		rotationAnimation.start()

		return () => rotationAnimation.stop()
	}, [visible])

	const rotateInterpolate = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	})

	return (
		<Box
			flex={1}
			position={'absolute'}
			top={'50%'}
			zIndex={10}
			w={'100%'}
			backgroundColor={'transparent'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<ImageBackground style={[styles.imgLogo]} source={logo}>
				<Animated.Image
					style={{
						width: 92,
						height: 92,
						transform: [{ rotate: rotateInterpolate }],
					}}
					source={logoBorder}
				/>
			</ImageBackground>
		</Box>
	)
})
const styles = StyleSheet.create({
	imgLogo: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 60,
		height: 57,
	},
	blurBackground: {
		backgroundColor: 'rgba(255,255,255,0.32)',
		backdropFilter: 10,
	},
})
export default Loading
