import React, { useEffect, useRef } from 'react'
import { View, Animated, Easing } from 'react-native'
import Svg, { Line } from 'react-native-svg'

export default function SkeletonAnimation() {
	const translateX = useRef(new Animated.Value(0)).current

	const animateLine = () => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(translateX, {
					toValue: 1,
					duration: 1000,
					easing: Easing.linear,
					useNativeDriver: false,
				}),
				Animated.timing(translateX, {
					toValue: 0,
					duration: 1000,
					easing: Easing.linear,
					useNativeDriver: false,
				}),
			])
		).start()
	}

	useEffect(() => {
		animateLine()
	}, [])

	return (
		<View style={{ flex: 1 }}>
			<Svg height="100%" width="100%">
				<Line
					x1="0%"
					y1="50%"
					x2="100%"
					y2="50%"
					stroke="black"
					strokeWidth="2"
					strokeDasharray="5, 5"
				/>
			</Svg>
		</View>
	)
}
