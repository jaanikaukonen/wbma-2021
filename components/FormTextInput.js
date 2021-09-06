import React from 'react';
import { Input } from "react-native-elements";

const FormTextInput = ({style, ...otherProps}) => {
  return <Input {...otherProps} />;
};

FormTextInput.propTypes = {
};

export default FormTextInput;
