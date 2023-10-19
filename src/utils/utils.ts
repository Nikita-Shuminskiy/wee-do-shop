import regex from "./helpers/regex";
import { WorkingHoursType } from "../api/storesApi";
import { addDays, format, getDay, getHours, getMinutes, parseISO } from "date-fns";
import { ProductType } from "../api/productApi";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.wee_doo.th";
export const DELIVERY_PRICE = 70;
const daysOfWeek: (keyof WorkingHoursType)[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];
export const test = {
  sunday: "Closed",
  monday: "Closed",
  tuesday: "Closed",
  wednesday: "08:30 - 23:50",
  thursday: "Closed",
  friday: "Closed",
  saturday: "Closed"
};
export const validateEmail = (email: string) => {
  return regex.email.test(email.trim());
};
export const capitalizeFirstLetter = (str: string) => {
  const capitalizedString = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalizedString;
};
export const getCurrentDayName = () => {
  const date = new Date();
  const currentDayOfWeek = getDay(date);
  const currentDay = daysOfWeek[currentDayOfWeek];
  return currentDay.toLowerCase();
};

export const getFormatDateToString = (dateString: string) => {
  if (!dateString) return "";
  const date = parseISO(dateString);

  return format(date, "d MMMM HH:mm");
};
export const splittingWord = (str) => {
  const words = str?.match(/[A-Z][a-z]+/g);

  if (!words) {
    return "";
  }

  const transformedWords = words.map((word, index) => {
    if (index === 0) {
      return word;
    } else {
      return word.toLowerCase();
    }
  });
  return transformedWords.join(" ");
};
export const getTotalPriceOrder = (
  products: {
    amount: number
    product: ProductType
  }[]
) => {
  return products?.reduce((acc, product) => {
    return acc + product?.amount * product?.product?.price;
  }, 0);
};

export function isCurrentTimeWorkStoreRange(workingHoursStores: WorkingHoursType, isInfo = false): any {
  const date = new Date();
  const prevDayName = daysOfWeek[addDays(date, -1).getDay()];
  const currentDayName = getCurrentDayName();
  const current_hour = getHours(date).toString();
  const current_minute = getMinutes(date).toString();
  const prev_day_time_work_store = workingHoursStores[prevDayName];
  const current_day_time_work_store = workingHoursStores[currentDayName];
  const [prev_start_time_day, prev_end_time_day] = prev_day_time_work_store?.split(" - ");
  const [prev_start_hour, prev_start_minute] = prev_start_time_day?.split(":");
  let prev_end_hour = null;
  let prev_end_minute = null;
  if (prev_day_time_work_store !== "Closed") {
    const [endHourPrevDay, endMinutePrevDay] = prev_end_time_day?.split(":");
    prev_end_hour = endHourPrevDay;
    prev_end_minute = endMinutePrevDay;
  }

  const [start_current_work_stores_time, end_current_work_stores_time] = current_day_time_work_store?.split(" - ");
  const [start_current_work_stores_hour, start_current_work_stores_minute] =
    start_current_work_stores_time?.split(":");
  let current_end_work_hour = null;
  let current_end_work_minute = null;

  if (current_day_time_work_store !== "Closed") {
    const [end_current_work_stores_hours, end_current_work_stores_minutes] =
      end_current_work_stores_time?.split(":");
    current_end_work_hour = end_current_work_stores_hours;
    current_end_work_minute = end_current_work_stores_minutes;
  }

  const is_current_day_closed = !current_day_time_work_store || current_day_time_work_store === "Closed";
  const is_prev_day_closed = !prev_day_time_work_store || prev_day_time_work_store === "Closed";
  const current_time = Number(current_hour + current_minute);
  const curr_work_time_end = Number(current_end_work_hour + current_end_work_minute);
  const curr_work_time_start = Number(start_current_work_stores_hour + start_current_work_stores_minute);
  const prev_work_time_end = Number(prev_end_hour + prev_end_minute);
  const prev_work_time_start = Number(prev_start_hour + prev_start_minute);
  const is_prev_day_after_midnight = prev_work_time_start > prev_work_time_end; // проверка прев дня (его работы за пол ночь)
  const is_current_day_after_midnight = curr_work_time_start > curr_work_time_end; // проверка текущего дня (его работы за пол ночь)
  //console.log( (!is_prev_day_after_midnight && (current_time < curr_work_time_start || current_time > curr_work_time_end)) );

  if (/*(!is_prev_day_after_midnight && (current_time < curr_work_time_start || current_time > curr_work_time_end))*/
    /*  || (is_prev_day_after_midnight && (current_time > prev_work_time_end && (current_time < curr_work_time_start || current_time > curr_work_time_end))) // not ok если текущий день перешагнул*/
    (!is_prev_day_after_midnight && (current_time < curr_work_time_start || (current_time > curr_work_time_end && !is_current_day_after_midnight)))
    || (is_prev_day_after_midnight && (current_time > prev_work_time_end && (current_time < curr_work_time_start || (current_time > curr_work_time_end && !is_current_day_after_midnight))))
    || (!is_prev_day_after_midnight && is_current_day_closed) ||
    (is_prev_day_after_midnight && (current_time > prev_work_time_end && is_current_day_closed)) ||
    /*  (is_prev_day_closed && (current_time < curr_work_time_start || current_time > curr_work_time_end)) ||*/
    (is_prev_day_closed && (current_time < curr_work_time_start || (current_time > curr_work_time_end && !is_current_day_after_midnight))) ||
    (is_prev_day_closed && is_current_day_closed)
  ) {
    return false;
  }
  return true;
}