import React, { useEffect, useRef } from 'react'
import { Animated, ImageBackground, Modal, StyleSheet } from 'react-native'
import logo from '../assets/images/logo-loading.png'
import logoBorder from '../assets/images/border-logo.png'
import { Box } from 'native-base'
import { BlurView } from 'expo-blur'

const Loading = ({ visible }) => {
	const rotateAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.loop(
			Animated.timing(rotateAnim, {
				toValue: 1,
				duration: 11000,
				useNativeDriver: true,
			}),
		).start()
	}, [rotateAnim])

	const rotateInterpolate = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	})

	return (
		<Modal transparent={true} visible={visible}>
			<BlurView intensity={100} style={StyleSheet.absoluteFill}>
				<Box color={'#FFFFFF'} flex={1} justifyContent={'center'} alignItems={'center'}>
					<ImageBackground style={styles.imgLogo} source={logo}>
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
			</BlurView>
		</Modal>
	)
}
const styles = StyleSheet.create({
	imgLogo: {
		alignItems: 'center', justifyContent: 'center', width: 60,
		height: 57,
	},
})
export default Loading
