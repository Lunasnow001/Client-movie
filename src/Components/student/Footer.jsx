// import React from 'react'


const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-10 md:px-36 w-full text-left">
       <div className="flex md:flex-row flex-col justify-center items-start gap-10 md:gap-32 border-white/30 px-8 md:px-0 py-10 border-b">
          <div className="flex flex-col items-center md:items-start w-full">
            {/* <img src={assets.logo_dark} alt="logo" /> */}
            <h1 className="font-bold text-4xl text-gray-500 cursor-pointer"><span className="text-orange-400">Bz </span>Sketch</h1>
            <p className="mt-6 text-center text-sm text-white/80 md:text-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text.</p>
          </div>
          <div className="flex flex-col items-center md:items-start w-full">
            <h2 className="mb-5 font-semibold text-white">Company</h2>
            <ul className="flex md:flex-col justify-between md:space-y-2 w-full text-sm text-white/80">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>
          <div className="md:flex flex-col items-start hidden w-full">
            <h2 className="mb-5 font-semibold text-white">Subscribe to our newsletter</h2>
            <p className="text-sm text-white/80">The latest news, articles, and resources, sent to your inbox weekly.</p>
            <div className="flex items-center gap-2 pt-4">
              <input type="text" placeholder="Enter your email" className="border-gray-500/30 bg-gray-800 px-2 border rounded w-64 h-9 text-gray-500 text-sm outline-none placeholder-gray-500" />
              <button className="bg-orange-400 rounded w-24 h-9 text-white">Subscribe</button>
            </div>
          </div>
       </div>
       <p className="py-4 text-center text-white/60 text-xs md:text-sm">Copyright {new Date().getFullYear()} © <span className="text-orange-400">Bz </span>Sketch. All Right Reserved.</p>
    </footer>
  )
}

export default Footer