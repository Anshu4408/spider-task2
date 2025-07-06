"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import AOS from 'aos';

const page = () => {
    const {slug}=useParams();
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);


    return (
        <>
            <div data-aos="fade-right" className=' bg-[#49E589]  w-[50vw] h-[80vh] flex flex-col justify-center items-center gap-4 mx-auto my-20 rounded-3xl '>
                <div className="user">
                    
                </div>
                <Image className='rounded-full' src="/wired-outline-2744-logo-square-myspace-hover-pinch-2.gif" width={180} height={80} alt="Logo" />
                <p className='text-4xl'>Welcome to Split Wise</p>
                <p className='text-sm font-extrabold text-red-600'>{slug}</p>
                <form action="/api/add" method="POST" className='flex flex-col gap-7 items-center'>
                    <div>

                        <input className='border-2 border-white w-1/1 h-10 rounded-2xl ' placeholder="                username" type='username' name="username" >
                        </input>
                    </div>
                    <div>

                        <input className='border-2 border-white w-1/1 rounded-2xl h-10 ' placeholder="                password" type='password' name="password" ></input>
                    </div>
                    <input className='border-2 border-white w-1/2 flex justify-center items-center cursor-pointer rounded-2xl hover:bg-green-900 ' type='submit' value="Log In"></input>
                </form>
                <div className="btn"><button className='border-2 border-white w-[10vh] flex justify-center items-center cursor-pointer rounded-2xl hover:bg-green-900'><Link href="/signup">Sign Up</Link></button></div>
            </div>
        </>
    )
}

export default page
