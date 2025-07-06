import { NextResponse } from "next/server";

import { jwtVerify } from "jose";//here jwt fails so i have used jose
   const secret = new TextEncoder().encode(process.env.SECRET);//req for jose it gives unit 8 array

export   async function  middleware(request)  {
    const token = request.cookies.get("token")?.value;
 
  if(!token)
  {
      return NextResponse.redirect(new URL('http://localhost:3000/login', request.url));
  }

  try {
   await jwtVerify(token,secret); 

    
    return NextResponse.next(); 
  } catch (error) {
      console.log(token)
   
    console.log("error found")
    return NextResponse.redirect(new URL("/login", request.url));
  }
 
}
 export const config = {
  matcher: ["/dashboard/:path*"]
};


