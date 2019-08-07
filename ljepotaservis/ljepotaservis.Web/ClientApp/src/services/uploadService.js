import { handleResponse } from "../utils/handleResponse";
import { UPLOAD } from "./constants/endpoints";

export const postImage = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    const requestOptions = {
        method: "POST",
        body: formData
      };

    return fetch(UPLOAD.POST_IMAGE, requestOptions)
    .then(handleResponse)
    .then(imageName => imageName);
}