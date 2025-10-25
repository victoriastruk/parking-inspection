import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "./API";
import ParkOfficersPage from "./pages/ParkOfficersPage/ParkOfficersPage";
import ProtocolsPage from "./pages/ProtocolsPage/ProtocolsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useErrorToast from "./hooks/useErrorToast";
import CreateProtocol from "./pages/CreateProtocol/CreateProtocol";
import AddParkOfficer from "./pages/AddParkOfficer/AddParkOfficer";
import UpdateParkOfficer from "./pages/UpdateParkOfficer/UpdateParkOfficer";
import UpdateProtocol from "./pages/UpdateProtocol/UpdateProtocol"; 

function App() {
   const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(authUser());
    }
  }, [dispatch]);
  useErrorToast();

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        newestOnTop
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/officers" element={<ParkOfficersPage />} />
        <Route path="/officers/add" element={<AddParkOfficer />} />
        <Route path="/officers/edit/:parkOfficerID" element={<UpdateParkOfficer />} />
        <Route path="/protocols" element={<ProtocolsPage />} />
        <Route path="/protocols/create/:parkOfficerID" element={<CreateProtocol />} />
        <Route path="/protocol/edit/:protocolID" element={<UpdateProtocol />} />
        <Route path="/protocols/:parkOfficerID" element={<ProtocolsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
