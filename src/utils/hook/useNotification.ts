import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidColor, AndroidImportance, AndroidVisibility, EventType } from "@notifee/react-native";
//import {NotificationResponse} from "../../api/Client/type";
import rootStore from "../../store/RootStore/root-store";
import { userApi } from "../../api/userApi";
import AuthStore from "../../store/AuthStore/auth-store";
import { NotificationResponse } from "../../store/types/types";

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
   const dataAndroid = data?.data?.android
   const dataIos = data?.data?.ios
  const channelId = await createChannel();
  await notifee.displayNotification({
    title: data.notification?.title,
    body: data.notification?.body,
    data: { ...data.data },
    ios: {
      categoryId: "iosDefault",
      threadId: "iosDefault",
      targetContentId: "iosDefault",
      interruptionLevel: "active",
      badgeCount: 0,
      sound: "default",
      foregroundPresentationOptions: {
        banner: true,
        sound: true,
        badge: true,
        list: true,
        alert: true
      },
      launchImageName: "notification_icon",
     ...dataIos
    },
    android: {
      channelId,
      lightUpScreen: true,
      smallIcon: "notification_icon",
      ...dataAndroid
    }
  });
};
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
              console.log(user._id);
              sendToken(token, user._id)
            });
        }
      });
    }
    ;(async () => {
      //for ios
      await notifee.requestPermission({
        sound: true,
        announcement: true,
        alert: true,
        // provisional: true, // тихие увед
        criticalAlert: true
      });
    })();
  }, [isAuth]);
  useEffect(() => {
    // дергается при открытом приложении
    const unsubscribeForegroundEvent = notifee.onForegroundEvent(notificationHandler);
    // дергается при фоновом и убитом стейте
    notifee.onBackgroundEvent(notificationHandler);
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
     await messaging().registerDeviceForRemoteMessages();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  } catch (e) {
    return false;
  }
};
const sendToken = async (token: string, id: string) => {
  try {
     await userApi.updateUser(id, {firebaseToken: token});
  } catch (e) {
    console.log(e, "sendDeviceToken");
  }
};
