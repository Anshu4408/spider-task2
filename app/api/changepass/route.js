import { NextResponse } from "next/server";
import UserModel from "@/app/User/UserDetailsSchema";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { cookies } from "next/headers";
export async function PUT(request) {
    
      if (!mongoose.connections[0].readyState) {
       await mongoose.connect("mongodb://localhost:27017/userDataSpider")
        }
        const { searchParams } = new URL(request.url);
        const old=searchParams.get("OLD");
        const New=searchParams.get("NEW");
          const cookieStore =await  cookies();
               const token =  cookieStore.get("username")?.value;
        const existingUser=await UserModel.findOne({username:token})
        const isMatch = await bcrypt.compare(old, existingUser.password);
        const hashedPassword = await bcrypt.hash(New, 10);
           if (existingUser) {
              if (isMatch) {
        
                 const Updated=await UserModel.findByIdAndUpdate(existingUser._id,{
                    password:hashedPassword,
                 })
                 return  NextResponse.redirect(new URL('http://localhost:3000/dashboard', request.url));
                
                }
                else{
                     return NextResponse.redirect(new URL('http://localhost:3000/dashboard/changepass', request.url));
                }
            }
            else{
                 return NextResponse.redirect(new URL('http://localhost:3000/dashboard/changepass', request.url));
            }
}