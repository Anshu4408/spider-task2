import UserModel from "@/app/User/UserDetailsSchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("username");
   
       if (!mongoose.connections[0].readyState) {
       await mongoose.connect("mongodb://localhost:27017/userDataSpider")
        }

    const SearchResult = await UserModel.findOne({ username: user });
    
    if (SearchResult) {
        return NextResponse.json({found:"true",data: SearchResult });
    }

    return NextResponse.json({found:"false", message: "No Result Found" });


}