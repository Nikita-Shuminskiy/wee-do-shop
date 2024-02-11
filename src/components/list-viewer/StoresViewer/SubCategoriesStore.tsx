import React, { memo } from "react";
import { Text } from "native-base";
import { colors } from "../../../assets/colors/colors";
import { CategoryType } from "../../../api/categoriesApi";
type SubCategoriesStoreProps = {
  lastElem: boolean
  t: any
  subCategory: CategoryType
}
const SubCategoriesStore = ({subCategory, lastElem, t}:SubCategoriesStoreProps) => {
  return (
    <Text
      color={colors.gray}
      fontSize={11}
      fontWeight={"500"}
    >{`${t(subCategory.name.trim())}${lastElem ? "" : ", "}`}</Text>
  );
};

export default memo(SubCategoriesStore)