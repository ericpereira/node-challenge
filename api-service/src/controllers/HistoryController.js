const User = require('../models/User');
const Quote = require('../models/Quote');
const mongoose = require('mongoose');

exports.index = async function (req, res) {
    const user = await User.findOne({_id: mongoose.Types.ObjectId(req.user && req.user.id)}).lean();

    if(user){
        //select all quotes from this user and return
        const quotes = await Quote.find(
            { userId: user._id },
            ['-_id', '-userId', '-__v'],
            { sort: {
                _id: -1
            }}).lean();
        
        if(quotes && quotes.length > 0){
            return res.status(200).json(quotes);
        }else{
            return res.status(404).json({ error: 'The user has no quotations to exibe.' });
        }
    }else{
        return res.status(404).json({ error: 'User not found.' });
    }
    
}