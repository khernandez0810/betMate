import cookie from 'cookie'
import dbConnect from "@/config/connection";
require('dotenv').config();
const bcrypt = require('bcrypt');
import User from '../../models/User'
const jwt = require('jsonwebtoken')
const handler = async (req, res) => {
const crypto = require('crypto');
const secretKet=crypto.randomBytes(16).toString('hex')
await dbConnect();
const expiration = '2h'

if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
  
      if (user) {
        // Compare the plain text password with the hashed password
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            const token = jwt.sign({userId: user._id}, secretKet, {
              expiresIn: expiration
            })
            // Passwords match, set the token;
            res.status(200).json({token});
          } else {
            // Passwords don't match
            res.status(400).json('Wrong Credentials');
          }
        });
      } else {
        // User not found
        res.status(400).json('Wrong Credentials');
      }
    } catch (error) {
      console.error('Database error', error);
      res.status(500).json("Server Error");
    }
  }

}

// if(req.method === "GET") {
//     const {username, password} = req.body;
//     if(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
//         res.setHeader('Set-Cookie', cookie.serialize("token", process.env.TOKEN, {
//             maxAge: 60*60,
//             sameSite: "strict",
//             path: "/",
//         }
        
//         ));
//         res.status(200).json("Success");
// } else {
//     res.status(400).json("Wrong Credentials");
// }
// }

export default handler;