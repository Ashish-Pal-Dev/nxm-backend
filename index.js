const express=require('express');
const {userRouter}=require('./routes/user.route');
const {postRouter}=require('./routes/post.route');
const{connection}=require('./config/db');
require('dotenv').config();

const app=express();

app.use(express.json());

app.use('/users',userRouter);

app.use('/posts',postRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log(`Server is running at Port: ${process.env.port}`);
    } catch (error) {
        console.log(error);
    }
})