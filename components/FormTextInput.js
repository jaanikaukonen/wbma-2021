import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, StyleSheet} from 'react-native';

const FormTextInput = ({style, ...otherProps}) => {
  return <TextInput style={[styles.textInput, style]} {...otherProps} />;
};

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
    height: 40,
    width: 300,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

FormTextInput.propTypes = {
  style: PropTypes.styles,
};

export default FormTextInput;
