const jwt = require('jsonwebtoken');

function authUser (req, res, next) {
  const authHeader = req.headers['authorization'];
  const _token = authHeader && authHeader.split(" ")[1];

  if(!_token){
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  try {
    const secret = process.env.API_SECRET;

    jwt.verify(_token, secret, (err, user) => {
      req.user = user;

      return next();
    });
    
  } catch (error) {
      return res.status(401).json({ error: "Invalid token." });
  }
}

module.exports = authUser;