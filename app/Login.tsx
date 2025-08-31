import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { login, register } from "../utils/api";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
  webClientId: '<YOUR_WEB_CLIENT_ID>', // client ID of type WEB for your server (needed to verify user ID and access token)
});

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1); // 1 for email, 2 for password
  const router = useRouter();

  const handleContinue = () => {
    if (email) {
      setStep(2);
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("/home");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, password);
      router.replace("/home");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // send userInfo.idToken to your backend
      // and handle login/register
      router.replace("/home");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  const onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      // send appleAuthRequestResponse.identityToken to your backend
      // and handle login/register
      router.replace("/home");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../assets/png/login.png")} // replace with your actual image path
          style={styles.logo}
          resizeMode="cover"
        />

        <Text style={styles.title}>Log in or sign up</Text>
        <Text style={styles.subtitle}>Enter your email to sign up for this app</Text>

        {step === 1 ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="email@domain.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {email.length > 0 && (
              <TouchableOpacity onPress={() => setEmail("")} style={styles.clearBtn}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        )}

        {step === 1 ? (
          <TouchableOpacity style={styles.mainButton} onPress={handleContinue}>
            <Text style={styles.mainButtonText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
              <Text style={styles.mainButtonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mainButton} onPress={handleRegister}>
              <Text style={styles.mainButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.socialButton} onPress={onGoogleButtonPress}>
          <Ionicons name="logo-google" size={20} color="#000" style={styles.icon} />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={onAppleButtonPress}>
          <Ionicons name="logo-apple" size={20} color="#000" style={styles.icon} />
          <Text style={styles.socialText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    position:"relative",
  },


  card: {
    width: "100%",
    maxWidth: 400, 
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    alignSelf: "center",
    width: 120,     // fixed width
    height: 120,    // fixed height
    resizeMode: "contain", // keep aspect ratio
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 12,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    fontSize: 16,
  },
  clearBtn: {
    padding: 4,
  },
  mainButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  mainButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign:"center"
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 8,
    color: "#666",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 10,
  },
  socialText: {
    fontSize: 15,
    color: "#000",
    textAlign:"center",
    justifyContent:"center",
    display:"flex"
  },
});
