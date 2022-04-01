var mongoose = require('mongoose');
var User = require('../models/User');
var Quotes = require('../models/Quote');

exports.index = async function (req, res) {
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(req.user && req.user.id) }).lean();

    if(user){    
        const quotes = await Quotes.aggregate([
            { "$group": { _id: "$symbol", times_requested: {$sum: 1}} },
            { $sort: { times_requested: -1 }},
            { '$project': { "stock": "$_id" , "times_requested": "$times_requested", _id: 0} }
        ])
        .limit(5);

        if(quotes && quotes.length > 0){
            return res.status(200).json(quotes);
        }else{
            return res.status(404).json({ error: "No stats found." });
        }
    }else{
        return res.status(404).json({ error: 'User not found.' });
    }
}