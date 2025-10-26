import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {
  deleteProtocolByID,
  getAllProtocolsByOfficerID,
  deleteProtocolImageByID,
} from "../../redux/slices/protocolsSlice";
import { useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Protocol.module.scss";
import { formatDateTime, timeAgo } from "../../utils/dateUtil";
import DeleteConfirmation from "../Modals/DeleteConfirmation";

const Protocol = ({ protocol, protocolsPerPage, currentPage }) => {
  const navigate = useNavigate();
  const [
    deleteProtocolConfirmationModalOpen,
    setDeleteProtocolConfirmationModalOpen,
  ] = useState(false);
  const [deleteImageModalOpen, setDeleteImageModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: protocol.images.length > 1,
    afterChange: (currentImageIndex) => {
      setCurrentSlide(currentImageIndex);
    },
  };

  const handleAddImages = () => {
    navigate(`/protocol/add-images/${protocol.id}`);
  };

  const handleUpdateProtocol = () => {
    navigate(`/protocol/edit/${protocol.id}`);
  };

  const handleDelete = async () => {
    await dispatch(
      deleteProtocolByID({
        parkOfficerID: protocol.officerId,
        protocolID: protocol.id,
      })
    );
    await dispatch(
      getAllProtocolsByOfficerID({
        parkOfficerID: protocol.officerId,
        limit: protocolsPerPage,
        offset: (currentPage - 1) * protocolsPerPage,
      })
    );
  };

  const deleteImageHandler = async () => {
    await dispatch(
      deleteProtocolImageByID({
        protocolID: protocol.id,
        imageID: protocol.images[currentSlide].id,
      })
    );
    setDeleteImageModalOpen(false);
    await dispatch(
      getAllProtocolsByOfficerID({
        parkOfficerID: protocol.officerId,
        limit: protocolsPerPage,
        offset: (currentPage - 1) * protocolsPerPage,
      })
    );
  };

  return (
    <article className={styles.cardWrapper}>
      <h1>Protocol № {protocol.id}</h1>
      <p>Service notes: {protocol.serviceNotes}</p>
      <p>Fine amount: {protocol.fineAmount}</p>
      <p>Violator full name: {protocol.violatorFullName}</p>
      <p>Violator passport number: {protocol.violatorPassportNumber}</p>
      <p>
        Created: {formatDateTime(protocol.createdAt)} |{" "}
        {timeAgo(protocol.createdAt)}
      </p>
      <p>
        Updated: {formatDateTime(protocol.updatedAt)} |{" "}
        {timeAgo(protocol.updatedAt)}
      </p>

      <p>Officer full name: {protocol.parkOfficer.full_name}</p>
      <p>Officer badge number: {protocol.parkOfficer.badge_number}</p>

      <button type="button" onClick={handleUpdateProtocol}>
        Edit
      </button>

      <button onClick={() => setDeleteProtocolConfirmationModalOpen(true)}>
        Delete
      </button>

      {deleteProtocolConfirmationModalOpen && (
        <DeleteConfirmation
          open={deleteProtocolConfirmationModalOpen}
          setIsOpen={setDeleteProtocolConfirmationModalOpen}
          title="Delete protocol"
          message={`Are you sure you want to delete Protocol № ${protocol.id}?`}
          deleteCallback={handleDelete}
        />
      )}

      <button type="button" onClick={handleAddImages}>
        Add image(s)
      </button>

      {protocol.images.length > 0 && (
        <Slider {...settings} className={styles.slider}>
          {protocol.images.map((currentImage) => (
            <img
              className={styles.img}
              key={currentImage.id}
              src={`http://localhost:5001/images/${currentImage.path}`}
              alt={protocol.id}
            />
          ))}
        </Slider>
      )}

      {protocol.images.length > 0 && (
        <button onClick={() => setDeleteImageModalOpen(true)}>
          Delete current image in the slide
        </button>
      )}

      {deleteImageModalOpen && (
        <DeleteConfirmation
          open={deleteImageModalOpen}
          setIsOpen={setDeleteImageModalOpen}
          title="Delete image"
          message="Are you sure you want to delete this image?"
          deleteCallback={deleteImageHandler}
        />
      )}
    </article>
  );
};

export default Protocol;
