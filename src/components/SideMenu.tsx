import React from 'react'
import MenuSearch from './SideMenu/MenuSearch';
import Menu from './SideMenu/Menu';
import MenuUserProfile from './SideMenu/MenuUserProfile';
import logo from "../logo512.png";

function SideMenu() {
  return (
  <>
        <div className="flex flex-col justify-between h-full overflow-y-auto">
                <div className="p-4">
                    {/* <!-- LOGO --> */}
                    <a className="flex items-center text-white space-x-4" href="/">
                        <img className="w-7 h-7 rounded-lg p-1" src={logo} alt="Logo"/>
                        <span className="text-xl font-bold">News Aggregator</span>
                    </a>

                    {/* <!-- SEARCH BAR --> */}
                        <MenuSearch />
                    {/* <!-- SEARCH RESULT --> */}
                    

                    {/* <!-- NAV LINKS --> */}
                         <Menu />
                </div>

                {/* <!-- PROFILE --> */}
                    <MenuUserProfile />
             </div>
    </>
  )
}

export default SideMenu
