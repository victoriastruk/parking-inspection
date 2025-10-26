import React from "react";
import AddImagesForm from "../../components/Forms/AddImagesForm";
import { useParams } from "react-router-dom";

const AddImagesPage = () => {
  const { protocolID } = useParams();

  return (
    <div>
      <h2>Add images</h2>
      <AddImagesForm protocolID={protocolID} />
    </div>
  );
};

export default AddImagesPage;
