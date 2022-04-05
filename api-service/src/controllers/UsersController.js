const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = require('../services/UserServices');

exports.index = function (req, res, next) {
  return res.status(200).json({
      msg: "Welcome to api."
  });
}

exports.register = async function (req, res, next) {
  const { email, role } = req.body;
  
  if(!email){
    return res.status(422).json({
      error: "The field email is required."
    })
  }

  if(!role){
    return res.status(422).json({
      error: "The field role is required."
    })
  }

  if(role !== 'user' && role !== 'admin'){
    return res.status(422).json({
      error: "Invalid role."
    })
  }

  try {
    const savedUser = await UserService.create({ email, role });

    if(savedUser){
      return res.status(201).json(savedUser);
    }
  } catch (error) {
    console.log(`Error insert user ${error}`);
    return res.status(500).json({ error: 'Insert user error, try again later' });
  }
}

exports.login = async function (req, res, next){
  const { email, password } = req.body;

  if(!email){
    return res.status(401).json({
      error: "The field email is required."
    })
  }

  if(!password){
    return res.status(401).json({
      error: "The field password is required."
    })
  }

  //check if user exists
  const user = await User.findOne({ email: email });
  if(!user){
    return res.status(401).json({ error: "User not found." });
  }

  //check password
  const checkPassword = await bcrypt.compare(password, user.password);
  
  if(!checkPassword){
    return res.status(401).json({ error: "Invalid password." });
  }

  try {
    const secret = process.env.API_SECRET;
    const _token = jwt.sign({id: user._id }, secret);

    if(_token){
      return res.status(200).json({ success: "Login successfully.", _token });
    }

  } catch (error) {
    console.log(`Error login user ${error}`);
    return res.status(500).json({ error: 'Login user error, try again later' });
  }
}

exports.private = async function (req, res){
  return res.status(200).json({ msg: 'eae men private' });
} 