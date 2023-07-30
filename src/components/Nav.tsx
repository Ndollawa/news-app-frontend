import React from 'react'
import SideMenu from './SideMenu'

interface isToggle {
  isToggle:boolean;
}
function Nav({isToggle}: isToggle) {
 const classStyles ="absolute lg:relative w-auto transform lg:translate-x-0 h-screen z-5 bg-black transition-all duration-300 "
  return (
    <nav className={!isToggle ? classStyles +"-translate-x-full": classStyles}>
       
        <SideMenu />

    </nav>
    
  )
}

export default Nav
