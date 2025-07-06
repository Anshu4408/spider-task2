import { NextResponse } from "next/server";
import mongoose from "mongoose"
import { cookies } from "next/headers";
import UserModel from "@/app/User/UserDetailsSchema"
export async function GET() {
   if (!mongoose.connections[0].readyState) {
   await mongoose.connect("mongodb://localhost:27017/userDataSpider")
    }
      const cookieStore = cookies(); 
  const cookie = cookieStore.get('username'); 
  const token = cookie?.value;
     console.log(token);
  const SearchResult = await UserModel.findOne({ username: token });
  console.log(SearchResult)
 
 if (SearchResult) {
        return NextResponse.json({found:"true",data: SearchResult });
    }
    
}