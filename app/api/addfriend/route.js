
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
  const cookieStore =await cookies();
         const user =  cookieStore.get("username")?.value;
    const SearchResult = await UserModel.findOne({ username: user });
    const SearchResult1 = await UserModel.findOne({ username: frienduser });
    if (!SearchResult) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    const token = SearchResult._id;
    const token1 = SearchResult1._id;
   
    
    const details = await UserModel.findByIdAndUpdate(
        token, 
       { $addToSet: { friends: frienduser } },
    
        { new: true }
    )
     await UserModel.findByIdAndUpdate(
        token1, 
       { $addToSet: { friends:user } },
    
        { new: true }
    )
    return NextResponse.json({
        success: true,
        message: "Friend request added",

    });
}
