import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import UserModel from "@/app/User/UserDetailsSchema";

export async function PUT(req) {
       if (!mongoose.connections[0].readyState) {
       await mongoose.connect("mongodb://localhost:27017/userDataSpider")
        }
      const { searchParams } = new URL(req.url);
  const friends = searchParams.getAll("friends"); 
  const Group= searchParams.get("Group")
  const Type=searchParams.get("type");
  let Url=searchParams.get("Url");
  if(!Url)
  {
      Url="/browser_8246896.png";
  }
   const cookieStore = cookies();
       const token = await cookieStore.get("username")?.value;
       const user1=await UserModel.findOne({username:token});
       const today = new Date();
       await UserModel.findByIdAndUpdate(user1._id,{
       $addToSet:{ GroupsJoined:{GroupName:Group,FriendsJoined:friends,Type:Type,CreatedBy:token,Image:Url,CreatedAt:today.toISOString().split("T")[0]}}
        
       })
       for(let i=0;i<friends.length;i++)
       {
        let F=friends;
        let a=F[i];
      const user=await UserModel.findOne({username:friends[i]});
          F[i]=token;
       await UserModel.findByIdAndUpdate(user._id,{
       $addToSet:{ GroupsJoined:{GroupName:Group,FriendsJoined:F,Type:Type,CreatedBy:token,Image:Url,CreatedAt:today.toISOString().split("T")[0]}}
        
       })
       F[i]=a;
       }
      

       return NextResponse.redirect("http://localhost:3000/dashboard")

}