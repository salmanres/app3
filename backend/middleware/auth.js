// middleware/auth.js
const jwt = require('jsonwebtoken');
const seckey = 'your_secret_key'; // Ensure this matches the key used for signing the token

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. Token missing.' });
    }

    try {
        const decoded = jwt.verify(token, seckey);
        req.user = decoded; // Attach user data to the request (optional)
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }
};

module.exports = verifyToken;
