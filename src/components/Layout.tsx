import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Nav from './Nav'
import Footer from './Footer'
import MenuToggler from './MenuToggler'


const Layout = () => {
      
const [isToggle, setisToggle] = useState(false) 
const toggleMenu = () => setisToggle(prev =>  !prev )

  return (
    <div className="font-poppins antialiased bg-white-50">
                    <div className="flex relative">
                      <Nav isToggle={isToggle} />
                      <ToastContainer/>
                      <div className='flex-1 h-screen overflow-x-hidden overflow-y-scroll'>
                      <main className="pb-20 pt-20">
                        <MenuToggler  toggleMenu={toggleMenu}/>
                        <Outlet/>
                        {/*<!-- END OF PAGE CONTENT -->*/}
                        <Footer/>
                    </main>
                        </div>
                      </div>
                    </div>
  )
}

export default React.memo(Layout)
