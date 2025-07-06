import React from 'react'

const Footer = () => {
  return (
   <footer className="bg-black text-white py-6 mt-10">
  <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    
    <div className="text-center md:text-left mb-4 md:mb-0">
      <h1 className="text-2xl font-bold text-green-400">SplitWise</h1>
      <p className="text-sm text-gray-400">Split bills easily. Share smarter. Pay back effortlessly.</p>
    </div>

    <ul className="flex space-x-6 text-sm text-gray-300">
      <li><a href="/about" className="hover:text-white transition">About</a></li>
      <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
      <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
    </ul>
  </div>

  <div className=" text-center text-gray-500 text-xs">
    Made with ❤️ for Spider · © {new Date().getFullYear()} NIT Trichy
  </div>
</footer>
  )
}

export default Footer
