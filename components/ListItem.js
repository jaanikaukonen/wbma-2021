import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";

const ListItem = ({ singleMedia }) => {
  return (
    <TouchableOpacity style={styles.row}>
      <Image
        style={styles.image}
        source={{ uri: uploadsUrl + singleMedia.thumbnails?.w160 }}
      />
      <View style={styles.textbox}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text style={styles.paragraph}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object
};

const styles = StyleSheet.create({
  textbox: {
    flex: 5
  },
  image: {
    flex: 4,
    height: "100%",
    margin: 5
  },
  title: {
    fontWeight: "bold"
  },
  paragraph: {
    fontSize: 15
  },
  row: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 2,
    padding: 10,
    backgroundColor: "#afafaf",
    height: 300
  }
});

export default ListItem;
