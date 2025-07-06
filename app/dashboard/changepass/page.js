"use client"
import React from 'react'
import { useState } from 'react'
const page = () => {
  const [oldPass, setoldPass] = useState("")
  const [newPass1, setnewPass1] = useState("")
  const [newPass2, setnewPass2] = useState("")
  const handleSubmit=async(e)=>{
         e.preventDefault();
    const res=  await fetch(`/api/changepass?OLD=${oldPass}&NEW=${newPass1}`,{
      method:"PUT",
      
      
    })
    if(res.redirected){
      if(res.url==="http://localhost:3000/dashboard")
      {
        alert("Password Changed Sucessfully")
      }
      if(res.url==="http://localhost:3000/dashboard/changepass")
      {
        alert("Password is Incorrect")
      }
    window.location.href = res.url; 

    }
    else{console.log("notredirected")}
  }
  return (
    <div>
      <form  onSubmit={(e)=>{handleSubmit(e)}} className='bg-[#181928] flex flex-col text-gray-600 p-10 gap-20 items-center my-30 text-2xl w-[90vw] mx-auto rounded-2xl '>
        <input type='password' className='border-b-1 border-[#49E589] w-1/4' placeholder='Enter Your Old Password ' value={oldPass}
        onChange={(e)=>{e.target.style.color="white"
        setoldPass(e.target.value)

        }
      }/>
        <input type='password' className='border-b-1 border-[#49E589] w-1/4'  placeholder='Enter Your New Password' value={newPass1}  onChange={(e)=>{e.target.style.color="white"
setnewPass1(e.target.value)
        }
      }/>
        <input type='password' className='border-b-1 border-[#49E589] w-1/4'  placeholder='Rewrite Your New Password' value={newPass2} onChange={(e)=>{e.target.style.color="white"
setnewPass2(e.target.value)
        }
      }/>{newPass1!==newPass2&&(
        <p className='text-red-600 text-sm mt-[-10]'>New Password Should Match</p>
      )}
      <input type='submit' className='bg-[#49E589] text-black p-2 rounded-sm cursor-pointer' disabled={newPass1!==newPass2}  value="Change"  />
      </form>
      
    </div>
  )
}

export default page
