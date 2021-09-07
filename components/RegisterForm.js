import React from 'react';
import PropTypes from 'prop-types';
import {Alert, View} from 'react-native';
import { Button } from "react-native-elements";
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {useUser} from '../hooks/ApiHooks';

const RegisterForm = ({navigation}) => {
  const {inputs, registerErrors, handleInputChange, checkUsername} = useSignUpForm();
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
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(evt) => {
          const availability = checkUsername(evt.nativeEvent.text);
        }}
        errorMessage={registerErrors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button raised title="Register" onPress={doRegister} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;
