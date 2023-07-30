const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

// Cache the SECRET_KEY at the module level
const SECRET_KEY = process.env.SECRET_KEY;

const AuthenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        let verifyToken;
        try {
            verifyToken = jwt.verify(token, SECRET_KEY);
        } catch (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Attach useful properties to the request object
        req.token = token;
        req.rootUser = rootUser;
        req.UserId = rootUser._id;

        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = AuthenticateUser;
