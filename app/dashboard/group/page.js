"use client"
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [Data, setData] = useState({})
    const [TotalAmountLength, setTotalAmountLength] = useState(0)
    const [expenseData, setexpenseData] = useState({})
    const [Members, setMembers] = useState(1)
    useEffect(() => {
      if(Array.isArray(Data.FriendsJoined))
      setMembers(parseInt(Data.FriendsJoined.length)+1)
    
     
    }, [Data])
    
   

    useEffect(() => {
        const i=localStorage.getItem("GroupIndex")
         console.log("Fetched GroupIndex:", i); 
        try{
      const fn=async()=>{
            const res=await fetch(`/api/getgroupdetails?Index=${i}`,{
                method:"GET"
            })
            const data=await res.json();
            console.log(data)
            setData(data)
            setTotalAmountLength(Data.TotalAmount.length-1)
      }
      fn();
        }
catch(err){
    console.log(err);
}
    
   
    }, [])
    const handleExpense=()=>{
        window.location.href="/dashboard/expense"
    }
    const settle=()=>{
       window.location.href="/dashboard/settle"
    }
    
  return (
    <div className='h-[100vh]'>
        <div className='text-white bg-[#181928] p-10 text-4xl  w-[90vw] flex items-center gap-10 mx-auto rounded-2xl mt-4'>
            <img className='w-[7vw] h-[7vw] rounded-full' src={Data.Image}/>
            <span>  <p className='w-full font-bold'>{Data.GroupName}</p>
      <p className=' text-sm text-gray-600'>Created At:{Data.CreatedAt}</p>
      <p>Members:<ul className='flex gap-4'>
        <li  className="text-black font-semibold text-sm  bg-[#49E589] mt-10  items-center rounded-2xl p-3">You</li>
                {Data && Array.isArray(Data.FriendsJoined) && (
                    Data.FriendsJoined.map((e, index) => (
                        <li key={index} className="text-black font-semibold text-sm  bg-[#49E589] mt-10 \ items-center rounded-2xl p-3">{e}</li>
                    ))
                )}</ul></p>
      </span>
  
    <button className='absolute bg-[#49E589] w-[4vw] h-[4vw] rounded-full bottom-20 right-20 cursor-pointer' onClick={handleExpense}>$</button>
     
      </div>
      <ul className='flex gap-10 items-center'>
       {Data.TotalAmount&&(   <li  className="text-black text-center font-semibold text-sm  bg-[#49E589] mt-10 \ items-center rounded-2xl p-3 w-[10vw] mx-auto">You: {parseFloat(parseInt(Data.TotalAmount[TotalAmountLength])/Members)}</li>
       )}
    {Data && Array.isArray(Data.FriendsJoined) && (
                    Data.FriendsJoined.map((e, index) => {
                     
                        <li key={index} className="text-center text-black font-semibold text-sm  bg-[#49E589] mt-10  items-center rounded-2xl p-3 w-[10vw] mx-auto">{e}: {parseFloat(parseInt(Data.TotalAmount[TotalAmountLength])/Members)}</li>
})
                )}
                
                </ul>
                <p className= ' text-center text-black font-semibold text-sm  bg-[#49E589] mt-10  items-center rounded-2xl p-3 w-[10vw] mx-auto' onClick={settle}>Settle Up</p>
                
    </div>
  )
}

export default Page
