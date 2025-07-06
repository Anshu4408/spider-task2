import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='bg-[#49E589] text-black  p-4  w-[100vw]'>
      <ul className='flex items-center justify-between '>
        <li className='flex items-center justify-center'><img className='w-[3vw]' src="/wired-outline-2744-logo-square-myspace-hover-pinch-2.gif"/></li>
        <li className='text-4xl font-semibold'>Split Wise</li>
        <li className=' bg-white rounded-sm pl-4 pr-4 p-1 text-black font-semibold ' ><Link href="/login">Log In/Create Account</Link></li>

      </ul>
    </div>
  )
}

export default Navbar
