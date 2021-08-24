import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ListItem from "../components/ListItem";
import { baseUrl } from "../utils/variables";

const List = (props) => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(baseUrl + "media");
        const mediaWithoutThumbnails = await response.json();

        const allData = mediaWithoutThumbnails.map(async (item) => {
          const response = await fetch(baseUrl + "media/" + item.file_id);
          const media = await response.json();
          return media;
        });

        setMediaArray(await Promise.all(allData));

      } catch (e) {
        console.log(e.message);
      }
    };
    loadMedia();
  }, []);

  console.log("List: mediaArray ", mediaArray);
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;

