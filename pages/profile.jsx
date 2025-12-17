import React, {useEffect, useState} from 'react';
import styles from '../styles/Contact.module.css';
import jwt_decode from 'jwt-decode'
import axios from 'axios';



const Profile = () => {
const [user, setUser] = useState(null)
console.log(user)
useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
        try {
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
            console.log(userId)
            fetch(`http://localhost:3000/api/users/${userId}`, {
                method:'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((userData) => {
                setUser(userData);
                console.log(userData)
            }).catch((error) => {
                console.error("Error fetching user data", error)
            }) 
        } catch (err) {
            console.error("Error Decoding Token", err)
        } 
    }
}, []);



  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>{user ? `${user.username}'s` : 'User'} page</h1>
      </div>
    </div>
  );
};

export default Profile;
