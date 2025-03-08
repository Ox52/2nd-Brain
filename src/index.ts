import express from "express";

import mongoose from "mongoose";

import jwt from "jsonwebtoken"

import { UserModel } from "./db";
 const JWT_SECERT="23455"

const port =3000;

const app = express();

app.use(express.json())

app.post("/api/v1/signup",async(req,res)=>{
//thigs to do  1.zod validation 2.hash the password
    const username = req.body.username;
    const password =req.body.password;
try{
     await UserModel.create({
        username:username,
        password:password
    })

    res.json({
        message:"user have singup"
    })
}catch(e){
    res.status(411).json({
        message:"User already exits"
    })
}

});


app.post("/api/v1/signin",async(req,res)=>{

    const username=req.body.username;
    const password=req.body.password;

    const ExistingUser = await  UserModel.findOne({
        username,
        password

    })

    if(ExistingUser){
        const token =jwt.sign({
            id:ExistingUser._id

        },JWT_SECERT)

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message:"incorerct"
        })
    }

});

app.post("/api/v1/content",(req,res)=>{


})

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content",(req,res)=>{

})

app.post("api/v1/brain/share",(req,res)=>{})


app.get("api/v1/brain/:shareLink",(req,res)=>{})  

app.listen(port,()=>{
    console.log("connected to port ")
})