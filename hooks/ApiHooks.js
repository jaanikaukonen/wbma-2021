import { useEffect, useState } from "react";
import { baseUrl } from "../utils/variables";
import { doFetch } from "../utils/http";


const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, []);

  const loadMedia = async () => {
    try {
      const mediaWithoutThumbnails = await doFetch(baseUrl + "media");

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

  return { mediaArray, loadMedia, loadSingleMedia };
};

export { useMedia };
