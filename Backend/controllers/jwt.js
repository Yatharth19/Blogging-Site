const jwt = require('jsonwebtoken');
require('dotenv').config();
const Token = require('../models/token')

const authenticateToken = (req, res, next) => {
    // console.log(req.headers);
    const authHeader = req.headers['authorization'];
    const tokenPresent = authHeader && authHeader.split(' ')[1];
    // console.log(authHeader);
    if(tokenPresent == null){
        return res.status(401).json({ message: "Missing Token"});
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        // console.log(token);
        if (err) {
            return res.status(403).json({ msg: 'invalid token' })
        }

        // req.user = user;
        next();
    })
}

const createNewToken = async (req, res) => {
    const refreshToken = req.body.token.split(' ')[1];  //so as to reauthenticate user when access token expires.

    if (!refreshToken) {
        return res.status(401).json({ msg: 'Refresh token is missing' })
    }

    const token = await Token.findOne({ token: refreshToken });

    if (!token) {
        return res.status(404).json({ msg: 'Refresh token is not valid'});
    }

    jwt.verify(token.token, process.env.REFRESH_SECRET_KEY, (err, user) => {
        if (err) {
            res.status(500).json({ msg: 'invalid refresh token'});
        }
        const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '2h'});
        res.set('authorization', `Bearer ${accessToken}`);
        return res.status(200).json({ accessToken: accessToken })
    })


}

module.exports = {
    authenticateToken,
    createNewToken
};