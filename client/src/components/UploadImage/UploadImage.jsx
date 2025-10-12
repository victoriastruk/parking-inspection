import React from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const UploadImage = ({ setFile }) => {
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <FileUploader
      multiple={true}
      handleChange={handleChange}
      name="file"
      types={fileTypes}
    />
  );
};

export default UploadImage;
