import React, { useState } from "react";
import UploadImage from "../UploadImage/UploadImage";
import { addImagesToProtocol } from "../../redux/slices/protocolsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddImagesForm = ({ protocolID }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const uploadImageHandler = async () => {
    if (file) {
      const formData = new FormData();
      [...file].forEach((currentImage) => {
        formData.append("images", currentImage);
      });

      try {
        await dispatch(addImagesToProtocol({ protocolID, images: formData }));
        navigate(`/protocols`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <UploadImage setFile={setFile} />
      {file ? <button onClick={uploadImageHandler}>Upload</button> : null}
    </>
  );
};

export default AddImagesForm;
