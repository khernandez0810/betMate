
import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
    return (
        
        <div className={styles.container}>
            <div className={styles.item}>
            <div className={styles.card}>
                <h2 className={styles.motto}>
                    Betmate
                </h2>
            </div>
            <div className={styles.card}>
                <h1 className={styles.title}>Locations</h1>
                <p className={styles.text}>
                    730 Simms
                    <br /> Lakewood, CO 80401
                    <br /> 4077459097
                </p>
</div>
<div className={styles.card}>
<h1 className={styles.title}>Hours</h1>
<p className={styles.text}> M-F <br /> 8-4</p>
</div>

            </div>
        </div>
    )



}

export default Footer