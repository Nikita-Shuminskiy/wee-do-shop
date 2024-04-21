import React from "react";
import Spacer from "../../Specer";
import { SkeletonCommonProps } from "../../../utils/common";
import { Skeleton } from "moti/skeleton";

const StoreSkeleton = () => {
  return (
    <>
      <Skeleton.Group show={true} >
        <Skeleton height={170} width={'100%'} show={true} { ...SkeletonCommonProps } />
        <Spacer height={2} />
        <Skeleton height={12} width={250} {...SkeletonCommonProps} />
        <Spacer height={2} />
        <Skeleton height={12} width={150} {...SkeletonCommonProps}/>
      </Skeleton.Group>
      <Spacer height={15} />
      <Skeleton.Group show={true} >
        <Skeleton height={170} width={'100%'} show={true} { ...SkeletonCommonProps } />
        <Spacer height={2} />
        <Skeleton height={12} width={250} {...SkeletonCommonProps} />
        <Spacer height={2} />
        <Skeleton height={12} width={150} {...SkeletonCommonProps}/>
      </Skeleton.Group>
      <Spacer height={15} />
      <Skeleton.Group show={true} >
        <Skeleton height={170} width={'100%'} show={true} { ...SkeletonCommonProps } />
        <Spacer height={2} />
        <Skeleton height={12} width={250} {...SkeletonCommonProps} />
        <Spacer height={2} />
        <Skeleton height={12} width={150} {...SkeletonCommonProps}/>
      </Skeleton.Group>
      <Spacer height={15} />
      <Skeleton.Group show={true} >
        <Skeleton height={170} width={'100%'} show={true} { ...SkeletonCommonProps } />
        <Spacer height={2} />
        <Skeleton height={12} width={250} {...SkeletonCommonProps} />
        <Spacer height={2} />
        <Skeleton height={12} width={150} {...SkeletonCommonProps}/>
      </Skeleton.Group>
    </>
  );
};

export default StoreSkeleton;