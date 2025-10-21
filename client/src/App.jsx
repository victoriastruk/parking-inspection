import ParkOfficersPage from "./pages/ParkOfficersPage/ParkOfficersPage";
import ProtocolsPage from "./pages/ProtocolsPage/ProtocolsPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import styles from "./App.module.scss";
import useErrorToast from "./hooks/useErrorToast";
import { ToastContainer } from "react-toastify";

function App() {
  useErrorToast();

  return (
    // <HomePage/>
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
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link className={styles.link} to="/">
              Officers
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/protocols">
              Protocols
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
         <Route path="/" element={<HomePage/>}/>
        {/* <Route path="/" element={<ParkOfficersPage />} /> */}
        <Route path="/protocols" element={<ProtocolsPage />} />
        <Route path="/protocols/:parkOfficerID" element={<ProtocolsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
