import React from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'



const Error404 = () => {
    const navigate =useNavigate()   
const location = useLocation();
const from = location.state?.from ?? location.state?.from?.pathname ?? '/dashboard';
  return (
       
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
            Not Found! 
                    
        </div>    
        <p className='text-white text-xl px-2 text-center mt-5'>The page you were looking for is not found!<br/> You may have mistyped the address or the page may have moved.</p>
        <button className="mt-5">
          <a
            className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
          >
            <span
              className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>
    
            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              <Link to="/">Go Home</Link>
            </span>
          </a>
        </button>
    </main>
  )
}

export default React.memo(Error404)
