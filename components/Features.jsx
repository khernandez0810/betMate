import React from 'react'
import Image from 'next/image'
import styles from "../styles/Features.module.css"
import {useEffect, useState} from 'react'
const Features = () => {
    const [index, setIndex] = useState(0)

  return (
    <div className={styles.container}>
        <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        </div>
    </div>
  )
}

export default Features