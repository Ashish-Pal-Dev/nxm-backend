const jwt=require('jsonwebtoken');
// const {PostModel}=require('../models/post.model');
require('dotenv').config();

async function authenticator(req,res,next){
    req.body.userID="ashish1234";
    try {
        const token=req.headers.authorization;
        if(token){
            const decoded=jwt.verify(token,process.env.key);
            if(decoded){
                const userid=decoded.userid;
                req.body.userID=userid;
                next();
            }
            else{
                res.send('Access Denied!');
            }
        }
        else{
            res.send('Access Denied');
        }
    } catch (error) {
        res.send('Please login first!');
    }
}

module.exports={authenticator}