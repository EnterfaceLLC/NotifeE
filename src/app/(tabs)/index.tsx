import { StyleSheet, Text, View, Button, Alert } from "react-native";

import notifee, { EventType } from "@notifee/react-native";
import { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";

export default function TabOneScreen() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  async function getToken() {
    // await messaging().registerDeviceForRemoteMessages();
    const tok = await messaging().getToken();
    console.log("TOK:", tok);
  }

  useEffect(() => {
    requestUserPermission();
    getToken();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  });

  ///////////
  // useEffect(() => {
  //   const reqPerm = async () => {
  //     try {
  //       await messaging().requestPermission();

  //       await messaging().registerDeviceForRemoteMessages();
  //       const check = messaging().isDeviceRegisteredForRemoteMessages;
  //       // const token = await messaging().getToken();
  //       // console.log("TOKEN:", token);
  //       console.log("CHECK:", check);
  //     } catch (error) {
  //       console.log("PERM-TOKEN ERROR", error);
  //     }
  //   };

  //   reqPerm();
  // }, []);

  // useEffect(() => {
  //   requestUserPermission();
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  // }

  // async function onDisplayNotification() {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: "default",
  //     name: "Default Channel",
  //   });

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: ".Enterface 📱",
  //     body: "Be sure to download mobile Munch!",
  //     android: {
  //       channelId,
  //       color: "#ff0066",
  //       smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: "default",
  //       },
  //     },
  //     ios: {
  //       attachments: [
  //         {
  //           url: "https://mobilemunchmedia.s3.us-east-1.amazonaws.com/Notifs/BestBuyTrks.png",
  //         },
  //       ],
  //       foregroundPresentationOptions: {
  //         badge: true,
  //       },
  //     },
  //   });
  // }

  // useEffect(() => {
  //   return notifee.onForegroundEvent(({ type, detail }) => {
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         console.log("Notification dismissed by user", detail.notification);
  //         break;
  //       case EventType.PRESS:
  //         console.log("Notification clicked by user", detail.notification);
  //         break;
  //     }
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <Text>.Enterface</Text>

      <View>
        <Button
          title="Display Notification"
          onPress={() => onDisplayNotification()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
