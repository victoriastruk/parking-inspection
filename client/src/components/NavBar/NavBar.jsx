import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <Link className={styles.link} to="/officers">
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
  );
};

export default NavBar;
