"use client"
import { useState,useEffect } from 'react'
import React from 'react'
import HamFriends from '../../components/HamFriends'
import Footer from '../../components/footer'

const page = () => {
    const [Data, setData] = useState({})
     useEffect(() => {
    const fn=async()=>{
        try{
const res=await fetch("/api/friendreq",{
    method:"GET",
 })
 const data=await res.json();
 setData(data);
        }
        catch(err){
            console.log(err);
        }

    }
   
      fn();
    
     
    }, [])
    
     
  return (
    <div>
      <HamFriends/>
      <div className='min-w-[100vw] min-h-[100vh]'>
        <p className='text-white text-4xl'>My Friends:</p>
<ul>
   <ol className=''>

                {Data?.data && Array.isArray(Data.data.friends) && (
                    Data.data.friends.map((e, index) => (
                        <li key={index} className="text-white text-2xl border-1 min-w-[100vw] mt-10 flex items-center gap-50 p-4">{e}</li>
                    ))
                )}
                </ol>
</ul>
      </div>
      <Footer/>
    </div>
  )
}

export default page
