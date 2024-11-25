import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { confirmSignUp, type ConfirmSignUpInput } from "aws-amplify/auth";
import { Redirect, router } from "expo-router";

const ConfrimCodeScrn = () => {
  const [uEmail, setUEmail] = useState("");
  const [code, setCode] = useState("");

  const handleSignUpConfirmation = async ({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: uEmail.toLowerCase(),
        confirmationCode: code,
      });
    } catch (error) {
      console.log("!Error confirming sign up", error);
    }

    router.push("/(auth)/signIn");
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.headContnr}>
        <Text style={styles.heading}>Confirm Your Account</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContnr}>
          <Text>Confirm Email</Text>
          <TextInput
            value={uEmail}
            onChangeText={(v) => setUEmail(v)}
            placeholder={"Enter your email"}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContnr}>
          <Text>Confirmation Code</Text>
          <TextInput
            value={code}
            onChangeText={(v) => setCode(v)}
            placeholder={"Check email for CODE"}
            style={styles.input}
          />
        </View>
      </View>

      <Button
        onPress={handleSignUpConfirmation}
        title="Confirm"
        color={"teal"}
      />
    </SafeAreaView>
  );
};

export default ConfrimCodeScrn;

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
  heading: { fontSize: 20, fontWeight: "300" },
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
