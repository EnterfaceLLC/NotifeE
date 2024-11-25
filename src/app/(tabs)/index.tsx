import { StyleSheet, Text, View, Button, Alert } from "react-native";

import notifee, { EventType } from "@notifee/react-native";
import { useEffect, useState } from "react";
import { useNotification } from "@/src/providers/useNotifs";
import { router } from "expo-router";

export default function TabOneScreen() {
  const [notifTitle, setNotifTitle] = useState("");
  const [notifBody, setNotifBody] = useState("");

  const { fcmToken, notification } = useNotification();

  //NOTIFEE CODE BLOCK WORKS!!//
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    // Display a notification
    await notifee.displayNotification({
      // title: ".Enterface 📱",
      title: notifTitle,
      // body: "Be sure to download mobile Munch!",
      body: notifBody,
      android: {
        channelId,
        color: "#ff0066",
        smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: "default",
        },
      },
      ios: {
        attachments: [
          {
            url: "https://mobilemunchmedia.s3.us-east-1.amazonaws.com/Notifs/BestBuyTrks.png",
          },
        ],
        foregroundPresentationOptions: {
          badge: true,
        },
      },
    });
  }

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log("Notification dismissed by user", detail.notification);
          break;
        case EventType.PRESS:
          console.log("Notification clicked by user", detail.notification);
          router.push("/");
          break;
      }
    });
  }, []);

  useEffect(() => {
    if (fcmToken) {
      console.log("FCM Token:", fcmToken);
    }
  }, [fcmToken]);

  useEffect(() => {
    if (notification) {
      // console.log("Received Notification:", notification);
      setNotifTitle(notification.notification["title"]);
      setNotifBody(notification.notification["body"]);
    }
  }, [notification]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>.Enterface</Text>

      <View>
        <Button
          title="Display Notification"
          color={"teal"}
          onPress={() => onDisplayNotification()}
        />
      </View>
      <View style={styles.separator} />

      <View>
        {/* <Text>Your FCM Token: {fcmToken}</Text> */}
        {notification && (
          <View
            style={{
              backgroundColor: "lightgrey",
              padding: 10,
              borderRadius: 15,
              marginHorizontal: 5,
            }}
          >
            <Text style={[styles.title, { fontSize: 14 }]}>Push Notif</Text>
            <Text style={{ fontSize: 12 }}>{JSON.stringify(notification)}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    borderColor: "lightgrey",
    borderWidth: StyleSheet.hairlineWidth,
    width: "90%",
  },
});
