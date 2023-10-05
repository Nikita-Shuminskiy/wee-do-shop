import React, { memo } from 'react'
import { Image } from 'react-native'
import { Box } from 'native-base'
import { BannersType } from '../../api/userApi'

const BannersView = memo(
	({ banner }: { banner: BannersType }) => {
		console.log('banners')
		return (
			<Box mr={1} w={353} h={74}>
				<Image style={{ width: 353, height: 74 }} source={{ uri: banner.image }} />
			</Box>
		)
	},
	(prevProps, nextProps) => {
		return nextProps.banner._id === prevProps.banner._id
	}
)

export default BannersView
