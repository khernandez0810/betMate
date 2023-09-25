import React, {useState} from 'react'
import axios from 'axios';
import styles from "../styles/OddsCard.module.css"
import Moment from 'moment/moment';
import 'moment-timezone'
const OddsCard = ( {games} ) => {

const formatDate = (dateTimeString) => {
  const dateTime = Moment(dateTimeString);
  const userTimeZone = Moment.tz.guess();
  dateTime.tz(userTimeZone)
  const formattedDate = dateTime.format(' MMMM D, YYYY, h:mm A')

  return formattedDate;

}

{formatDate(games.commence_time)}



  return (
<div className={styles.container}>
<table className={styles.table}>
<thead>
        <tr className={styles.trTitle}>
        <th>{formatDate(games.commence_time)}</th>
        
        <th className={styles.moneyLine}>Moneyline</th>
        <th>Spread</th>
        <th>O/U</th>
        </tr>
      </thead>
      <tbody className={styles.matchup}>
        <tr className={styles.team}>
        <td className={styles.teamText}>
          <p>
            {games.bookmakers[0]?.markets[0]?.outcomes[1]?.name || "NA"}
          </p>
        </td>
        <td className={styles.moneyLine}>{games.bookmakers[0]?.markets[0]?.outcomes[1]?.price || "NA"}</td>
        <td>{games.bookmakers[0]?.markets[1]?.outcomes[1]?.point || "NA"}</td>
        <td>-{games.bookmakers[0]?.markets[2]?.outcomes[1]?.point || "NA"}</td>
        </tr>
        <tr className={styles.team}>
        <td className={styles.teamText}>{games.bookmakers[0]?.markets[0]?.outcomes[0]?.name || "NA"}</td>
        
        <td className={styles.moneyLine}>{games.bookmakers[0]?.markets[0]?.outcomes[0]?.price || "NA"}</td>
        <td>{games.bookmakers[0]?.markets[1]?.outcomes[0]?.point || "NA"}</td>
        <td>+{games.bookmakers[0]?.markets[2]?.outcomes[0]?.point || "NA"}</td>
        </tr>
      </tbody>
      </table>
</div>


  )
  
}


export default OddsCard;