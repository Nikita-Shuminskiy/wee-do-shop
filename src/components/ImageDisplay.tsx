import React, { useState } from 'react'
import { Image } from 'expo-image'
import { Box } from 'native-base'
import * as Animatable from 'react-native-animatable'
import { colors } from '../assets/colors/colors'

const ImageDisplay = ({ source, style, ...restProps }: any) => {
	const [isLoaded, setIsLoaded] = useState(false) // Состояние для отслеживания загрузки изображения

	const handleImageLoad = () => {
		setIsLoaded(true) // Установите состояние isLoaded в true, когда изображение загружено
	}
	const onError = () => {
		console.log('error load img')
	}
	return (
		<>
			{!isLoaded && (
				<Animatable.View
					animation="pulse" // Выберите желаемую анимацию (например, "pulse")
					iterationCount="infinite" // Бесконечное мигание
					style={{
						position: 'absolute',
						zIndex: 100,
						width: style.width,
						height: style.height,
						borderRadius: style.borderRadius,
						backgroundColor: colors.grayLightWhite,
					}}
				/>
			)}

			<Image
				cachePolicy={'memory'}
				onLoad={handleImageLoad}
				onError={onError}
				source={source}
				style={style}
				{...restProps}
			/>
		</>
	)
}

export default ImageDisplay
