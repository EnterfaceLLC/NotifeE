import { Authenticator } from "@aws-amplify/ui-react-native";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
