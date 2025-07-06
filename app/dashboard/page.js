"use client"
import { useState,useEffect } from 'react'
import React from 'react'
import Link from 'next/link'

import Footer from '../components/footer'
import HamNavbardash from '../components/Hamdash'

const page = () => {
    const [Name, setName] = useState("")
    const [Data, setData] = useState([])
        useEffect(() => {
            const allcookie = document.cookie
            const cookieArray = allcookie.split(";")
            const nameCookie = cookieArray.find(e => e.trim().startsWith('name='))
            if (nameCookie) {
                const value = nameCookie.split('=')[1];
                console.log(decodeURIComponent(value).toUpperCase())
                setName(decodeURIComponent(value).toUpperCase())
            }
            try{
const fn=async()=>{
         const res= await fetch("/api/friendreq",{
            method:"GET"
          })
const data=await res.json();
    setData(data)
         }
         fn();

            }
            catch(err){
              console.log(err);
            }
         
    
        }, []);
        const handleClick=(i)=>{
localStorage.setItem("GroupIndex",i);
window.location="/dashboard/group"
        }
      
  return (
    <div >
      <HamNavbardash/>
      <div className='w-[100vw] min-h-[250vh] flex flex-col '>
        <p className='mt-10 text-white  text-5xl mx-40 font-light'>Welcome to Splitwise, <span className='font-bold mx-4'>{Name.charAt(0).toUpperCase() + Name.slice(1).toLowerCase()}</span> </p>
       <ol className=''> {Data?.data && Array.isArray(Data.data.GroupsJoined) && (<>
        <p className='text-white text-4xl mx-50 my-10 font-bold'>Your Groups</p>
                   { Data.data.GroupsJoined.map((e, index) => (<>
                   <p className='hidden'>{document.getElementById("bg").style.width=0}
                   {document.getElementById("start").style.bottom="110px"}
                   {document.getElementById("start").style.left="6px"}
                   {document.getElementById("start").style.position="fixed"}</p>
                        <li key={index} className="text-white text-2xl bg-[#181928] mx-auto rounded-2xl min-h-[20vh] max-w-[60vw] mt-10 flex flex-col  p-4 pl-30 pr-30 cursor-pointer justify-around" onClick={()=>{handleClick(index)}}><span className='flex items-center gap-10 '> <img src={e.Image} className='w-[4vw] h-[4vw] rounded-full'/><p className='text-4xl font-bold'>{e.GroupName}</p><p className='text-sm ml-[250]'>Created By:-{e.CreatedBy}</p></span><p className='text-sm ml-30'>{e.Type}</p></li>
                        
                    </>))}
       </>
              )}
                </ol>
               
        <div className='mx-auto my-[-40vh] flex items-center'>
           <img id='bg' src='/bgspider.png' className='w-[80vw] '/>
            <div className='min-w-[23vw] p-2'>
          {!Data?.data || !Array.isArray(Data.data.GroupsJoined) && (<>
          <p className='text-gray-500 text-2xl mx-[40] font-extralight'>No  Groups Yet</p>
</>
          )}
            
           
            <Link href="/dashboard/creategrp"><p id='start' className=' text-lg mx-[40] my-[20] border-1 border-[#49E589] p-4 pl-7 pr-7 text-center rounded-2xl text-[#49E589] cursor-pointer '><span className='items-center flex gap-1 '><img src='/add-user-2.png'/><p >Start a New Group</p></span></p></Link></div>
            </div>
         
      </div>
<Footer/>
    </div>
  )
}

export default page
