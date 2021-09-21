import React from "react";
import { FlatList } from "react-native";
import ListItem from "../components/ListItem";
import { useMedia } from "../hooks/ApiHooks";
import PropTypes from "prop-types";

const List = ({ navigation }) => {
  const { mediaArray } = useMedia();
  return (
    <FlatList
      data={mediaArray.reverse()}
      renderItem={({ item }) => (
        <ListItem
          singleMedia={item}
          navigation={navigation}
          showButtons={false}
        />
        )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default List;

