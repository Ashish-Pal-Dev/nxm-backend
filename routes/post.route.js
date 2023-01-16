const express=require('express');
const {PostModel}=require('../models/post.model');
require('dotenv').config();
const {authenticator}=require('../middlewares/authenticator.middleware');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const postRouter=express.Router();

postRouter.use(authenticator);

postRouter.post('/create',async(req,res)=>{
    let postData=req.body;
    try {
        const post= new PostModel(postData);
        await post.save();
        res.send('Post added successfully.')
    } catch (error) {
        res.send('Something went wrong in creating !');
    }
})
postRouter.get('/',async(req,res)=>{
    const query=req.query;
    try {
        const posts=await PostModel.find({userID:req.body.userID});
        res.send(posts);
    } catch (error) {
        res.send('Something went wrong in fetch !');
    }
})

postRouter.patch('/update/:id',async(req,res)=>{
    const data=req.body;
    const id=req.params.id;
    const note=await PostModel.findOne({"_id":id});
    const userid_in_note=note.userID;
    const userid_in_req=req.body.userID;
    try {
        if(userid_in_note===userid_in_req){
            await PostModel.findByIdAndUpdate({_id:id},data);
            res.send('Post updated successfully.');
        }
        else{
            res.send('Note Authorized!');
        }
    } catch (error) {
        res.send({"err":"Something went wrong"});
    }
})

postRouter.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id;
    const note=await PostModel.findOne({"_id":id});
    const userid_in_note=note.userID;
    const userid_in_req=req.body.userID;
    try {
        if(userid_in_note===userid_in_req){
            await PostModel.findByIdAndDelete(id);
            res.send('Post deleted successfully.');
        }
        else{
            res.send('Note Authorized!');
        }
    } catch (error) {
        res.send({"err":"Something went wrong"});
    }
})


module.exports={postRouter}