"use client"
import { useState,useEffect } from 'react'
import React from 'react'
import HamNavbarsearch from '../../components/Hamsearch'
import Footer from '@/app/components/footer'
const page = () => {
  
  const [username, setusername] = useState("")
  const [data, setdata] = useState("")

  const handleClick = async (e) => {
      e.preventDefault();
      try{
          const res = await fetch(`/api/search?username=${username}`, {
      method: "GET",
    })
   const Data=await res.json();
    setdata(Data);
      }
      catch(err){
        console.log(err);

      }
    
  
   
  }
  const sendreq=async()=>{
    const res= await fetch(`/api/sendreq?friendusername=${username}`,{
      method:"PUT",
    })
  }

  
    

  
 
  

  return (
    <div>
      <HamNavbarsearch />
      <div className='min-w-[100vw] min-h-[100vh] flex justify-center'>
        <div className='mx-auto my-10'>
          <form className='mx-auto'>
            <span className='flex'><img src='/wired-outline-19-magnifier-zoom-search-hover-spin.gif' className='w-[4vw] bg-gray-600 border-t-1 border-white border-b-1 border-l-1 rounded-l-2xl' /><input className='text-white border-1 w-[20vw] pl-4 pr-4 p-3  mx-auto bg-gray-600' type='text' placeholder='Search a Friend using Username' name='username' value={username} onChange={(e) => { setusername(e.target.value) }}  ></input>
              <input className='bg-gray-600 text-white border-t-1 border-r-1 border-b-1 border-white rounded-r-2xl pr-1 pl-1 cursor-pointer' type='submit' onClick={(e)=>{handleClick(e)}}></input>
            </span>

          </form>
        </div>
        {data && (<div className='  w-[40vw] h-[60vh] text-white absolute my-[20vh] flex flex-col justify-center items-center'>
          <p className='mx-[10vw]  text-4xl mb-4'>Search Results :</p>
          {(data.found==="true")&&( <span className='text-3xl bg-gray-600 border-1 border-white p-20 min-w-[70vw] flex gap-[1vw] rounded-2xl items-center'><img className="w-[5vw] h-[5vw] rounded-full"src={data.data.photoUrl}/><p className='text-lg'>Username:{data.data.username}</p><p className='text-lg'>Name: {data.data.name}</p> 
          <button className='cursor-pointer  text-sm bg-green-600  rounded-2xl p-3' onClick={()=>{
            alert("Request Sent Sucessfully")
            sendreq();
            }}>Add Friend</button></span>)}
          {(data.found==="false")&&( <p className='text-3xl border-1 border-white p-40 text-center rounded-2xl min-w-[70vw]'>😞 {data.message}</p>)}
        </div>)}


      </div>
      <Footer />

    </div>
  )
}

export default page
