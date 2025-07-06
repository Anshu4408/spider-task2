import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import UserModel from "@/app/User/UserDetailsSchema";

export async function GET(request) {
    let m = new Map();
    let m1 = new Map(); let arr1 = [];
    let m2 = new Map(); let arr2 = [];
    let ans = [];
    const { searchParams } = new URL(request.url);

    const i = searchParams.get("Index");
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect("mongodb://localhost:27017/userDataSpider")
    }

    const cookieStore = await cookies();
    const cookie = cookieStore.get('username');

    const token = cookie?.value;
    const user = await UserModel.findOne({ username: token });
    const data = user.GroupsJoined[i];

    if (data) {

        const total = parseInt(data.TotalAmount[data.TotalAmount.length - 1]);
        for (let i = 0; i < data.FriendsJoined.length; i++) {
            let amt = 0;
            for (let j = 0; j < data.Expenses.length; j++) {
                if (data.FriendsJoined[i] === data.Expenses[j].User) {
                    amt += parseInt(data.Expenses[j].Amount);
                }
            }
            m.set(`${data.FriendsJoined[i]}`, amt);
        }
        for (let i = 0; i < 1; i++) {
            let amt = 0;
            for (let j = 0; j < data.Expenses.length; j++) {
                if (user.username === data.Expenses[j].User) {
                    amt += parseInt(data.Expenses[j].Amount);
                }
            }
            m.set(user.username, amt);
        }
        for (let i = 0; i < data.FriendsJoined.length; i++) {
            m.set(`${data.FriendsJoined[i]}`, (m.get(data.FriendsJoined[i]) - parseFloat(total / (data.FriendsJoined.length + 1))));
        }
        for (let i = 0; i < data.FriendsJoined.length; i++) {
            if (m.get(`${data.FriendsJoined[i]}`) > 0) {
                m1.set(`${data.FriendsJoined[i]}`, m.get(`${data.FriendsJoined[i]}`));
                arr1.push(`${data.FriendsJoined[i]}`)
            }
            else {
                m2.set(`${data.FriendsJoined[i]}`, m.get(`${data.FriendsJoined[i]}`));
                arr2.push(`${data.FriendsJoined[i]}`)
            }
        }
        m.set(user.username, (m.get(user.username) - parseFloat(total / (data.FriendsJoined.length + 1))));
        if (m.get(user.username) > 0) {
            m1.set(user.username, m.get(user.username));
            arr1.push(user.username)
        }
        else {
            m2.set(user.username, m.get(user.username));
            arr2.push(user.username)
        }

        for (let i = 0; i < arr2.length; i++) {
            let a = m2.get(arr2[i]);
            while (a < 0) {
                for (let j = 0; j < arr1.length; j++) {
                    let b = m1.get(`${arr1[j]}`);
                    if (b > (-1 * a)) {
                        ans.push(`${arr2[i]} will pay ${-1 * a} to ${arr1[j]}`)
                        m1.set(`${arr1[j]}`, b + a);
                        a = 0;
                        break;
                    }
                    else {
                        ans.push(`${arr2[i]} will pay ${b} to ${arr1[j]}`)
                        m1.set(`${arr1[j]}`, 0);
                        a = a + b;
                    }
                }

            }

        }
    }
   
    return NextResponse.json(ans);

}