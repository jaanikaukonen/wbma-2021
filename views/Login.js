import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";
import { MainContext } from "../context/MainContext";
import { useLogin, useUser } from "../hooks/ApiHooks";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(MainContext);
  const { login } = useLogin();
  const { checkToken } = useUser();

  const doLogin = async () => {
    try {
      const loginInfo = await login(
        JSON.stringify({
          username: "flander",
          password: "Testi123!"
        })
      );
      console.log("token login", loginInfo.token);
      await AsyncStorage.setItem("userToken", loginInfo.token);
      console.log(await AsyncStorage.getItem("userToken"));
      setIsLoggedIn(true);
    } catch (e) {
      console.log("doLogin error", e.message);
    }
  };

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log("token", userToken);

    if (userToken) {
      const userInfo = await checkToken(userToken);
      if (userInfo.user_id) {
        setIsLoggedIn(true);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardView}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.text}>Login</Text>
          <LoginForm navigation={navigation} />
          <Text style={styles.text}>Register</Text>
          <RegisterForm navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#fff",
  },

  keyboardView: {
    flex: 1
  },

  text : {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600',
    margin: 20,
  }
});

Login.propTypes = {
  navigation: PropTypes.object
};

export default Login;
