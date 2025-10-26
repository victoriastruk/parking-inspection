import React, { useEffect } from "react";
import UpdateProtocolForm from "../../components/Forms/UpdateProtocolForm";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProtocolsByOfficerID } from "../../redux/slices/protocolsSlice";

const UpdateProtocolPage = () => {
  const { protocolID, parkOfficerID } = useParams();
  const dispatch = useDispatch();
  const { protocols, isLoading } = useSelector((state) => state.protocols);

  useEffect(() => {
    if (!protocols || protocols.length === 0) {
      dispatch(getAllProtocolsByOfficerID(parkOfficerID));
    }
  }, [dispatch, parkOfficerID, protocols]);
  const protocol = protocols.find((p) => p.id === Number(protocolID));

  if (isLoading) return <p>Loading...</p>;
  if (!protocol) return <p>Protocol not found</p>;

  return (
    <div>
      <h2>Edit Protocol № {protocol.id}</h2>
      <UpdateProtocolForm protocol={protocol} />
    </div>
  );
};

export default UpdateProtocolPage;
