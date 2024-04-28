import User from '../models/user.models.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email })
  if (user) {
    return res.json({ status: true, message: 'User already exists' })
  }

  const hashpassword = await bcrypt.hash(password, 10)
  const newUser = new User({
    username,
    email,
    password: hashpassword,
 
  })

  await newUser.save()
  return res.json({ message: 'User registered succesfully' })
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    return res.json({message: 'Incorrect password'})
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
  return res.json({ status: true, message: "login successfull" })
  
};


