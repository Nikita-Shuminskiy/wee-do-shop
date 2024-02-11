import React from "react";
import { Skeleton } from "moti/skeleton";
import { SkeletonCommonProps } from "../../../utils/common";
import { Box } from "native-base";
import Spacer from "../../Specer";

const ShopsSkeleton = () => {
  return (
    <Box pl={2}>
      <Skeleton height={200} width={'50%'} show={true} { ...SkeletonCommonProps }>
        <Box justifyContent={'space-between'} pt={1} flex={1} w={'100%'}>
          <Box p={1}>
            <Skeleton height={20} width={'20%'} {...SkeletonCommonProps}/>
          </Box>
          <Box justifyContent={'flex-end'}  flex={1} pb={2} pr={2}>
            <Box>
              <Skeleton height={20} width={'50%'} {...SkeletonCommonProps} />
            </Box>
            <Box>
              <Spacer height={5} />
              <Skeleton height={30} width={'50%'} {...SkeletonCommonProps} />
            </Box>
          </Box>
        </Box>
      </Skeleton>
    </Box>
  );
};

export default ShopsSkeleton;