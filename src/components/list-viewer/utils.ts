import { isCurrentTimeWorkStoreRange } from "../../utils/utils";
import { WorkingHoursType } from "../../api/storesApi";
import { createAlert } from "../Alert";

export const getInfoAboutStoreWorkTime = (workingHours: WorkingHoursType) => {
  const currentTimeInRangeResult = isCurrentTimeWorkStoreRange(workingHours);

  const isWilOpen =
    currentTimeInRangeResult?.indexOf("Will open at") !== -1 ||
    currentTimeInRangeResult?.indexOf("Closed") !== -1;

  return {
    currentTimeInRangeText: currentTimeInRangeResult,
    isWilOpen
  };
};
export const alertStoreClosed = () => {
  createAlert({
    title: "Message",
    message: "Store closed",
    buttons: [
      { text: "Close", style: "default" }
    ]
  });
};