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
import CreateProtocolPage from "./pages/CreateProtocolPage/CreateProtocolPage";
import AddParkOfficerPage from "./pages/AddParkOfficerPage/AddParkOfficerPage";
import UpdateParkOfficerPage from "./pages/UpdateParkOfficerPage/UpdateParkOfficerPage";
import UpdateProtocolPage from "./pages/UpdateProtocolPage/UpdateProtocolPage";
import AddImagesPage from "./pages/AddImagesPage/AddImagesPage";

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
        <Route path="/officers/add" element={<AddParkOfficerPage />} />
        <Route
          path="/officers/edit/:parkOfficerID"
          element={<UpdateParkOfficerPage />}
        />
        <Route path="/protocols" element={<ProtocolsPage />} />
        <Route
          path="/protocols/create/:parkOfficerID"
          element={<CreateProtocolPage />}
        />
        <Route
          path="/protocol/edit/:protocolID"
          element={<UpdateProtocolPage />}
        />
        <Route path="/protocols/:parkOfficerID" element={<ProtocolsPage />} />
        <Route path="/protocol/add-images/:protocolID" element={<AddImagesPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
