var express = require('express');
var router = express.Router();
var QuotesController = require('../src/controllers/QuotesController')

/* GET home page. */
router.get('/', (req, res) => {
  res.send("Welcome to stock service...");
});
router.get('/quote', QuotesController.stock);

module.exports = router;
