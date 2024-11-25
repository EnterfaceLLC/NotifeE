import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

import { signIn, type SignInInput, signUp } from "aws-amplify/auth";
import { Redirect } from "expo-router";

const SignInScrn = () => {
  //   const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");
  const [uPassword, setUPassword] = useState("");

  async function handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: uEmail.toLowerCase(),
        password: uPassword,
        options: {
          userAttributes: {},
        },
      });
      console.log(isSignedIn);
    } catch (error) {
      console.log("error signing in", error);
      Alert.alert("Oh No!", error.message);
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.headContnr}>
        <Text style={styles.heading}>Explore the</Text>
        <Text style={styles.heading}>Munch Community</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContnr}>
          <Text>Email</Text>
          <TextInput
            value={uEmail}
            onChangeText={(v) => setUEmail(v)}
            placeholder={"Enter Email"}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContnr}>
          <Text>Password</Text>
          <TextInput
            value={uPassword}
            onChangeText={(v) => setUPassword(v)}
            placeholder={"Enter Password"}
            style={styles.input}
          />
        </View>
      </View>

      <Button onPress={handleSignIn} title="Sign In" color={"teal"} />
    </SafeAreaView>
  );
};

export default SignInScrn;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  headContnr: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
  },
  heading: { fontSize: 28, fontWeight: "300" },
  form: {
    flex: 1,
    gap: 15,
    width: "90%",
    paddingHorizontal: 10,
    marginVertical: 30,
  },
  inputContnr: {
    gap: 5,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "teal",
  },
});
