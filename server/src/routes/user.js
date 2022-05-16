import mongoose from "mongoose";
import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  //   res.json(req.body);
  console.log(req.body);
  const user = await User.create(req.body);
  res.status(201).json(user);
});

userRouter.post("/signin", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user.password === req.body.password) {
    const token = jwt.sign(JSON.stringify(user), process.env.SECRATEKEY);
    res.status(200).json({ user, token });
    
  } else {
    res.status(401).json({
      error: "please enter valid username & password",
    });
  }
});

export default userRouter;
