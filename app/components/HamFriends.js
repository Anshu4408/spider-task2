"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useEffect } from 'react';
import { useState } from 'react'



const HamFriends = () => {
    const [Name, setName] = useState("")
    const [Url, setUrl] = useState("")
    //for extracting name from cookie
    useEffect(() => {
        const allcookie = document.cookie
        const cookieArray = allcookie.split(";")
        const nameCookie = cookieArray.find(e => e.trim().startsWith('name='))
        if (nameCookie) {
            const value = nameCookie.split('=')[1];
            console.log(decodeURIComponent(value).toUpperCase())
            setName(decodeURIComponent(value).toUpperCase())
        }
     


    }, []);
    //for extracting photourl from cookie
    useEffect(() => {
        const allcookie = document.cookie
        const cookieArray = allcookie.split(";")
        const urlCookie = cookieArray.find(e => e.trim().startsWith('url='))
        if (urlCookie) {
            const value = urlCookie.split('=')[1];

            setUrl(decodeURIComponent(value))
        }


    }, []);
    const [bool, setbool] = useState(false)
    return (<>
        <div className='box   justify-around  flex   bg-[#49E589] border-b-1 border-b-gray-500  text-white gap-100 relative top-0' >

            <div className="ham"><Image alt="logo" className=' rounded-2xl  ' src='/wired-outline-2744-logo-square-myspace-hover-pinch-2.gif' height={70} width={70} /></div>
            <div className="text-black text-3xl flex items-center"> Split Wise </div>
            <div className="ham"><Image alt="logo" className='invert-100 cursor-pointer hover:invert-50 ' src='/menu-bar.png' onClick={() => setbool(!bool)} height={80} width={80} /></div>



        </div>


        <div className={`h-[100vh] z-40 bg-black border-1 border-gray-800 text-white flex absolute right-[0]  transition-transform duration-900 ease-in-out transform ${bool ? 'translate-x-0 w-[30vw]' : 'translate-x-full w-[0vw]'} `}>
            {bool && (
                <ul className=' gap-6'>
                    <li className='bg-black border-1 border-gray-800 flex w-[30vw]   px-2 py-4  custom-font text-2xl h-[20vh] justify-center items-center'><img className='rounded-full w-[5vw] h-[5vw] mx-7' src={Url} /> Hello!    {Name}</li>

                    <li className='bg-black border-1 border-gray-800 flex w-[30vw]  cursor-pointer px-2 py-4 hover:bg-gray-500 custom-font'><Link href="/logout"><div className='flex justify-center items-center gap-5'><img src="/wired-outline-1725-exit-sign-hover-pinch.gif" className='w-[3vw]' /><p>Log Out</p></div></Link></li>
                    <li className='bg-black border-1 border-gray-800 flex w-[30vw]  cursor-pointer px-2 py-4 hover:bg-gray-500 custom-font'><Link href="/dashboard/profile"><div className='flex justify-center items-center gap-5'><img src="/wired-outline-21-avatar-hover-jumping.gif" className='w-[3vw]' /><p>Profile</p></div></Link></li>
                    <li className='bg-black border-1 border-gray-800 flex w-[30vw]  cursor-pointer px-2 py-4 hover:bg-gray-500 custom-font'><Link href="/"><div className='flex justify-center items-center gap-5'><img src="/wired-outline-63-home-hover-3d-roll.gif" className='w-[3vw]' /><p>Home</p></div></Link></li>
                    <li className='bg-black border-1 border-gray-800 flex w-[30vw]  cursor-pointer px-2 py-4 hover:bg-gray-500 custom-font'><Link href="/dashboard"><div className='flex justify-center items-center gap-5'><img src="/wired-outline-955-demand-hover-roll.gif" className='w-[3vw]' /><p>My Groups</p></div></Link></li>


                    <li className='bg-black border-1 border-gray-800 flex w-[30vw]  cursor-pointer px-2 py-4 hover:bg-gray-500 custom-font'><Link href="/dashboard/changepass"><div className='flex justify-center items-center gap-5'><img src="/wired-outline-35-edit-hover-circle.gif" className='w-[3vw]' /><p>Change Password</p></div></Link></li>
                    <li className='bg-black border-1 border-gray-800 flex w-[30vw]  cursor-pointer px-2 py-4 hover:bg-gray-500 custom-font'><Link href="/dashboard/search"><div className='flex justify-center items-center gap-5'><img src="/wired-outline-19-magnifier-zoom-search-hover-spin.gif" className='w-[3vw]' /><p>Search Friends</p></div></Link></li>
                    <li className='bg-black border-1 border-gray-800 flex w-[30vw]  cursor-pointer px-2 py-4 hover:bg-gray-500 custom-font'><Link href="/dashboard/friendreq"><div className='flex justify-center items-center gap-5  text-white'><img src="/add-friend.png" className='w-[3vw] invert-100' /><p className='text-white'>Friend Requests</p></div></Link></li>
                    <li className='border-1 border-gray-800 flex w-[30vw]  cursor-pointer px-2 py-4 bg-gray-500 custom-font'><Link href="/dashboard/friends"><div className='flex justify-center items-center gap-5  text-white'><img src="/add-friend.png" className='w-[3vw] invert-100' /><p className='text-white'>Friends</p></div></Link></li>
              



                </ul>
            )}

        </div>


    </>

    )
}

export default HamFriends
