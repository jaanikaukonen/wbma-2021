import React from "react";
import { FlatList } from "react-native";
import ListItem from "../components/ListItem";
import { useMedia } from "../hooks/ApiHooks";

const List = (props) => {
  const { mediaArray } = useMedia();
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;

