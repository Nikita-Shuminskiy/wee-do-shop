import {NavigationProp, ParamListBase} from "@react-navigation/native";
import { NotificationResponse } from "../store/types/types";

export const processingNavigationFromPushNotification = (navigation: NavigationProp<ParamListBase>, data: NotificationResponse) => {
  console.log(data, 'processingNavigationFromPushNotification');
/*  switch (order.last_step?.trim()) {
  /!*  case LastStep.client_must_get: {
      return navigation.navigate(routerConstants.EXECUTOR_MAP, {from: 'get'})
    }*!/
    default: {
      console.log(order, 'default')
    }
  }*/
}
