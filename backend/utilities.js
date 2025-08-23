const jwt = require('jsonwebtoken');

// Check JWT token in request
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];      // get token from header
  const token = authHeader && authHeader.split(' ')[1];  // split "Bearer <token>" and take token
  if (!token) return res.sendStatus(401);               // no token → reject

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);               // invalid token → reject

    req.user = decoded;  // save user info from token
    next();              // token valid → continue
  });
}

module.exports = { authenticateToken };
