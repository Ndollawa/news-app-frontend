import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import MenuToggler from './MenuToggler'


const Layout = () => {
      
const [isToggle, setisToggle] = useState(false) 
const toggleMenu = () => setisToggle(prev =>  !prev )

  return (
    <div className="antialiased bg-white-50">
                    <div className="flex relative">
                      <Nav isToggle={isToggle} />
                      <div className='flex-1 h-screen overflow-x-hidden overflow-y-scroll'>
                      <main className="pb-20 pt-20">
                        <MenuToggler  toggleMenu={toggleMenu}/>
                        <Outlet/>
                        {/*<!-- END OF PAGE CONTENT -->*/}
                    </main>
                        <Footer/>
                        </div>
                      </div>
                    </div>
  )
}

export default Layout
