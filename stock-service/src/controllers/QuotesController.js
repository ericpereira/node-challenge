const axios = require('axios');

exports.stock = async function (req, res) {
  const stock_code = req.query.stock_code;

  if(!stock_code) {
    return res.status(400).json({error: "Stock code required."});
  }

  //call the external api
  await axios.get(`https://stooq.com/q/l/?s=${stock_code}&f=sd2t2ohlcvn&h&e=csv`)
    .then(response => {
      const dataCsv = response.data.split("\r\n")[1].split(",");
      const dataObj = 
          {
              name: dataCsv[8],
              symbol: dataCsv[0],
              open: parseFloat(dataCsv[3]),
              high: parseFloat(dataCsv[4]),
              low: parseFloat(dataCsv[5]),
              close: parseFloat(dataCsv[6])
          };
        
      return res.status(200).json(dataObj);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
}