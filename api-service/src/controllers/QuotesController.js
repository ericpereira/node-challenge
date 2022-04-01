const axios = require('axios');
const User = require('../models/User');
const Quote = require('../models/Quote');

const mongoose = require('mongoose');

exports.quote = async function (req, res) {
  const stock_code = req.query.q;

  if(!stock_code) {
    return res.status(400).json({error: "Stock code required."});
  }
  
  const user = await User.findOne({_id: mongoose.Types.ObjectId(req.user && req.user.id)}).lean();

  if(user){
    //call the stock service
    await axios.get(`${process.env.STOCK_SERVICE_URL}/quote?stock_code=${stock_code}`)
      .then(async (response) => {
        const quoteData = response.data;
        if(typeof quoteData.open == 'number' &&
            typeof quoteData.high == 'number' &&
            typeof quoteData.low == 'number' &&
            typeof quoteData.close == 'number'){
              
              //save quote and return
              const quote = new Quote({
                userId: user._id,
                ...response.data,
                date: new Date()
              })
              
              const savedQuote = await quote.save();

              if(savedQuote){
                return res.status(200).json({
                  ...quoteData
                });
              }
          }else{
            return res.status(404).json({error: "Stock code or quotation is invalid."});
          }
      })
      .catch(error => {
        console.log(error);
        return res.status(400).json({error: "Failed to load stock, try again later."});
      });
  }else{
    return res.status(404).json({ error: 'User not found.' });
  }
}