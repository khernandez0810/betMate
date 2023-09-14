import {useEffect, useState} from 'react'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import OddsList from '@/components/OddsList'
import axios from 'axios'
require('dotenv').config();

const apiUrls = {
  nfl: 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=' + process.env.API_KEY + '&regions=us&markets=h2h,spreads,totals&oddsFormat=american&bookmakers=draftkings',
  ncaa: 'https://api.the-odds-api.com/v4/sports/americanfootball_ncaaf/odds/?apiKey=' + process.env.API_KEY + '&regions=us&markets=h2h,spreads,totals&oddsFormat=american&bookmakers=draftkings',
  epl: 'https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=' + process.env.API_KEY + '&regions=us&markets=h2h,spreads,totals&oddsFormat=american&bookmakers=draftkings',
  mlb: 'https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?apiKey=' + process.env.API_KEY + '&regions=us&markets=h2h,spreads,totals&oddsFormat=american&bookmakers=draftkings',
  mma: 'https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds/?apiKey=' + process.env.API_KEY +'&regions=us&markets=h2h,spreads,totals&oddsFormat=american&bookmakers=draftkings'
}
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faFootball, faBaseball, faFutbol } from '@fortawesome/free-solid-svg-icons'
import SportsMmaIcon from '@mui/icons-material/SportsMma';


export default function Home({ initialOddsList }) {

const [activeSubMenu, setActiveSubMenu] = useState(null)
console.log(activeSubMenu)

const [oddsList, setOddsList] = useState(initialOddsList);

const fetchOdds = async (url) => {
  try {
    const res = await axios(url);
    setOddsList(res.data);
    console.log(res.data);
  } catch (error) {
    console.error('error fetching list', error);
    
  }
}





useEffect( () => {
  if(activeSubMenu) {
     fetchOdds(apiUrls[activeSubMenu])
  }
}, [activeSubMenu]);

  return (
    <div className={styles.container}>
      <div className={styles.subNav}>
          <button onClick={() => setActiveSubMenu('nfl')} className={activeSubMenu === 'nfl' ? styles.active : 'listItem'}>NFL  <FontAwesomeIcon icon={faFootball} /></button>
          <button onClick={() => setActiveSubMenu('mlb')} className={activeSubMenu === 'mlb' ? styles.active : ''}>MLB   <FontAwesomeIcon icon={faBaseball} /></button>
          <button onClick={() => setActiveSubMenu('mma')} className={activeSubMenu === 'mma' ? styles.active : ''}>MMA  <SportsMmaIcon className={styles.mma} /></button>
          <button onClick={() => setActiveSubMenu('epl')} className={activeSubMenu === 'epl' ? styles.active : ''}>EPL   <FontAwesomeIcon icon={faFutbol} /></button>
          <button onClick={() => setActiveSubMenu('ncaa')} className={activeSubMenu === 'ncaa' ? styles.active : ''}>NCAA   <FontAwesomeIcon icon={faFootball} /></button>
          </div>
      <OddsList oddsList={oddsList}/>
    </div>

  )
  
}


export async function getServerSideProps() {
  try {
    const res = await axios(apiUrls.nfl);
    return {
      props: {
        initialOddsList: res.data,
      },
    };
  } catch (error) {
    console.error("error fetching odds list", error)
    return {
      initialOddsList: []
    }
  }
}

