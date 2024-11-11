// NotificationProvider.js
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  PropsWithChildren,
} from "react";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { Platform, Alert } from "react-native";

// Create the Notification Context
const NotificationContext = createContext({});

// Provider component
export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [fcmToken, setFcmToken] = useState<string>();
  const [notification, setNotification] =
    useState<FirebaseMessagingTypes.RemoteMessage>();

  useEffect(() => {
    // Register and get FCM token
    registerForPushNotifications();

    // Listen for messages while the app is in the foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      setNotification(remoteMessage);
      console.log("Foreground notification:", remoteMessage);
    });

    // Listen for notifications when the app is opened from a background state
    messaging().onNotificationOpenedApp((remoteMessage) => {
      setNotification(remoteMessage);
      console.log("Notification opened from background:", remoteMessage);
    });

    // Check if the app was opened by a notification when in a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          setNotification(remoteMessage);
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage
          );
        }
      });

    return unsubscribe;
  }, []);

  // Register for push notifications and get the FCM token
  const registerForPushNotifications = async () => {
    // Request permission on iOS
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      Alert.alert("Push notifications permission is required.");
      return;
    }

    // Get the FCM token
    const token = await messaging().getToken();
    setFcmToken(token);
    // console.log("FCM Token:", token);

    // Optional: handle token refresh
    messaging().onTokenRefresh((token) => {
      setFcmToken(token);
      console.log("Token refreshed:", token);
    });
  };

  return (
    <NotificationContext.Provider value={{ fcmToken, notification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the Notification context
export const useNotification = () => useContext(NotificationContext);
