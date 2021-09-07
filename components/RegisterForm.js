import React from 'react';
import PropTypes from 'prop-types';
import {Alert, View} from 'react-native';
import { Button } from "react-native-elements";
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {useUser} from '../hooks/ApiHooks';

const RegisterForm = ({navigation}) => {
  const {inputs, registerErrors, handleInputChange, handleOnEndEditing, checkUsername} = useSignUpForm();
  const {register} = useUser();
  const doRegister = async () => {
    const serverResponse = await register(
      JSON.stringify({
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
        full_name: inputs.full_name,
      })
    );
    if (serverResponse) {
      Alert.alert(serverResponse.message);
    } else {
      Alert.alert('register failed');
    }
  };
  return (
    <View style={{padding: 10}}>
      <FormTextInput
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(evt) => {
          handleOnEndEditing('username', evt.nativeEvent.text)
          checkUsername(evt.nativeEvent.text);
        }}
        errorMessage={registerErrors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        onEndEditing={(evt) => {
          handleOnEndEditing('password', evt.nativeEvent.text)
        }}
        errorMessage={registerErrors.password}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Confirm password"
        onChangeText={(txt) => handleInputChange('confirm_password', txt)}
        secureTextEntry={true}
        onEndEditing={(evt) => {
          handleOnEndEditing('confirm_password', evt.nativeEvent.text)
        }}
        errorMessage={registerErrors.confirm_password}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={(evt) => {
          handleOnEndEditing('email', evt.nativeEvent.text)
        }}
        errorMessage={registerErrors.email}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Full name (Optional)"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing={(evt) => {
          handleOnEndEditing('full_name', evt.nativeEvent.text)
        }}
        errorMessage={registerErrors.full_name}
      />
      <Button raised title="Register" onPress={doRegister} disabled={registerErrors.username || registerErrors.password || registerErrors.email} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;
