const User = require('../models/User');
const mongoose = require('mongoose');

async function authAdmin(req, res, next){
    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.user && req.user.id)}).lean();

    if(user && user.role === 'admin'){
        next();
    }else{
        return res.status(401).json({ error: "Permission denied." });
    }
}

module.exports = authAdmin;