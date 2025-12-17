import { useEffect, useState } from "react";
import styles from "@/styles/Odds.module.css";
import OddsList from "@/components/OddsList";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFootball, faBaseball, faFutbol } from "@fortawesome/free-solid-svg-icons";

const apiUrls = {
  nfl: "/api/odds/nfl",
  ncaa: "/api/odds/ncaa",
  epl: "/api/odds/epl",
  mlb: "/api/odds/mlb",
  mma: "/api/odds/mma",
};

export default function Home({ initialOddsList }) {
  const [activeSubMenu, setActiveSubMenu] = useState("nfl");
  const [oddsList, setOddsList] = useState(initialOddsList);

  const fetchOdds = async (url) => {
    try {
      const res = await axios.get(url);
      setOddsList(res.data);
    } catch (error) {
      <h1>Please come back furing the season</h1>
      console.error("error fetching list", error);
      setOddsList([]); // fail gracefully
    }
  };

  useEffect(() => {
    if (activeSubMenu) fetchOdds(apiUrls[activeSubMenu]);
  }, [activeSubMenu]
);

  return (
    <div className={styles.container}>
      <div className={styles.subNav}>
        <button
          onClick={() => setActiveSubMenu("nfl")}
          className={activeSubMenu === "nfl" ? styles.active : ""}
        >
          NFL <FontAwesomeIcon icon={faFootball} />
        </button>

        <button
          onClick={() => setActiveSubMenu("mlb")}
          className={activeSubMenu === "mlb" ? styles.active : ""}
        >
          MLB <FontAwesomeIcon icon={faBaseball} />
        </button>

        <button
          onClick={() => setActiveSubMenu("epl")}
          className={activeSubMenu === "epl" ? styles.active : ""}
        >
          EPL <FontAwesomeIcon icon={faFutbol} />
        </button>

        <button
          onClick={() => setActiveSubMenu("ncaa")}
          className={activeSubMenu === "ncaa" ? styles.active : ""}
        >
          NCAA <FontAwesomeIcon icon={faFootball} />
        </button>
      </div>

      <OddsList oddsList={oddsList} />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // call your own API route on the server
    const res = await axios.get("http://localhost:3000/api/odds/nfl");
    return { props: { initialOddsList: res.data } };
  } catch (error) {
    console.error("error fetching odds list", error);
    return { props: { initialOddsList: [] } };
  }
}
