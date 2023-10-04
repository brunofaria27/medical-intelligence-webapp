import axios from "axios";

export async function predictIA(fileUpload: File) {

    const response = await axios.post(
      "http://localhost:5000/predict",
      { image: fileUpload },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data = await response.data;
    return data;
  }