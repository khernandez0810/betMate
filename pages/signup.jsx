import React from 'react';
import {useState} from 'react'
import styles from '../styles/Login.module.css';
import {useRouter} from 'next/router';
import axios from 'axios';
// Make sure to add the Instagram icon to the library

const Signup = () => {
const [password, setPassword] = useState(null)
const [username, setUsername] = useState(null)
const [email, setEmail] = useState(null)
const [error, setError] = useState(false);
const router = useRouter();

const handleClick = async () => {
    try {
        await axios.post("http://localhost:3000/api/users", {username, password, email})
        router.push('/login')
    } catch (error) {
        console.log(error);
        setError(true)
    }
}




  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
        <h1>
            Sign up
        </h1>
        <input placeholder='Username' className={styles.input} onChange ={(e) => setUsername(e.target.value)}/>
        <input placeholder='Password' className={styles.input} onChange ={(e) => setPassword(e.target.value)}/>
        <input placeholder='Email' className={styles.input} onChange ={(e) => setEmail(e.target.value)}/>
        <button onClick={handleClick} className={styles.button}>
        Sign up
        </button>
    </div>
</div>
  );
};

export default Signup;
