require('dotenv').config();
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
var mongoose = require('mongoose');

exports.connect = async function () {
    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASS;
    //console.log('Connect to ', `mongodb+srv://${dbUser}:${dbPass}@cluster0.a67js.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
    await mongoose
      .connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.a67js.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
      .then(() => {
        /**
         * Listen on provided port, on all network interfaces.
         */
        //console.log('Connected to MongoDB...');
      })
      .catch((err) => {
        //console.log(err);
      })
  }

exports.create = async function (data){
    const { email, role } = data;
    //check if user exists
    const userExists = await User.findOne({ email: email });
    
    if(userExists){
        throw new Error("Email already used.")
    }

    //create password
    const password = crypto.randomBytes(16).toString("hex");
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create user
    const user = new User({
        email,
        password: passwordHash,
        role,
        createdAt: new Date()
    });

    const saveUser = await user.save();

    if(saveUser){
        return {
            email,
            password  
        };
    }else{
        throw new Error("Failed to create user.");
    }
}