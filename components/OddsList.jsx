import React from 'react'
import styles from "../styles/OddsList.module.css"
import OddsCard from './OddsCard'



const OddsList = ({ oddsList }) => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Odds</h1>
        <div className={styles.wrapper}>
        {oddsList.map((games) => (
          <OddsCard key={games.id} games={games} />
          ))}

        </div>
    </div>
  )
}

export default OddsList