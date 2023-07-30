import React from 'react'
import MenuSearch from './SideMenu/MenuSearch';
import Menu from './SideMenu/Menu';
import MenuUserProfile from './SideMenu/MenuUserProfile';
import logo from "../logo512.png";

function SideMenu() {
  return (
  <>
        <div className="flex flex-col justify-between h-[100vh] overflow-y-auto">
                <div className="p-4">
                    {/* <!-- LOGO --> */}
                    <a className="flex items-center text-white space-x-4" href="/dashboard">
                        {/* <img className="w-7 h-7 rounded-lg p-1" src={`https://media.licdn.com/dms/image/C4D0BAQFbfUNKW2A-9Q/company-logo_200_200/0/1669909775579?e=1697673600&v=beta&t=TNyliwOuwNxQAfrDSOWtoavNoYIOsbATzST85YpJ_-U`} alt="Logo"/> */}
                        <span className="text-md font-bold text-white inline-flex">Innoscript AG</span>
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
