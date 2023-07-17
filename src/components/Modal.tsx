import React, { ChangeEvent } from 'react'
import { IoMdCloseCircle } from 'react-icons/io';

interface ModalIP{
children:React.ReactNode;
onClose:any;
isVisible:boolean;
size?:string;
}

const Modal = ({children,onClose,isVisible,size='600px'}:ModalIP) => {
    if(!isVisible) return <></>

const handleClose =(e:ChangeEvent<HTMLInputElement>)=>{
if(e.target.id === 'modal-wrapper') onClose()
}

  return (
    <>
    <div className='z-[99999999999999999] fixed w-full inset-0 bg-black bg-opacity-30 backdrop-blur-sm overflow-hidden overscroll-contain cusor-pointer transition-all duration-200 ease-in-out bg-slate-700/30' onChange={handleClose} id ="modal-wrapper">
    <div className={ `md:w-[${size}] sm:w-[90%] max-h-[90%] h-full scale-90  mx-auto flex justify-center items-center flex-col`}>
    
      <div className="bg-white w-fit p-10 shadow-2xl transition text-black rounded flex flex-col justify-center items-center overflow-y-none ">
          <button className="text-black  p-3 text-4xl place-self-end" onClick={()=>onClose()}><IoMdCloseCircle/></button>
      
        {children} 
      </div>
    </div>
  </div>
  </>
  )
}

export default React.memo(Modal)
