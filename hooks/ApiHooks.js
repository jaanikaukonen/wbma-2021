import { useContext, useEffect, useState } from "react";
import { appID, baseUrl } from "../utils/variables";
import { doFetch } from "../utils/http";
import { MainContext } from "../context/MainContext";

const useMedia = (ownFiles) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {update, user} = useContext(MainContext)

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, [update]);

  const loadMedia = async () => {
    try {
      let mediaWithoutThumbnails = await useTag().getFilesByTag(appID);

      if (ownFiles) {
        mediaWithoutThumbnails = mediaWithoutThumbnails.filter(
          (item) => item.user_id === user.user_id
        );
      }

      const allFiles = mediaWithoutThumbnails.map(async (media) => {
        return await loadSingleMedia(media.file_id);
      });
      return Promise.all(allFiles);
    } catch (e) {
      console.log('loadMedia', e.message);
    }
  };

  const loadSingleMedia = async (id) => {
    try {
      return await doFetch(baseUrl + "media/" + id);
    } catch (e) {
      console.log("loadSingleMedia", e.message);
      return {};
    }
  };

  const uploadMedia = async (formData, token) => {
    try {
      setLoading(true);
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        body: formData,
      };
      return await doFetch(baseUrl + 'media', options);
    } catch (e) {
      console.log('uploadMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id, token) => {
    try {
      setLoading(true);
      const options = {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      };
      const result = await doFetch(baseUrl + 'media/' + id, options);
      return result;
    } catch (e) {
      console.log('deleteMedia error', e);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { mediaArray, loading, loadMedia, loadSingleMedia, uploadMedia, deleteMedia };
};


const useLogin = () => {
  const login = async (userCredentials) => {
    const requestOptions = {
      method: 'POST',
      // mode: 'no-cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    try {
      return await doFetch(baseUrl + 'login', requestOptions);
    } catch (error) {
      console.log('login error', error.message);
    }
  };
  return {login};
};

const useUser = () => {
  const checkToken = async (token) => {
    const options = {
      method: 'GET',
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + 'users/user', options);
    } catch (error) {
      console.log('checkToken error', error);
    }
  };

  const checkUsernameAvailable = async (username) => {
    try {
      const usernameInfo = await doFetch(
        baseUrl + 'users/username/' + username
      );
      return usernameInfo.available;
    } catch (error) {
      console.log('checkUsername error', error);
    }
  };

  const register = async (userCredentials) => {
    // https://media.mw.metropolia.fi/wbma/docs/#api-User-PostUser
    const requestOptions = {
      method: 'POST',
      // mode: 'no-cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    try {
      return await doFetch(baseUrl + 'users', requestOptions);
    } catch (error) {
      console.log('register error', error.message);
    }
  };

  return {checkToken, register, checkUsernameAvailable};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + "tags/" + tag);
    } catch (e) {
      console.log(e.message);
      return {};
    }
  };

  const addTag = async (file_id, tag, token) => {
    const options = {
      method: 'POST',
      headers: {'x-access-token': token, "Content-Type": "application/json"},
      body: JSON.stringify({file_id, tag}),
    }

    try {
      const tagInfo = await doFetch(baseUrl + 'tags', options)
      return tagInfo
    } catch (e) {
      throw new Error(e.message);
    }
  }

  return { getFilesByTag, addTag };
};

export { useMedia, useLogin, useUser, useTag };
