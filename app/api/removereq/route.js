import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import UserModel from "@/app/User/UserDetailsSchema";

export async function PUT(request) {
  
   
       if (!mongoose.connections[0].readyState) {
       await mongoose.connect("mongodb://localhost:27017/userDataSpider")
        }
     const { searchParams } = new URL(request.url);
    const frienduser = searchParams.get("friendusername");
  const cookieStore = cookies();
         const user = await cookieStore.get("username")?.value;
    const SearchResult = await UserModel.findOne({ username: user });
    if (!SearchResult) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    const token = SearchResult._id;
   
    
    const details = await UserModel.findByIdAndUpdate(
        token, 
       { $pull: { friendreq: frienduser } },
    
        { new: true }
    )
    return NextResponse.json({
        success: true,
        message: "Friend request added",

    });
}