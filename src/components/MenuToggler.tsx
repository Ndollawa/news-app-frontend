import React, {useState} from 'react'
import {Link,  useNavigate} from "react-router-dom"
import {IoMdMail,IoMdNotifications,IoMdCog,IoMdArrowDropdown,IoIosPersonAdd,IoIosContact,IoIosCog,IoIosLogOut} from "react-icons/io"
import pic from "../logo512.png"
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { selectCurrentUser } from '../features/pages/auth/authSlice'
import useUserImage from '../app/utils/hooks/useUserImage'
import { useSendLogoutMutation } from '../features/pages/auth/authApiSlice'
import Profile from '../features/pages/profile/Profile'
import ProfileEdit from '../features/pages/profile/ProfileEdit'
import ProfilePreference from '../features/pages/profile/ProfilePreference'

interface FuncProp {
  toggleMenu : () => void
}
   const MenuToggler:React.FC<FuncProp> = ({toggleMenu}:FuncProp)=> {
   const currentUser = useSelector(selectCurrentUser)
   const userImage = useUserImage(currentUser)
    const [showProfile, setShowProfile] = useState(false);  
    const [showEditProfile, setShowEditProfile] = useState(false)
    const [showProfilePreference, setShowProfilePreference] = useState(false)


  const [sendLogout,{
    isLoading:isLogoutLoading,
    isSuccess,
    isError,
    error
   }] = useSendLogoutMutation()
 
  return (
    <div className="flex fixed top-0 right-0 w-full justify-between items-center bg-black text-white h-16  z-5 select-none">
                <img className="rounded-full w-10 mx-5" src={`data:image/jpeg;base64,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`} alt=""/>
                <div className="items-center flex md:mr-24">
                <ul className='flex w-full h-6 justify-between text-lg'>
                  <li className="mr-6 text-xl relative"> <label htmlFor="message" title="Messages"><IoMdMail/> <span className="badge bg-cyan-600"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>2</span></label>
                  <input type="checkbox" id="message" className="dropdown-checkbox" name="dropdown-menu" />
                  <div className="dropdown xs:w-72 md:w-96 message-dropdown">
                    <div className="dropdown-menu-header messages">Messages</div>
                      <ul className="dropdown-menu">
                      <li className="items p-2 text-xs hover:bg-slate-300"><div className="rounded-full w-9 h-9 flex-shrink-0 bg-slate-500"><img className="" src={pic} alt=""/></div>&ensp;
                            <div className="relative items-center">
                                  <p className="text-xs font-light text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, ratione!</p>
                              <span className="time">10mins ago</span>
                            </div>
                        </li>
                       
                        <li className="items p-2 text-xs hover:bg-slate-300"><div className="rounded-full w-9 h-9 flex-shrink-0 bg-slate-500"><img className="" src={pic} alt=""/></div>&ensp;
                            <div className="relative items-center">
                                  <p className="text-xs font-light text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, ratione!</p>
                              <span className="time">10mins ago</span>
                            </div>
                        </li>
                        <li className="items p-2 text-xs hover:bg-slate-300"><div className="rounded-full w-9 h-9 flex-shrink-0 bg-slate-500"><img className="" src={pic} alt=""/></div>&ensp;
                            <div className="relative items-center">
                                  <p className="text-xs font-light text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, ratione!</p>
                              <span className="time">10mins ago</span>
                            </div>
                        </li>
                        
                        
                      </ul>
                      <div className="dropdown-menu-footer"><a href="">View all</a></div>
                    </div>
                  </li>
                  <li className="mr-6 text-xl relative"><label htmlFor="notification" title="Notifications"><IoMdNotifications/> <span className="badge bg-red-600"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>2</span></label>
                    <input type="checkbox" id="notification" className="dropdown-checkbox" name="dropdown-menu" />
                    <div className="dropdown xs:w-72 md:w-96 notification-dropdown">
                      <div className="dropdown-menu-header notifications">Notifications</div>
                      <ul className="dropdown-menu">
                        <li className="items p-2 text-xs hover:bg-slate-300"><div className="rounded-full w-9 h-9 flex-shrink-0 flex items-center justify-center bg-blue-600"><IoIosPersonAdd/></div>&ensp;
                            <div className="relative items-center">
                                  <p className="text-sm font-light text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, ratione!</p>
                              <span className="time">10mins ago</span>
                            </div>
                        </li>
                        <li className="items p-2 text-sm"><div className="rounded-full w-9 h-9 flex-shrink-0 flex items-center justify-center bg-gray-600"><IoIosPersonAdd/></div>&ensp;
                            <div className="relative items-center">
                                  <p className="text-sm font-light text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, ratione!</p>
                              <span className="time">10mins ago</span>
                            </div>
                        </li>
                       
                      </ul>
                      <div className="dropdown-menu-footer"><a href="">View all</a></div>
                    </div>
                  </li>
                  <li className="mr-6 items-center" title="Site Setting"><IoMdCog/></li>
                  <li className="mr-6 xs:mr-1 flex  relative items-center md:flex-no-wrap"><label className="flex flex-nowrap" htmlFor="userMenu"><div className="rounded-full w-7 h-7 bg-slate-500 flex-shrink-0 avatar"><img className="" src={userImage} width="50" alt=""/></div>&ensp;
                 <div className="md:flex xs:hidden"> Hello!, &ensp;<span className="font-bold"> {currentUser?.name || ""}</span></div><IoMdArrowDropdown/></label>
                    <input type="checkbox" className="dropdown-checkbox" id="userMenu" name="dropdown-menu" />
   <div id="dropdownDots" className="userMenu-dropdown top-6  xs:-left-20 dropdown overscroll-y-none left-4 xs:w-48 md:w-64 z-3 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li className="items  px-3" onClick={()=>setShowProfile(prev =>!prev)}><Link to=""  className="flex items-center flex-nowrap py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">&ensp;<IoIosContact className="text-2xl"/>Profile</Link></li>
              <li className="items  px-3" onClick={()=>setShowEditProfile(prev =>!prev)}><Link to="" className="flex items-center flex-nowrap py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">&ensp;<IoIosCog className="text-2xl"/>Profile Setting</Link></li>
              <li className="items  px-3" onClick={()=>setShowProfilePreference(prev =>!prev)}><Link to="" className="flex items-center flex-nowrap py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">&ensp;<IoIosCog className="text-2xl"/>Feeds Preference</Link></li>
    </ul>
    <div className="py-2 h-10" onClick={()=>sendLogout()}><span className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">&ensp;<IoIosLogOut className="text-2xl"/>Logout</span>
    </div>
</div>
                    
                 </li>
                </ul>
                <button type="button"  className="lg:hidden btn p-4 focus:outline-none hover:bg-gray-800" onClick={()=>toggleMenu()}>
                    <svg className="w-6 h-6 fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
           
     <Profile showUserProfile={showProfile} setShowProfile={setShowProfile} />
     <ProfileEdit showEditProfile={showEditProfile} setShowEditProfile={setShowEditProfile} />
     <ProfilePreference showProfilePreference={showProfilePreference} setShowProfilePreference={setShowProfilePreference} />
    </div>
  )
}

export default React.memo(MenuToggler)
