require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Token = require('../models/token');
const User = require('../models/user');


const getLogin = (req, res, next) => {
    res.render('./auth/login', {
        pageTitle: 'Login'
    });
};

const getRegister = (req, res, next) => {
    res.render('./auth/register', {
        pageTitle: 'Register'
    })
};



const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const oldUser = await User.findOne({email: email});

        if(oldUser){
            res.status(409).json("User already exists");
        }

        const encryptedPassword = await bcrypt.hash(password, 10); 
        
        const user = await User.create({
            name, 
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        return res.status(200).json({ msg: 'User Registered.' });
    } catch (error) {
        return res.status(500).json({ msg: 'Error while signing up user' });
    }
};


const loginUser = async (req, res) => {

    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).send("Please enter all the details");
        }

        const user = await User.findOne({email: email});

        if(user && await bcrypt.compare(password, user.password)){
            
            const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY, { expiresIn: '2h'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, email: user.email });
        } else {
            res.status(400).json({ msg: "Credentials do not match" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'error while logging the user' })
    }
};

const logoutUser = async (req, res) => {
    const token = req.body.token;
    await Token.deleteOne({ token: token });
    res.status(204).json({ msg: "Logged out" });
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getLogin,
    getRegister
}