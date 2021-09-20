import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { appID, baseUrl } from "../utils/variables";
import { doFetch } from "../utils/http";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {update} = useContext(MainContext);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, [update]);

  const loadMedia = async () => {
    try {
      const mediaWithoutThumbnails = await doFetch(baseUrl + "tags/" + appID);

      const allData = mediaWithoutThumbnails.map(async (item) => {
        return await loadSingleMedia(item.file_id);
      });
      return await Promise.all(allData);

    } catch (e) {
      console.log("loadMedia", e.message);
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
        method: "POST",
        headers: { "x-access-token": token },
        body: formData
      };
      return await doFetch(baseUrl + "media", options);
    } catch (e) {
      console.log('uploadMedia error', e);
    } finally {
      setLoading(false);
    }
  };

  return { mediaArray, loading, loadMedia, loadSingleMedia, uploadMedia };
};


const useLogin = () => {
  const login = async (userCredentials) => {
    const requestOptions = {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: userCredentials
    };
    try {
      return await await doFetch(baseUrl + "login", requestOptions);
    } catch (e) {
      console.log("Login error", e.message);
    }
  };
  return { login };
};

const useUser = () => {
  const checkToken = async (token) => {
    const requestOptions = {
      headers: {
        "x-access-token": token
      }
    };
    try {
      return doFetch(baseUrl + "users/user", requestOptions);
    } catch (e) {
      console.log("checkToken error: ", e.message);
    }
  };

  const checkIfUsernameIsAvailable = async (username) => {
    try {
      const usernameInfo = await doFetch(baseUrl + "users/username/" + username);
      return usernameInfo.available;
    } catch (e) {
      console.log("checkUsername error: ", e.message);
    }
  };

  const register = async (inputs) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: inputs
    };
    try {
      const response = await fetch(baseUrl + "users", fetchOptions);
      console.log(baseUrl + "users", fetchOptions);
      return await response.json();
    } catch (e) {
      console.log("ApiHooks register", e.message);
      return false;
    }
  };

  return { checkToken, register, checkIfUsernameIsAvailable };
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
      return await doFetch(baseUrl + 'tags', options)
    } catch (e) {
      throw new Error(e.message);
    }
  }

  return { getFilesByTag, addTag };
};

export { useMedia, useLogin, useUser, useTag };
