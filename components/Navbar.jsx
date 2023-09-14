import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const router = useRouter();

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
          <Link href="/" passHref>
          </Link>
          <Link href="/sportsbook" passHref>
            <li
              className={
                router.pathname === "/sportsbook" ? `${styles.listItem} ${styles.active}` : styles.listItem
              }
              onClick={hideMenu}
            >
              Odds
            </li>
          </Link>
          <Link href="/events" passHref>
            <li
              className={
                router.pathname === "/events" ? `${styles.listItem} ${styles.active}` : styles.listItem
              }
              onClick={hideMenu}
            >
              Events
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
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
