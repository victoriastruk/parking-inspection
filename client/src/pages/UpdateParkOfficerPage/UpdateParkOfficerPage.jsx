import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getParkOfficers } from "../../redux/slices/parkOfficersSlice";
import UpdateParkOfficerForm from "../../components/Forms/UpdateParkOfficerForm";

const UpdateParkOfficerPage = () => {
  const { parkOfficerID } = useParams();
  const dispatch = useDispatch();

  const { parkOfficers, isLoading } = useSelector((state) => state.parkOfficers);

  useEffect(() => {
    if (!parkOfficers || parkOfficers.length === 0) {
      dispatch(getParkOfficers());
    }
  }, [dispatch, parkOfficers]);

  const officer = parkOfficers?.find(
    (o) => o.id === Number(parkOfficerID)
  );

  if (isLoading) return <p>Loading...</p>;
  if (!officer) return <p>Officer not found</p>;

  return (
    <div>
      <h2>{officer.fullName} | Edit</h2>
      <UpdateParkOfficerForm officer={officer} />
    </div>
  );
};

export default UpdateParkOfficerPage;
