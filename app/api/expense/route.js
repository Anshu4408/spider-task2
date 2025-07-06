import mongoose from "mongoose";
import { cookies } from "next/headers";
import UserModel from "@/app/User/UserDetailsSchema";
import { NextResponse } from "next/server";
export async function PUT(req) {
     if (!mongoose.connections[0].readyState) {
     await mongoose.connect("mongodb://localhost:27017/userDataSpider")
      }
     const { searchParams } = new URL(req.url);
      const cookieStore = cookies();
    const token = await cookieStore.get("username")?.value;
    const amount=searchParams.get("Amount");
    const Category=searchParams.get("Category");
    const i=parseInt(searchParams.get("Index"));
    const user=await UserModel.findOne({username:token});
    const friends=user.GroupsJoined[i].FriendsJoined;
    const id=user._id;
    const updated=await UserModel.findByIdAndUpdate(id,{
        $push:{[`GroupsJoined.${i}.Expenses`]:{Amount:amount,Category:Category,User:token}}
    })
const groupName=user.GroupsJoined[i].GroupName;
    for(let i=0;i<friends.length;i++)
    {
        const user1=await UserModel.findOne({username:friends[i]})
        const friendGroupIndex = user1.GroupsJoined.findIndex(g => g.GroupName === groupName);
        const id1=user1._id;
         const updated1=await UserModel.findByIdAndUpdate(id1,{
        $push:{[`GroupsJoined.${friendGroupIndex}.Expenses`]:{Amount:amount,Category:Category,User:token}}
    })
    }
      const Amt=user.GroupsJoined[i].Expenses;
      if(Amt){
let total=parseInt(amount);
      for(let i=0;i<Amt.length;i++)
      {
            total+=parseInt(Amt[i].Amount);
      }
       const updated2=await UserModel.findByIdAndUpdate(id,{
         $push:{[`GroupsJoined.${i}.TotalAmount`]:total}
    })
        for(let i=0;i<friends.length;i++)
    {
        const user1=await UserModel.findOne({username:friends[i]})
         const friendGroupIndex = user1.GroupsJoined.findIndex(g => g.GroupName === groupName);
        const id1=user1._id;
         const updated1=await UserModel.findByIdAndUpdate(id1,{
       $push:{[`GroupsJoined.${friendGroupIndex}.TotalAmount`]:total}
    })
}
      }else{
       
       const updated2=await UserModel.findByIdAndUpdate(id,{
        $push:{[`GroupsJoined.${i}.TotalAmount`]:amount}
    })
    for(let i=0;i<friends.length;i++)
    {
        const user1=await UserModel.findOne({username:friends[i]})
        const friendGroupIndex = user1.GroupsJoined.findIndex(g => g.GroupName === groupName);
        const id1=user1._id;
         const updated1=await UserModel.findByIdAndUpdate(id1,{
       $push:{[`GroupsJoined.${friendGroupIndex}.TotalAmount`]:amount}
    })}
      }
      
    return NextResponse.redirect("http://localhost:3000/dashboard/group");

}