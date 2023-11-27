const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');
const cookieParser = require('cookie-parser');
// require('dotenv').config();
app.use(cookieParser());

async function authorize(req, res, next){
    try{
        if(req.user){
            next();
        }else{
            const tokenCookie = req.headers.authorization;
            if (tokenCookie) {
                console.log("here");
                    const user = await jwt.verify(tokenCookie, "your-secret-key");
                    if(user._id){
                        console.log('good');
                        req.user = user;
                        next();
                    }else{
                        res.status(401).json("unauthorized");
                    }
                }else{
                    res.status(401).json("you need to login first");
            }
        }
    }catch(error){
        res.status(400).json(error);
    }
};

module.exports = {
    authorize
};