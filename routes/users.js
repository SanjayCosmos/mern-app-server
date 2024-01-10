import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req,res) => {
    const {username,password} = req.body
    const user = await UserModel.findOne({username:username})

    if(user){
        return res.json({message:"user exsists"})
    }

    const hashPassword = await bcrypt.hash(password,10)

    const newUser = new UserModel({username:username, password:hashPassword})

    await newUser.save()

    res.json({respose:"user created in DB"})


})


export {router as userRouter};