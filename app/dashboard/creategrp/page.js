"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'

const page = () => {
const [Url, setUrl] = useState("")
    const [Selected, setSelected] = useState([])
    const [image, setimage] = useState("/browser_8246896.png")
    const [Data, setData] = useState({})
      const [file, setfile] = useState(null); 
    const [Group, setGroup] = useState("")
    const [friends, setfriends] = useState([])
    const [filterFriends, setfilterFriends] = useState([])
    const [Search, setSearch] = useState("")
    const [Type, setType] = useState("")
    useEffect(() => {
      const fn=async()=>{
        try{
   const res=await fetch("/api/friendreq",{
            method:"GET",
        })
        const data=await res.json();
        setData(data);
        setfriends(data.data.friends || []);
        }
     catch(err){
        console.log(err);
     }
      }
    fn();
    
    }, [])
    useEffect(() => {
        if(Search){
 const filter=friends.filter((e)=>
        e.startsWith(Search)
    )
    setfilterFriends(filter);
    console.log(filter)
        }
        else {
            setfilterFriends("")
        }
   
      
    }, [Search])
    
    
    const handleSubmit=async()=>{
         const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "dpphoto");
        formData.append("cloud_name", "dorv3py1v");
        const response = await fetch("https://api.cloudinary.com/v1_1/dorv3py1v/image/upload", {
            method: "POST",
            body: formData,
        })
         const data = await response.json();
        setUrl( data.secure_url);
          const query = new URLSearchParams();
    Selected.forEach((friend) => query.append("friends", friend));
const res =await fetch(`/api/creategrp?type=${Type}&Group=${Group}&${query.toString()}&Url=${Url}`,{
    method:"PUT"
})
if(res.redirected)
    window.location.href = res.url; 

       

    }
     const handleChange = (e) => {
    if (e.target.files[0]) {
      setfile(e.target.files[0]); 
      setimage(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div className='min-w-[100vw] min-h-[100vh]'>
       <div className='flex flex-col items-center p-4 gap-2'><span className='flex justify-evenly gap-110'><img src='/shape.png' className='w-[4vw] cursor-pointer' onClick={()=>{
        window.location="/dashboard"
       }}/><p className='text-white text-6xl'>Create a Group</p><img className='w-[4vw] cursor-pointer' src='/check.png' onClick={handleSubmit} /></span> 
        <form className='bg-[#181928] p-6 pl-20 pr-20  mt-10 rounded-2xl flex  gap-10 '>
            {image && (<label htmlFor='file-upload'><img src={image} className="border-1 border-[#49E589]  rounded-2xl  w-[7vw] h-[12vh] "  /></label>)
            }
            {!image && (
                <label className='w-[8vw] p-2'  htmlFor='file-upload'><img src="/photo-camera.png" className="border-1 border-[#49E589]  rounded-2xl  w-[7vw] h-[12vh] p-4 " /></label>
            )}
             <input id="file-upload"  type="file" accept='image/*' onChange={handleChange} className='hidden'/>
            <span className='flex flex-col'><label className='text-white text-2xl'> Group Name</label>
            <input className='border-b-1 border-[#49E589] text-gray-500 p-3 text-4xl' placeholder='Enter Group Name' type='text' value={Group} onChange={(e)=>{
                e.target.style.color="white"
                setGroup(e.target.value)}}></input>
          
            </span>
            </form>
             <form className='bg-[#181928] p-6 pl-20 pr-20  mt-10 rounded-2xl flex  gap-10 '>
             <div  className="border-1 border-[#49E589]  rounded-2xl w-[7vw] bg-[url('/friends-1.png')] bg-contain  h-[13vh] "  ></div>
            <span className='flex flex-col'><label className='text-white text-2xl'> Add Friends</label>
            <input className='border-b-1 border-[#49E589] text-gray-500 p-3 text-4xl' placeholder="Enter Friend's Name" type='text' value={Search} onChange={(e)=>{setSearch(e.target.value)}}></input>
            {filterFriends.length>0&&(filterFriends.map((e,i)=>(<p className='bg-white' onClick={()=>{
                setSearch("")
               if (!Selected.includes(e)) { setSelected([...Selected,e])}
            }}>{e}</p>)))
                   
           }
           <div className='flex gap-10'>
           {Selected.length>0&&(
            Selected.map((e,i)=>(
             <button className='bg-[#49E589] w-[5vw] text-white mt-10 p-2 rounded-2xl' onClick={(e)=>{e.preventDefault();}}>{e}</button>
            ))
            
           )}
           </div>
            </span>
            
            </form>
            <div className='flex flex-col justify-start w-[40vw] mt-5 text-white'> <div className='text-white   text-4xl   '>Type</div>
            <span className='flex gap-10'>
                <div id='type-1' className="bg-[#181928] w-[7vw] h-[7vw] rounded-2xl  border-[#181928] border-1 hover:border-[#49E589] cursor-pointer  flex flex-col items-center justify-center  " onClick={(e)=>{e.target.style.borderColor="#49E589"
                    document.getElementById("type-2").style.borderColor="#181928"
                    document.getElementById("type-3").style.borderColor="#181928"
                    document.getElementById("type-4").style.borderColor="#181928"
                     setType("Travel")
                }}><img className="w-[4vw]" src='/gps.png'/>Travel</div>
            <div id='type-2'className='bg-[#181928] w-[7vw] h-[7vw] rounded-2xl border-[#181928] border-1 hover:border-[#49E589] cursor-pointer flex flex-col items-center justify-center ' onClick={(e)=>{e.target.style.borderColor="#49E589"
                    document.getElementById("type-1").style.borderColor="#181928"
                    document.getElementById("type-3").style.borderColor="#181928"
                    document.getElementById("type-4").style.borderColor="#181928"
                     setType("Home")
            }}><img className='w-[4vw]' src='/home.png'/>Home</div>
            <div id='type-3'className='bg-[#181928] w-[7vw] h-[7vw] rounded-2xl border-[#181928] border-1 hover:border-[#49E589] cursor-pointer flex flex-col items-center justify-center' onClick={(e)=>{e.target.style.borderColor="#49E589"
                    document.getElementById("type-2").style.borderColor="#181928"
                    document.getElementById("type-1").style.borderColor="#181928"
                    document.getElementById("type-4").style.borderColor="#181928"
                     setType("Couple")
            }}><img  className="w-[4vw]" src='/couple.png'/>Couple</div>
            <div id='type-4'className='bg-[#181928] w-[7vw] h-[7vw] rounded-2xl border-[#181928] border-1 hover:border-[#49E589] cursor-pointer flex flex-col items-center justify-center ' onClick={(e)=>{e.target.style.borderColor="#49E589"
                    document.getElementById("type-2").style.borderColor="#181928"
                    document.getElementById("type-3").style.borderColor="#181928"
                    document.getElementById("type-1").style.borderColor="#181928"
                    setType("Other")
            }
        }> <img className='w-[4vw]' src='/menu.png'/>Other</div></span>
            
            </div>
            <p className='text-white text-2xl mt-4'>SplitWise will remind friends,to join ,add expense and settle up</p>
            </div>
           
     
    </div>
  )
}

export default page
