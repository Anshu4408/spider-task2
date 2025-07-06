import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(response) {
  const cookieStore = cookies();

const allCookies = cookieStore.getAll();
     allCookies.forEach((cookie) => {
    cookieStore.set(cookie.name, '', {
      expires: new Date(0),
      path: '/',
    });
  });
  return NextResponse.redirect("http://localhost:3000")
    
}