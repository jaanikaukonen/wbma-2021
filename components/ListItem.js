import { TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";
import { Avatar, Button, ListItem as RNListItem } from "react-native-elements";
import { useMedia } from "../hooks/ApiHooks";
import { MainContext } from "../context/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListItem = ({ singleMedia, navigation, showButtons }) => {
  const {update, setUpdate} = useContext(MainContext);
  const {deleteMedia} = useMedia();
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
              {showButtons && (
                <>
                  <Button title="Modify" />
                  <Button
                    title="Delete"
                    onPress={async () => {
                      try {
                        const token = await AsyncStorage.getItem('userToken');
                        const response = await deleteMedia(
                          singleMedia.file_id,
                          token
                        );
                        console.log('Delete', response);
                        if (response.message) {
                          setUpdate(update + 1);
                        }
                      } catch (e) {
                        console.log('ListItem, delete: ', e.message);
                      }
                    }}
                  />
                </>
              )}
            </RNListItem.Content>
          </RNListItem>
      }
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  showButtons: PropTypes.bool.isRequired,
};

export default ListItem;
