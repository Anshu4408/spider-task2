import { NextResponse } from "next/server";
import UserModel from "@/app/User/UserDetailsSchema";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export async function POST(request) {
   if (!mongoose.connections[0].readyState) {
   await mongoose.connect("mongodb://localhost:27017/userDataSpider")
    }
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return NextResponse.redirect(new URL('http://localhost:3000/signup/Username-already-registered', request.url));
  }


  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword)
  const user = new UserModel({
    username: username, password: hashedPassword, photoUrl: "https://res.cloudinary.com/dorv3py1v/image/upload/v1750485691/ii4q93q9cljhn23sbl8y.jpg",friends:[],
 
  });
  await user.save();
  const token = jwt.sign({ username }, process.env.SECRET)
  const response = NextResponse.redirect(new URL('http://localhost:3000/dashboard/profile', request.url));
  response.cookies.set("token", token, {
    httpOnly: true,
  });
  response.cookies.set("username", user.username);
  response.cookies.set("name", user.name);
  response.cookies.set("id", user._id);
   response.cookies.set("url", user.photoUrl);
   response.cookies.set("mob", user.MobileNo);
   response.cookies.set("add", user.Address);
   response.cookies.set("pin", user.Pincode);


  return response;


}