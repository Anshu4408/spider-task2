"use client"
import Footer from '@/app/components/footer'
import HamNavbarFr from '@/app/components/Hamfriendreq'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [Data, setData] = useState({})
    useEffect(() => {

        const fn = async () => {
            try {
                const res = await fetch("/api/friendreq", {
                    method: "GET"
                })
                const data = await res.json();
                setData(data)
                console.log(data);
            }
            catch (err) {
                console.log(err)
            }

        }

        fn();

    }, [])
    const handleClick=async(e)=>{
          await fetch(`/api/addfriend?friendusername=${e}`,{
            method:"PUT",
        })
        await fetch(`/api/removereq?friendusername=${e}`,{
            method:"PUT",
        })


    }
      const handleClick2=async(e)=>{
        await fetch(`/api/removereq?friendusername=${e}`,{
            method:"PUT",
        })

    }

    return (
        <div>
            <HamNavbarFr />
            <p className='text-white text-4xl '>Your Friend Requests:</p>
            <div className='min-w-[100vw] min-h-[100vh] flex flex-col  items-center'>
<ol className=''>

                {Data?.data && Array.isArray(Data.data.friendreq) && (
                    Data.data.friendreq.map((e, index) => (
                        <li key={index} className="text-white text-2xl border-1 min-w-[100vw] mt-10 flex items-center gap-50 p-4">{e}<button className='text-sm bg-green-500 p-1 rounded-sm cursor-pointer' onClick={()=>{handleClick(e)}}>Accept </button><button className='text-sm bg-red-500 p-1 rounded-sm cursor-pointer' onClick={()=>{handleClick2(e)}}>Reject </button></li>
                    ))
                )}
                </ol>

            </div>
            <Footer />
        </div>
    )
}

export default page
