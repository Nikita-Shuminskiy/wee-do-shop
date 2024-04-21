import React from "react"
import {SkeletonCommonProps} from "../../../utils/common"
import {Skeleton} from "moti/skeleton"

const BannersSkeleton = () => {
	return (
		<>
			<Skeleton width={353} height={74} {...SkeletonCommonProps} />
		</>
	)
}

export default BannersSkeleton;