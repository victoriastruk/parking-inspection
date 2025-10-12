import React, { useState } from "react";
import Slider from "react-slick";
import {
  deleteProtocolByID,
  getAllProtocols,
} from "../../redux/slices/protocolsSlice";
import { useDispatch } from "react-redux";
import AddImage from "../Modals/AddImage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Protocol.module.scss";
import { formatDateTime, timeAgo } from "../../utils/dateUtil";

const Protocol = ({ protocol }) => {
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [addImagesModalOpen, setAddImagesModalOpen] = useState(false);
  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: protocol.images.length > 1,
  };
  const handleDelete = async () => {
    await dispatch(
      deleteProtocolByID({
        parkOfficerID: protocol.officerId,
        protocolID: protocol.id,
      })
    );
    await dispatch(getAllProtocols());
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

      <button type="button" onClick={handleDelete}>
        Delete
      </button>

      <button type="button" onClick={() => setAddImagesModalOpen(true)}>
        Add image(s)
      </button>
      {addImagesModalOpen && (
        <AddImage
          open={addImagesModalOpen}
          setIsOpen={setAddImagesModalOpen}
          protocolID={protocol.id}
        />
      )}

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
    </article>
  );
};

export default Protocol;
