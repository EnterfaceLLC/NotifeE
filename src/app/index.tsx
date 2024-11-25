import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { signOut } from "aws-amplify/auth";

const WelcomeScrn = () => {
  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return (
    <SafeAreaView>
      <Text>Welcome Screen</Text>
      <Button title="Sign Up" onPress={() => router.push("/(auth)/signUp")} />
      <Button title="Sign In" onPress={() => router.push("/(auth)/signIn")} />
      <Button title="Sign Out" onPress={handleSignOut} />
    </SafeAreaView>
  );
};

export default WelcomeScrn;

const styles = StyleSheet.create({});
