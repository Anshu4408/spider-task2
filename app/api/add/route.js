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
   if (!existingUser) {

      return NextResponse.redirect(new URL('http://localhost:3000/login/Invalid-Username-or-Password', request.url));
   }
   const isMatch = await bcrypt.compare(password, existingUser.password);
   if (existingUser) {
      if (isMatch) {

         const token = jwt.sign({ username }, process.env.SECRET)
         const response = NextResponse.redirect(new URL('http://localhost:3000/dashboard', request.url));
         response.cookies.set("token", token, {
            httpOnly: true,
         });
         response.cookies.set("name", username, {});
         response.cookies.set("id", existingUser._id);
         response.cookies.set("url", existingUser.
            photoUrl);
         response.cookies.set("username", existingUser.username);
         response.cookies.set("name", existingUser.name);
         response.cookies.set("mob", existingUser.MobileNo);
         response.cookies.set("add", existingUser.Address);
         response.cookies.set("pin", existingUser.Pincode);
         return response;


      }

   }


   return NextResponse.redirect(new URL('http://localhost:3000/login/Invalid-Username-or-Password', request.url));




}