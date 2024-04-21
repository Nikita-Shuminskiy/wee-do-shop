import React from "react";
import Spacer from "../../Specer";
import { SkeletonCommonProps } from "../../../utils/common";
import { Skeleton } from "moti/skeleton";
import { Box } from "native-base";

const StoreSkeleton = () => {
  return (
    <Box alignItems={"center"} flexDirection={'row'} mr={2} justifyContent={"flex-start"}>
      <Skeleton.Group show={true} >
      <Box alignItems={'center'} mr={2}>
        <Skeleton height={73}
                  width={73}
                  radius={'round'} { ...SkeletonCommonProps }/>
        <Spacer height={8} />
        <Skeleton height={20} { ...SkeletonCommonProps }/>
      </Box>
        <Box alignItems={'center'} mr={2}>
          <Skeleton height={73}
                    width={73}
                    radius={'round'} { ...SkeletonCommonProps }/>
          <Spacer height={8} />
          <Skeleton height={20} { ...SkeletonCommonProps }/>
        </Box>
        <Box alignItems={'center'} mr={2}>
          <Skeleton height={73}
                    width={73}
                    radius={'round'} { ...SkeletonCommonProps }/>
          <Spacer height={8} />
          <Skeleton height={20} { ...SkeletonCommonProps }/>
        </Box>
        <Box alignItems={'center'} mr={2}>
        <Skeleton height={73}
                  width={73}
                  radius={'round'} { ...SkeletonCommonProps }/>
        <Spacer height={8} />
        <Skeleton height={20} { ...SkeletonCommonProps }/>
      </Box>
      </Skeleton.Group>
    </Box>
  );
};

export default StoreSkeleton;