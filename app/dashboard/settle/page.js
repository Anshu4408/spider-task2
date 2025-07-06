"use client"
import React from 'react'
import { useEffect,useState } from 'react';
const page = () => {
    const [expenseData, setexpenseData] = useState("")
         useEffect(() => {
            const i=localStorage.getItem("GroupIndex")
            if (!i) {
  console.log("GroupIndex is missing");
  return;
}
          try{
          console.log("useEffect ran");
            
             console.log("Fetched GroupIndex:", i); 
            
          const fna=async()=>{
                const res=await fetch(`/api/settleexpense?Index=${i}`,{
                    method:"GET"
                })
                const data=await res.json();
                console.log("datafetched");
                console.log(data)
                setexpenseData(data)
          }
          fna();
            }
    catch(err){
        console.log(err);
    }
        
       
        }, [])
  return (
    <div>
        <ul className='text-2xl my-40'>
           {expenseData && Array.isArray(expenseData) && (
                    expenseData.map((e, index) => (
                        <li key={index} className="text-center text-black font-semibold   bg-[#49E589] mt-10  items-center rounded-2xl p-3 w-[40vw] mx-auto">{e.toUpperCase()}</li>
                    ))
                )}
                </ul>
    
    </div>
  )
}

export default page
