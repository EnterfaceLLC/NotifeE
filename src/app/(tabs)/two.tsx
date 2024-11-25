import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import notifee, {
  EventType,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";

export default function TabTwoScreen() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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
      title: title,
      // body: "Be sure to download mobile Munch!",
      body: body,
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
            url: "https://mobilemunchmedia.s3.us-east-1.amazonaws.com/Notifs/FoodieFriday.png",
          },
        ],
        foregroundPresentationOptions: {
          badge: true,
        },
      },
    });

    setTitle("");
    setBody("");
  }

  async function onCreateTriggerNotification() {
    const date = new Date(Date.now());
    console.log(date);
    date.setHours(19, 50, 0, 0);
    // date.setMinutes(40);

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
    };
    console.log(trigger);

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: "Meeting with mobile Munch",
        body: "Today at 8:00pm",
        android: {
          channelId: "default",
        },
      },
      trigger
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Notification Message</Text>
        <Text style={[styles.title, { fontSize: 12, fontWeight: "500" }]}>
          Title: {title}
        </Text>
        <Text style={[styles.title, { fontSize: 12, fontWeight: "500" }]}>
          Body: {body}
        </Text>
      </View>

      <View style={styles.bodyCntnr}>
        <Text style={[styles.title, { fontSize: 14 }]}>
          Reach your dedicated customers with notifications
        </Text>
        <TextInput
          placeholder="Enter Message Title"
          onChangeText={(value) => setTitle(value)}
          value={title}
          style={styles.inputContnr}
        />
        <TextInput
          placeholder="Enter Your Message"
          onChangeText={(value) => setBody(value)}
          value={body}
          style={styles.inputContnr}
        />
      </View>

      <View>
        <Button
          title="Submit Notification"
          color={"teal"}
          onPress={() => onDisplayNotification()}
        />

        <Button
          title="Create Trigger Notification"
          color={"tomato"}
          onPress={() => onCreateTriggerNotification()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  header: {
    gap: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "lightgrey",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  bodyCntnr: {
    height: 250,
    paddingHorizontal: 15,
    justifyContent: "space-evenly",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  inputContnr: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
});
