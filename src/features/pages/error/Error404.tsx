import React from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'



const Error404 = () => {
    const navigate =useNavigate()   
const location = useLocation();
const from = location.state?.from ?? location.state?.from?.pathname ?? '/dashboard';
  return (
       
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <div className='relative flex flex-col justify-center items-center'>
        <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div className="bg-[#499b99] absolute text-center font-bold h-6 w-fit  t-10 px-4 text-sm rounded rotate-12">
            Not Found! 
                    
        </div>  
         </div> 
        <p className='text-white text-xl px-2 text-center mt-5'>The page you were looking for was not found!<br/> You may have mistyped the address or the page may have moved.</p>
        <button className="mt-5">
          <button type='button' onClick={()=>navigate(-1)}
            className="relative inline-block text-sm font-medium text-[#499b99] group active:text-[#499b99]-500 focus:outline-none focus:ring"
          >
            <span
              className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#499b99] group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>
    
            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              Go Back
            </span>
          </button>
        </button>
    </main>
  )
}

export default React.memo(Error404)
