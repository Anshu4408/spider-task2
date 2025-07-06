"use client"
import React from 'react'
import Image from 'next/image'

import AOS from 'aos';

import { useEffect } from 'react';
 const page = () => {
     useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);

    return (
        <>
        <div data-aos="fade-right" className=' bg-[#49E589]  w-[50vw] h-[80vh] flex flex-col justify-center items-center gap-4 mx-auto my-20 rounded-3xl '>
            <Image className='rounded-full'  src="/wired-outline-2744-logo-square-myspace-hover-pinch-2.gif" width={120} height={80} alt="Logo"/>
            <p className='text-4xl'>Register here for Split Wise</p>
            <p className='text-sm'>Create your unique Username And password</p>
            <form action="/api/register" method="POST"  className='flex flex-col gap-7 items-center'>
                <div>
                    
                    <input className='border-2 border-white w-1/1 h-10 rounded-2xl text-center' placeholder=" username" type='text' name="username" >
                    </input>
                    </div>
                <div>
                    
                    <input className='border-2 border-white w-1/1 rounded-2xl h-10 text-center' placeholder=" password" type='password' name="password" ></input>
                    </div>
                <input className='border-2 border-white w-1/2 flex justify-center items-center cursor-pointer rounded-2xl hover:bg-green-400 ' type='submit' value="Register"></input>
            </form>
            
        </div>
        </>
    )
}

export default page
