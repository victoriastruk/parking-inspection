import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParkOfficers } from "../../redux/slices/parkOfficersSlice";
import ParkOfficer from "../../components/ParkOfficer/ParkOfficer";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Pagination from "../../components/Pagination/Pagination";

const ParkOfficersPage = () => {
  const navigate = useNavigate();

  const { parkOfficers, total, isLoading, error } = useSelector(
    (state) => state.parkOfficers
  );
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All officers");
  const [currentPage, setCurrentPage] = useState(1);
  const officersPerPage = 5;

  useEffect(() => {
    const offset = (currentPage - 1) * officersPerPage;
    dispatch(getParkOfficers({ limit: officersPerPage, offset }))
      .unwrap()
      .catch((err) => {
        if (
          err.message === "Unauthorized" ||
          err.message === "Session expired"
        ) {
          navigate("/officers");
        }
      });
  }, [dispatch, navigate, currentPage]);

  if (isLoading) {
    return <div>LOADING</div>;
  }
  if (error) {
    return <div>ERROR HAPPENED</div>;
  }
  const handleAddOfficer = () => {
    navigate("/officers/add");
  };
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
    <ParkOfficer
      key={currentParkOfficer.id}
      parkOfficer={currentParkOfficer}
      currentPage={currentPage}
      officersPerPage={officersPerPage}
    />
  ));
  const totalPages = Math.ceil(total / officersPerPage);
  return (
    <>
      <NavBar />
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
        <button onClick={handleAddOfficer}>Add officer</button>
        {parkOfficersCards}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </>
  );
};

export default ParkOfficersPage;
