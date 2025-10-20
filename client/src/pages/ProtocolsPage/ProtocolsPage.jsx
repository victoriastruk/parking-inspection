import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProtocols } from "../../redux/slices/protocolsSlice";
import Protocol from "../../components/Protocol/Protocol";

const ProtocolsPage = () => {
  const { protocols, isLoading, error } = useSelector(
    (state) => state.protocols
  );
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getAllProtocols());
  }, []);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>ERROR HAPPENED</div>;
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
        protocol.arkOfficer?.badge_number.toLowerCase().includes(lowerCaseQuery)
      );
    });
  };

  const filteredProtocols = filterProtocols(protocols, searchValue);

  const protocolsCards = filteredProtocols.map((currentProtocol) => (
    <Protocol key={currentProtocol.id} protocol={currentProtocol} />
  ));

  return (
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
  );
};

export default ProtocolsPage;
