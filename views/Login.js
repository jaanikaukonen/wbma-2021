import React, { useContext, useEffect, useState } from "react";
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
import { Link } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(MainContext);
  const { login } = useLogin();
  const { checkToken } = useUser();
  const [registerFormToggle, setRegisterFormToggle] = useState(false);

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
        {registerFormToggle ? (
            <View style={styles.container}>
              <Text style={styles.text}>Register</Text>
              <RegisterForm navigation={navigation} />
              <Text onPress={(e) => {setRegisterFormToggle(false)}} style={styles.link}>Login</Text>
            </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <LoginForm navigation={navigation} />
            <Text onPress={(e) => {setRegisterFormToggle(true)}} style={styles.link}>Register</Text>
          </View>
        )}
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
  },

  link: {
    marginTop: 30,
    textDecorationLine: 'underline',
    color: 'blue',
    textAlign: 'center',
  }
});

Login.propTypes = {
  navigation: PropTypes.object
};

export default Login;
