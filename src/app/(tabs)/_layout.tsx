import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { Alert, AppRegistry } from "react-native";
// import { Pressable } from "react-native";
import messaging from "@react-native-firebase/messaging";
import App from "./index";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  // }

  // async function getToken() {
  //   // await messaging().registerDeviceForRemoteMessages();
  //   const tok = await messaging().getToken();
  //   console.log("TOK:", tok);
  // }

  // useEffect(() => {
  //   requestUserPermission();
  //   getToken();

  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // });


  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Notify",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="draw-pen" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
