import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidColor, AndroidImportance, AndroidVisibility, EventType } from "@notifee/react-native";
//import {NotificationResponse} from "../../api/Client/type";
import rootStore from "../../store/RootStore/root-store";
import { userApi } from "../../api/userApi";
import AuthStore from "../../store/AuthStore/auth-store";
import { NotificationResponse } from "../../store/types/types";
import { Alert, Platform } from "react-native";
const setCategories = async () => {
  await notifee.setNotificationCategories([
    {
      id: 'iosDefault',
      actions: [
        {
          id: 'ok',
          title: 'MAP',
          foreground: true,
        },
        {
          id: 'delete-chat',
          title: 'Cansel',
          destructive: true,
          foreground: true,
          // Only show if device is unlocked
          authenticationRequired: true,
        },
      ],
    },
  ])
}
const createChannel = async () => {

  return await notifee.createChannel({
    id: "id-def",
    name: "Default channel",
    vibration: true,
    visibility: AndroidVisibility.PUBLIC,
    sound: "default",
    lights: true,
    badge: true,
    lightColor: AndroidColor.BLUE,
    importance: AndroidImportance.HIGH
  }); // return channelId
};
export const onDisplayNotification = async (data) => {
  //console.log(data, '111');
 /* if(!!data?.notification) return*/

  const dataAndroid = JSON.parse(data.data.android)
  const channelId = await createChannel()
  await setCategories() // for ios
  await notifee.displayNotification({
    title: data.data?.title,
    body: data.data?.body,
    data: { ...data.data },
    ios: {
      categoryId: "iosDefault",
      threadId: "iosDefault",
      targetContentId: "iosDefault",
      interruptionLevel: "active",
      badgeCount: 0,
      critical: true,
      sound: "default",
      foregroundPresentationOptions: {
        banner: true,
        sound: true,
        badge: true,
        list: true,
        alert: true
      },
    },
    android: {
      channelId,
      lightUpScreen: true,
      smallIcon: "notification_icon",
      color: 'green',
      ...dataAndroid
    }
  })
};
export async function requestbatteryOptimizationTurnOff() {
  // 1. checks if battery optimization is enabled
  const batteryOptimizationEnabled =
    await notifee.isBatteryOptimizationEnabled();
  if (batteryOptimizationEnabled) {
    // 2. ask your users to disable the feature
    Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please disable battery optimization for the app.',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => await notifee.openBatteryOptimizationSettings(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  } else {
    console.log("Restrictions aren't detected for Battery Optimization");
  }
}
export async function requestPowerManagerSettingsTurnOff() {
  // 1. get info on the device and the Power Manager settings
  const powerManagerInfo = await notifee.getPowerManagerInfo();
  if (powerManagerInfo.activity) {
    // 2. ask your users to adjust their settings
    Alert.alert(
      'Restrictions Detected',
      'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
      [
        // 3. launch intent to navigate the user to the appropriate screen
        {
          text: 'OK, open settings',
          onPress: async () => await notifee.openPowerManagerSettings(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  } else {
    console.log("Restrictions aren't detected for Power Managment.");
  }
}
export const useNotification = (isAuth: boolean) => {
  const { AuthStoreService } = rootStore;
  const { user } = AuthStore;
  useEffect(() => {
    if (isAuth) {
      requestUserPermission().then((data) => {
        if (data) {
          messaging()
            .getToken()
            .then((token) => {
             console.log(token);
              //sendToken(token, user._id)
            });
        }
      });
      requestbatteryOptimizationTurnOff()
     // requestPowerManagerSettingsTurnOff()
    }

    // ios fNcAwg0tkE-zldKJmN2J41:APA91bHF4HeECxzOn_ltS50Shd-kLKOvon5QxHeEB6Km_bR7Mc4bVZ3GLiM_-XuMZBjKY9Le83GUmE0Tqjs7XPXKqJqFVbU_6T5vgaZPJfeX837cXINTazXAxcyiiKWSDPSW1qKSKv00
    // simulator fNcAwg0tkE-zldKJmN2J41:APA91bHF4HeECxzOn_ltS50Shd-kLKOvon5QxHeEB6Km_bR7Mc4bVZ3GLiM_-XuMZBjKY9Le83GUmE0Tqjs7XPXKqJqFVbU_6T5vgaZPJfeX837cXINTazXAxcyiiKWSDPSW1qKSKv00
    // xiaomi cvzKTXkrQXOvlv4Pj6s2eu:APA91bEKnPrgSJJ0axNsNcgtjLStrowH9wr1k8LXWkfFy4I3QMhqPlh6rBAayv4PPsAVCUB_cdXStkmNnMoU6YwFK3nXRGVamW6iwHSdlqp773sWmLaCe7j4BP4PI_JKndXup_7ljsEP
    ;(async () => {
      //for ios
      await notifee.requestPermission({
        sound: true,
        announcement: true,
        alert: true,
        provisional: true, // тихие увед
        criticalAlert: true
      });
    })();
  }, [isAuth]);
  useEffect(() => {
    // дергается при открытом приложении
    const unsubscribeForegroundEvent = notifee.onForegroundEvent(notificationHandler)
    // дергается при фоновом и убитом стейте
    notifee.onBackgroundEvent(notificationHandler)
    let unsubscribeOnMessage: () => void = () => {}
    ;(async () => {
      unsubscribeOnMessage = messaging().onMessage(onDisplayNotification);
    })();
    return () => {
      unsubscribeForegroundEvent();
      unsubscribeOnMessage();
    };
  }, []);
  const notificationHandler = async (event) => {
    const {
      type,
      detail: { notification }
    } = event;
    const dataPush: NotificationResponse = notification.data as NotificationResponse;
    if (type === EventType.PRESS || event?.detail?.pressAction?.id) {
      await AuthStoreService.processingNotificationResponse(dataPush)
      await notifee.cancelNotification(notification.id);
    }
  }
};

const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    await notifee.requestPermission();
     if(Platform.OS === 'android') {
       await messaging().registerDeviceForRemoteMessages();
     }
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  } catch (e) {
    return false;
  }
};
const sendToken = async (token: string, id: string) => {
  try {
     await userApi.updateUser(id, {firebaseToken: token}); //platform: Platform.OS as  "ios" | "android"
  } catch (e) {
    console.log(e, "sendDeviceToken");
  }
};
