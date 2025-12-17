import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { connect } from 'react-redux'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false); 

 useEffect (() => {
  const token = localStorage.getItem('token');
  if(token) {
    setLoggedIn(true);
  } else {
    setLoggedIn(false)
  }
}, [])

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <button className={styles.toggleMenu} onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={styles.texts}>
          <div className={styles.text}>Bet Mate</div>
        </div>
      </div>
      
      <div className={styles.item}>
        <ul className={`${styles.list} ${showMenu ? styles.show : ""}`}>
          <Link href="/home" passHref>
            {/* You can add a Home link here if needed */}
          </Link>
          <Link href="/home" passHref>
          </Link>
          <Link href="/odds" passHref>
            <li
              className={
                router.pathname === "/odds" ? `${styles.listItem} ${styles.active}` : styles.listItem
              }
              onClick={hideMenu}
            >
              Odds
            </li>
          </Link>
          <Link href="/contact" passHref>
            <li
              className={
                router.pathname === "/contact" ? `${styles.listItem} ${styles.active}` : styles.listItem
              }
              onClick={hideMenu}
            >
              Contact
            </li>
          </Link>
          {isLoggedIn && (
        <Link href="/profile" passHref>
          <div className={styles.item}>
            <div className={styles.cart}>
              Profile
            </div>
          </div>
        </Link>
      )}
        </ul>
      </div>
      

      {!isLoggedIn && (
        <Link href="/login" passHref>
          <div className={styles.item}>
            <div className={styles.cart}>
              Log In
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Navbar);