import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParkOfficers } from "../../redux/slices/parkOfficersSlice";
import ParkOfficer from "../../components/ParkOfficer/ParkOfficer";
import AddParkOfficer from "../../components/Modals/AddParkOfficer";

const ParkOfficersPage = () => {
  const [addParkOfficerModalOpen, setAddParkOfficerModalOpen] = useState(false);
  const { parkOfficers, isLoading, error } = useSelector(
    (state) => state.parkOfficers
  );
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All officers");

  useEffect(() => {
    dispatch(getParkOfficers());
  }, []);

  if (isLoading) {
    return <div>LOADING</div>;
  }
  if (error) {
    return <div>ERROR HAPPENED</div>;
  }

  const filteredByStatus = parkOfficers.filter((officer) => {
    if (statusFilter === "All officers") return true;
    if (statusFilter === "Working Officers") return officer.isWorked === true;
    if (statusFilter === "Not working Officers")
      return officer.isWorked === false;
    return true;
  });

  const filteredParkOfficers = filteredByStatus.filter(
    ({ fullName, badgeNumber, district }) =>
      fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      badgeNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
      district.toLowerCase().includes(searchValue.toLowerCase())
  );
  const parkOfficersCards = filteredParkOfficers.map((currentParkOfficer) => (
    <ParkOfficer key={currentParkOfficer.id} parkOfficer={currentParkOfficer} />
  ));

  return (
    <section>
      <input
        type="text"
        value={searchValue}
        onChange={({ target: { value } }) => setSearchValue(value)}
        placeholder="Search..."
      />
      <select
        value={statusFilter}
        onChange={({ target: { value } }) => setStatusFilter(value)}
      >
        <option>All officers</option>
        <option>Working Officers</option>
        <option>Not working Officers</option>
      </select>
      <button onClick={() => setAddParkOfficerModalOpen(true)}>
        Add officer
      </button>
      {parkOfficersCards}
      {addParkOfficerModalOpen && (
        <AddParkOfficer
          open={addParkOfficerModalOpen}
          setIsOpen={setAddParkOfficerModalOpen}
        />
      )}
    </section>
  );
};

export default ParkOfficersPage;
