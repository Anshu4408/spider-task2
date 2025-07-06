import mongoose from "mongoose";
import UserModel from "@/app/User/UserDetailsSchema";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request) {
    const cookieStore =await  cookies();
    const token =  cookieStore.get("id")?.value;
    const body = await request.json();
    const { username,password,name, photoUrl, mobile, address, pincode } = body;
   
  const details = await UserModel.findByIdAndUpdate(
    token, {
        username,
        password,
        name,
        photoUrl,
        MobileNo: mobile,
        Address: address,
        Pincode: pincode,
        
    },
{ new: true } 
)
    await details.save();
      if (!mongoose.connections[0].readyState) {
      await mongoose.connect("mongodb://localhost:27017/userDataSpider")
       }
    const response= NextResponse.redirect(new URL("http://localhost:3000/dashboard"));
     response.cookies.set("url", details.
            photoUrl);
            response.cookies.set("name", details.name);
            response.cookies.set("mob", details.MobileNo);
             response.cookies.set("add", details.Address);
              response.cookies.set("pin", details.Pincode);
            return response;
}