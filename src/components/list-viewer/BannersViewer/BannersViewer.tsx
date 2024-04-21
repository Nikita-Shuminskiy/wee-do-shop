import React, { memo } from 'react'
import { Box } from 'native-base'
import { Image } from 'react-native'

const BannersViewer = memo(({ image }: any) => {
	return (
		<Box mr={1} w={353} h={74}>
			<Image style={{ width: 353, height: 74 }} source={{ uri: image }} />
		</Box>
	)
})

export default BannersViewer
