const mongoose = require('mongoose');

const Quote = mongoose.model('Quote', {
    userId: mongoose.Types.ObjectId,
    name: String,
    symbol: String,
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    date: Date
});

module.exports = Quote;