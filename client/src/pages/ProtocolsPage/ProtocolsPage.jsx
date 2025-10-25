import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProtocols,
  getAllProtocolsByOfficerID,
} from "../../redux/slices/protocolsSlice";
import Protocol from "../../components/Protocol/Protocol";
import NavBar from "../../components/NavBar/NavBar";

const ProtocolsPage = () => {
  const { parkOfficerID } = useParams();
  const { protocols, isLoading, error } = useSelector(
    (state) => state.protocols
  );
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (parkOfficerID) {
      dispatch(getAllProtocolsByOfficerID(parkOfficerID));
    } else {
      dispatch(getAllProtocols());
    }
  }, [dispatch, parkOfficerID]);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    const message = error?.errors?.[0]?.message;

    if (message === "Protocols not found") {
      return <div>Protocols not found</div>;
    }

    return <div>Unexpected error: {message || "Something went wrong"}</div>;
  }

  const filterProtocols = (protocols, query) => {
    const lowerCaseQuery = query.toLowerCase().trim();

    const operator = ["<", ">", "="].find((op) =>
      lowerCaseQuery.startsWith(op)
    );

    const amount = parseFloat(lowerCaseQuery.slice(1).trim());

    return protocols.filter((protocol) => {
      const fineAmount = protocol.fineAmount;

      if (operator) {
        switch (operator) {
          case ">":
            return fineAmount > amount;
          case "<":
            return fineAmount < amount;
          case "=":
            return fineAmount === amount;
          default:
            return false;
        }
      }

      return (
        protocol.violatorFullName.toLowerCase().includes(lowerCaseQuery) ||
        protocol.violatorPassportNumber
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        protocol.parkOfficer?.full_name
          .toLowerCase()
          .includes(lowerCaseQuery) ||
        protocol.parkOfficer?.badge_number
          .toLowerCase()
          .includes(lowerCaseQuery)
      );
    });
  };

  const filteredProtocols = filterProtocols(protocols, searchValue);

  const protocolsCards = filteredProtocols.map((currentProtocol) => (
    <Protocol key={currentProtocol.id} protocol={currentProtocol} />
  ));

  const officerFullName =
    parkOfficerID && protocols.length > 0
      ? protocols[0]?.parkOfficer?.full_name
      : null;
  return (
    <>
      <NavBar />
      <h1>
        {officerFullName ? `${officerFullName} | Protocols` : "All Protocols"}
      </h1>

      <section>
        <input
          type="text"
          value={searchValue}
          onChange={({ target: { value } }) => {
            setSearchValue(value);
          }}
          placeholder="Search"
          title="Search by fine (e.g., >50, <100, =75) or other criteria"
        />
        {protocolsCards}
      </section>
    </>
  );
};

export default ProtocolsPage;
