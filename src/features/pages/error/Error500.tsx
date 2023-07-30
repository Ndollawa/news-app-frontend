import React from 'react';
import { Link, useNavigate} from 'react-router-dom';



const Error500 = () => {
    const navigate =useNavigate()
  return (
<main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">

  <div className='relative flex flex-col justify-center items-center'>
        <h1 className="text-9xl font-extrabold text-white tracking-widest">500</h1>
        <div className="bg-[#499b99] absolute text-center font-bold h-6 w-fit  t-10 px-4 text-sm rounded rotate-12">
            	Internal Server Error
                    
        </div>  
         </div> 
        <p className='text-white text-xl px-2 text-center mt-5'>The server is unable to process your request at the moment.<br/> Try agin after some time. If the error persist, contact our support center.</p>
        
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

export default React.memo(Error500)
