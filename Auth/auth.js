const Gym = require('../Modals/gym');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
  const token = req.cookies.cookie_token; // ✅ CORRECT NAME


    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY); // ✅ CORRECT
    req.gym = await Gym.findById(decoded.gym_id).select('-password');
    next(); // ✅ let the request go to next handler
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(401).json({ error: 'Invalid token or session expired' });
  }
};

module.exports = auth;
