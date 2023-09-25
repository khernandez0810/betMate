import React from 'react';
import {useState} from 'react'
import styles from '../styles/Login.module.css';
import {useRouter} from 'next/router';
import Link from "next/link";
// Make sure to add the Instagram icon to the library
import axios from 'axios';

const Login = () => {
const [username, setUsername] = useState(null);
const [password, setPassword] = useState(null)
const [error, setError] = useState(false);
const router = useRouter();

const handleClick = async () => {
    try {
       const res = await axios.post("http://localhost:3000/api/login", {username, password});
       if(res.status === 200) {
        const {token} = res.data;
        localStorage.setItem('token',token)
       }
        router.push('/home')
    } catch (error) {
        console.log(error);
        setError(true)
    }
}




  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
        <h1>
            Sign In
        </h1>
        <input placeholder='Username' className={styles.input} onChange ={(e) => setUsername(e.target.value)}/>
        <input placeholder='Password' className={styles.input} onChange ={(e) => setPassword(e.target.value)}/>
        <button onClick={handleClick} className={styles.button}>
        Sign In
        </button>
        <Link href="/signup">
        <button className={styles.signup}>
        Sign up
        </button>
        </Link>
        {error && <span className={styles.error}>Wrong Username or Password</span>}
    </div>
</div>
  );
};

export default Login;
