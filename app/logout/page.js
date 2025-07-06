"use client"
import Loading from '../components/loading'
import React, { useEffect ,useState} from 'react'

const page = () => {
    const [Loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
      const fn=async()=>{
        
      const res=  await fetch("/api/logout",{
            method:"GET",
        })
        if(res.redirected)window.location.href=res.url;
          setLoading(false)
      }
      fn();
    
     
    }, [])
    
  return (
    <div>
        {Loading&&(<Loading/>)}
        
      Please Wait while Logout .........
    </div>
  )
}

export default page
