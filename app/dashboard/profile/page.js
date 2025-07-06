"use client"
import React from 'react'
import Loading from '@/app/components/loading'
import { useState,useEffect} from 'react'
const page = () => {
 
    const [name, setname] = useState("")
    const [file, setfile] = useState(null)
    const [mobno, setmobno] = useState("")
    const [pin, setpin] = useState("")
    const [add, setadd] = useState("")
    const [loading, setloading] = useState(false)

        //for extracting name from cookie
        useEffect(() => {
            const allcookie = document.cookie
            const cookieArray = allcookie.split(";")
            const nameCookie = cookieArray.find(e => e.trim().startsWith('name='))
            if (nameCookie) {
                const value = nameCookie.split('=')[1];
                console.log(decodeURIComponent(value).toUpperCase())
                setname(decodeURIComponent(value).toUpperCase())
            }
        },[])
             //for extracting photourl from cookie
            useEffect(() => {
                const allcookie = document.cookie
                const cookieArray = allcookie.split(";")
                const urlCookie = cookieArray.find(e => e.trim().startsWith('url='))
                if (urlCookie) {
                    const value = urlCookie.split('=')[1];
                   
                    setimage(decodeURIComponent(value))
                }
        
        
            }, []);
               //for extracting mobno from cookie
            useEffect(() => {
                const allcookie = document.cookie
                const cookieArray = allcookie.split(";")
                const urlCookie = cookieArray.find(e => e.trim().startsWith('mob='))
                if (urlCookie) {
                    const value = urlCookie.split('=')[1];
                   
                    setmobno(decodeURIComponent(value))
                }
        
        
            }, []);
                   //for extracting add from cookie
            useEffect(() => {
                const allcookie = document.cookie
                const cookieArray = allcookie.split(";")
                const urlCookie = cookieArray.find(e => e.trim().startsWith('add='))
                if (urlCookie) {
                    const value = urlCookie.split('=')[1];
                   
                    setadd(decodeURIComponent(value))
                }
        
        
            }, []);
                       //for extracting add from cookie
            useEffect(() => {
                const allcookie = document.cookie
                const cookieArray = allcookie.split(";")
                const urlCookie = cookieArray.find(e => e.trim().startsWith('pin='))
                if (urlCookie) {
                    const value = urlCookie.split('=')[1];
                   
                    setpin(decodeURIComponent(value))
                }
        
        
            }, []);
    const handleSubmit = async (e) => {
        setloading(true)
        e.preventDefault();

        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "dpphoto");
        formData.append("cloud_name", "dorv3py1v");
        const response = await fetch("https://api.cloudinary.com/v1_1/dorv3py1v/image/upload", {
            method: "POST",
            body: formData,
        })
        const data = await response.json();
        console.log(data);


        const res = await fetch("/api/alreadyuserdetails", {
            headers: {
                "Content-Type": "application/json",
            },

            method: "PUT",
            body: JSON.stringify({
                
                name,
               
                photoUrl: data.secure_url,
                mobile: mobno,
                address: add,
                pincode: pin,

            })


        })
        //manually handling redirect bcz of fetch
      if (res.redirected) {
  window.location.href = res.url;  
}


setloading(false)
    }
    const [image, setimage] = useState(null)
    const handleChange = (e) => {
        if (e.target.files[0]) {

            setfile(e.target.files[0]);
            setimage(URL.createObjectURL(e.target.files[0]))
        }

    }
    return (<>

        <div className='flex flex-col justify-center items-center'>
            <p className="text-white text-4xl my-6">YOUR PROFILE</p>
            {image && (<img src={image} className='rounded-full w-[10vw] h-[10vw] my-4 border-white border-1' />)
            }
            {!image && (
                <img src="/istockphoto-1300845620-612x612-2.jpg" className='rounded-full w-[10vw] h-[10vw] my-8 border-white border-1' />
            )}
            <label className='text-white cursor-pointer w-[10vw] border-2 border-white p-2 my-4 rounded-2xl text-sm text-center bg-gradient-to-b from-green-600 to-green-950 ' htmlFor='file-upload'> CHANGE </label>
            <input id="file-upload" className="border-1 bg-green-700 hidden" type="file" accept='image/*' onChange={handleChange} />
            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                <label htmlFor='name'></label>
                <input id="name" className='border-1 border-white text-white  rounded-2xl min-w-lg text-center h-[6vh]' type="text" placeholder='Enter your Name' value={name} onChange={(e) => {
                    setname(e.target.value)
                }} />
                <label htmlFor='mob'></label>
                <input id="mob" className='border-1 border-white text-white  rounded-2xl min-w-lg text-center h-[6vh]' type="tel" pattern="[0-9]*" inputMode="numeric" placeholder='Enter Mob No.' value={mobno} onChange={(e)=>{
                    setmobno(e.target.value)
                }} />
                <label htmlFor='add'></label>
                <input id="add" className='border-1 border-white text-white  rounded-2xl min-w-lg text-center h-[6vh]' type="text" placeholder='Enter Address' value={add} onChange={(e)=>{
                    setadd(e.target.value)
                }} />
                <label htmlFor='pin'></label>
                <input id="pin" className='border-1 border-white text-white  rounded-2xl min-w-lg text-center h-[6vh]' type="tel" placeholder='Enter Pincode' value={pin} onChange={(e)=>{
                    setpin(e.target.value)
                }}/>

                <input type="submit" className='bg-green-600 rounded-2xl w-1/4 mx-auto h-[4vh] text-white cursor-pointer ' value="Update" disabled={loading} />
            </form>
           {loading&&(
            <Loading/>
     
           )}
        </div>
    </>
    )
}

export default page
