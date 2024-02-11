import React, { memo } from 'react'
import { Box } from 'native-base'
import { Image } from 'react-native'
import Animated, { FadeIn, Layout } from "react-native-reanimated";
import { Skeleton } from "moti/skeleton";
import { SkeletonCommonProps } from "../../../utils/common";

const BannersViewer = memo(({ image }: any) => {
	return (
		<Box mr={1} w={353} h={74}>
			<Image style={{ width: 353, height: 74 }} source={{ uri: image }} />
		</Box>
	)
})

export default BannersViewer
