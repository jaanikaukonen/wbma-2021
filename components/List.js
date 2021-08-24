import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ListItem from "../components/ListItem";
import { baseUrl } from "../utils/variables";
import { useMedia } from "../hooks/ApiHooks";

const List = (props) => {
  const { mediaArray } = useMedia();
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

