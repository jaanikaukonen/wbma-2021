import React from "react";
import PropTypes from "prop-types";
import FormTextInput from "./FormTextInput";
import { Button, Input } from "react-native-elements";

const handleInputChange = () => {
};

const UploadForm = ({ title, handleSubmit, handleInputChange, loading }) => {

  return (
    <>
      <Input
        autoCapitalize="none"
        placeholder="Title"
        onChangeText={(txt) => handleInputChange("title", txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="Description"
        onChangeText={(txt) => handleInputChange("description", txt)}
      />
      <Button raised title={title} onPress={handleSubmit} loading={loading} />
    </>
  );
};

UploadForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default UploadForm;
