import UserModel from "@/app/User/UserDetailsSchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { cookies } from "next/headers";
export async function PUT(request) {
    const { searchParams } = new URL(request.url);
   
       if (!mongoose.connections[0].readyState) {
       await mongoose.connect("mongodb://localhost:27017/userDataSpider")
        }
 const user = searchParams.get("friendusername");
        console.log(user)
    const SearchResult = await UserModel.findOne({ username: user });
    if (!SearchResult) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    const token = SearchResult._id;
   
     const cookieStore = cookies();
         const myusername = await cookieStore.get("username")?.value;
    const details = await UserModel.findByIdAndUpdate(
        token, 
       { $addToSet: { friendreq: myusername } }, 
    
        { new: true }
    )
    return NextResponse.json({
        success: true,
        message: "Friend request added",

    });
}