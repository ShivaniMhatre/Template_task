import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

const app = express();
dotenv.config()

app.listen(5000,()=>{
    console.log('server is running on port 5000');
})

mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to database');
})
.catch(()=>{
    console.log('error connecting to database');
})
