import { MotiView } from "moti";
import React, { memo } from "react";

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />

export default memo(Spacer)