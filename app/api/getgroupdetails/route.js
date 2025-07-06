import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import UserModel from "@/app/User/UserDetailsSchema";

export async function GET(request) {
     const { searchParams } = new URL(request.url);
     const i=searchParams.get("Index");
       if (!mongoose.connections[0].readyState) {
       await mongoose.connect("mongodb://localhost:27017/userDataSpider")
        }
         const cookieStore = await cookies();
        const token =  cookieStore.get("username")?.value;
         const user=await UserModel.findOne({username:token});
        const data=user.GroupsJoined[i];
        return NextResponse.json(data);
    
}