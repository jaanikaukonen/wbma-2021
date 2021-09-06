import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";
import { Avatar, Button, ListItem as RNListItem } from "react-native-elements";

const ListItem = ({ singleMedia, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single', singleMedia)
      }}
    >
      {
          <RNListItem  bottomDivider>
            <Avatar source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}} />
            <RNListItem.Content>
              <RNListItem.Title>{singleMedia.title}</RNListItem.Title>
              <RNListItem.Subtitle>{singleMedia.description}</RNListItem.Subtitle>
            </RNListItem.Content>
          </RNListItem>
      }
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

export default ListItem;
