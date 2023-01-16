const express=require('express');
const {UserModel}=require('../models/user.model');
require('dotenv').config();
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const userRouter=express.Router();

userRouter.post('/register',async(req,res)=>{
    const{name,email,gender,password}=req.body;
    try {
        const user=await UserModel.find({email});
        if(user.length){
            res.send('User already exists! Please login.');
        }
        else{
            bcrypt.hash(password,2,async(err,hash)=>{
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                    const user= new UserModel({name,email,gender,password:hash});
                    await user.save();
                    res.send('User registered successfully.');
                }
            })
        }
    } catch (error) {
        res.send({"err":error});
    }
})

userRouter.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await UserModel.find({email});
        const hpass=user[0].password;
        if(user.length){
            bcrypt.compare(password,hpass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userid:user[0]._id},process.env.key);
                    res.send({"msg":"Login successfull","Access Token":token});
                }
                else{
                    res.send('Wrong credentials!');
                }
            })
        }
        else{
            res.send('User not registered!')
        }
    } catch (error) {
        res.send({"err":error});
    }
})

module.exports={userRouter}