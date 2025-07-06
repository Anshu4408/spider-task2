"use client"
import React from 'react'
import { useState,useEffect } from 'react'
const page = () => {
    const [Category, setCategory] = useState("")
    const [amount, setamount] = useState("")
    const [Data, setData] = useState({})
       useEffect(() => {
           const i=localStorage.getItem("GroupIndex")
           try{
         const fn=async()=>{
               const res=await fetch(`/api/getgroupdetails?Index=${i}`,{
                   method:"GET"
               })
               const data=await res.json();
               console.log(data)
               setData(data)
         }
         fn();
           }
   catch(err){
       console.log(err);
   }
       },[])
       const handleSubmit=async()=>{
         const res=await fetch(`/api/expense?Amount=${amount}&Category=${Category}&Index=${localStorage.getItem("GroupIndex")}}`,{
            method:"PUT"
         })
         if(res.redirected) window.location.href=res.url;
       }
  return (
    <div>
    <span className='flex justify-evenly gap-110'><img src='/shape.png' className='w-[4vw] cursor-pointer' onClick={()=>{
        window.location="/dashboard"
       }}/>
       <p className='text-white text-6xl '>Add Expense</p><img className='w-[4vw] cursor-pointer' src='/check.png' onClick={handleSubmit}/></span>
       <p className='text-white text-5xl mx-30 mt-10'>With You and: All of <span className='text-[#49E589]'>{Data.GroupName}</span></p>
       <div className='w-[50vw] h-[50vh] bg-[#181928] rounded-2xl mx-auto mt-10'>
        <form className='flex flex-col items-center justify-center pt-20'>
            <span className='flex gap-10'>
<label className='border-4 w-[7vw] h-[7vw] border-[#49E589] rounded-2xl'><img className='p-5' src='/google-docs.png'/></label>
            <input type='text' className='border-b-1 border-[#49E589] text-gray-600 w-[30vw] h-[10vh] text-3xl' placeholder='Enter a Category' value={Category} onChange={(e)=>{setCategory(e.target.value)
              e.target.style.color="white"
            }
          }></input>
            </span>
            <span className='flex gap-10'>
                <label className='border-4 w-[7vw] h-[7vw] border-[#49E589] rounded-2xl mt-10'><img className='p-5' src='/dollar-symbol.png'/></label>

        <input type='number' className='border-b-1 border-[#49E589] text-gray-600 mt-10 w-[30vw] h-[10vh] text-3xl ' placeholder='Enter Amount' value={amount} onChange={(e)=>{setamount(e.target.value)
          e.target.style.color="white"
        }}></input>
            </span>
        </form>
       </div>
              <p className='text-white text-5xl mx-70 mt-10'>Paid By <span className='text-[#49E589]'> You </span>and Split <span className='text-[#49E589]'>Equally</span></p>
       </div>
    
  )
}

export default page
