import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ListItem from "../components/ListItem";

const List = (props) => {
  const [mediaArray, setMediaArray] = useState([]);
  const url = "https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json";

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setMediaArray(json);
      } catch (e) {
        console.log(e.message());
      }
    };
    loadMedia();
  }, []);

  console.log(mediaArray);
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;

