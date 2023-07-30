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
    <div className='z-[99999999] fixed flex justify-center items-center w-full h-screen inset-0 bg-black bg-opacity-30 backdrop-blur-sm overflow-hidden overscroll-contain cusor-pointer transition-all duration-200 ease-in-out bg-slate-700/30' onChange={handleClose} id ="modal-wrapper">
      <div className="container flex justify-center items-center w-full">
        <div className="flex flex-col h-full max-h-screen w-fit items-center justify-center px-4 py-5">
      <button className="text-[#499b99]  p-3 text-4xl place-self-end" onClick={()=>onClose()}><IoMdCloseCircle/></button>
      <div className={`bg-white md:w-[${size}] sm:w-[90%] p-15 sm:p-10 shadow-2xl transition text-black rounded flex flex-col justify-center items-center overflow-y-auto
 scrollbar overscroll-contain`}>
        
        {children} 
            </div>
          </div>
        </div>
      </div>
  </>
  )
}

export default React.memo(Modal)
