import ParkOfficersPage from "./pages/ParkOfficersPage/ParkOfficersPage";
import ProtocolsPage from "./pages/ProtocolsPage/ProtocolsPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import styles from "./App.module.scss";

function App() {
  return (
    <HomePage/>
    // <BrowserRouter>
    //   <nav>
    //     <ul className={styles.navList}>
    //       <li>
    //         <Link className={styles.link} to="/">Officers</Link>
    //       </li>
    //       <li>
    //         <Link className={styles.link} to="/protocols">Protocols</Link>
    //       </li>
    //     </ul>
    //   </nav>
    //   <Routes>
    //     <Route path="/" element={<ParkOfficersPage />} />
    //     <Route path="/protocols" element={<ProtocolsPage />} />
    //     <Route path="/protocols/:parkOfficerID" element={<ProtocolsPage />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
