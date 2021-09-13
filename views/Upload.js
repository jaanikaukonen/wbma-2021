import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, Platform } from "react-native";
import UploadForm from "../components/UploadForm";
import { Button, Image } from "react-native-elements";
import useUploadForm from "../hooks/UploadHooks";
import * as ImagePicker from "expo-image-picker";
import { useMedia } from "../hooks/ApiHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Upload = (props) => {
  const { inputs, handleInputChange } = useUploadForm();
  const [image, setImage] = useState(require("../assets/icon.png"));
  const [type, setType] = useState("");
  const { uploadMedia } = useMedia();

  const doUpload = async () => {
    const filename = image.uri.split("/").pop();
    const formData = new FormData();
    formData.append("file", { uri: image.uri, name: filename, type });
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    const userToken = await AsyncStorage.getItem("userToken");
    uploadMedia(formData, userToken);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5
    });

    console.log(result);

    if (!result.cancelled) {
      setImage({ uri: result.uri });
      setType(result.type);
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Image
        source={image}
        style={{ width: 400, height: 200 }} />
      <Button title="Select media" onPress={pickImage} />
      <UploadForm title="Upload" handleSubmit={doUpload} handleInputChange={handleInputChange} />
    </View>
  );
};

Upload.propTypes = {};

export default Upload;
