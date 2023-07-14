import React, {useState} from 'react'
import {Link,  useNavigate} from "react-router-dom"
import {IoMdMail,IoMdNotifications,IoMdCog,IoMdArrowDropdown,IoIosPersonAdd,IoIosContact,IoIosCog,IoIosLogOut} from "react-icons/io"
import pic from "../logo512.png"
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { selectCurrentUser } from '../features/pages/auth/authSlice'
import useUserImage from '../app/utils/hooks/useUserImage'
import Swal  from 'sweetalert2'
import Profile from '../features/pages/profile/Profile'

interface FuncProp {
  toggleMenu : () => void
}
   const MenuToggler:React.FC<FuncProp> = ({toggleMenu}:FuncProp)=> {
   const currentUser = useSelector(selectCurrentUser)
   const userImage = useUserImage(currentUser)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
 

    // const [txt,setTxt] = useState("")
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   html:ProfileForm,
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   }
    // })
  return (
    <div className="flex fixed top-0 right-0 w-full justify-between items-center bg-black text-white h-16  z-5 select-none">
                <img className="rounded-full w-10 mx-5" src={pic} alt=""/>
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
                  <li className="mr-6 items-center"><Link to="/sitesettings" title="Site Setting"><IoMdCog/></Link></li>
                  <li className="mr-6 xs:mr-1 flex  relative items-center md:flex-no-wrap"><label className="flex flex-nowrap" htmlFor="userMenu"><div className="rounded-full w-7 h-7 bg-slate-500 flex-shrink-0 avatar"><img className="" src={userImage} width="50" alt=""/></div>&ensp;
                 <div className="md:flex xs:hidden"> Hello!<span className="font-bold"> Ndubuisi</span></div><IoMdArrowDropdown/></label>
                    <input type="checkbox" className="dropdown-checkbox" id="userMenu" name="dropdown-menu" />
   <div id="dropdownDots" className="userMenu-dropdown top-6  xs:-left-20 dropdown overscroll-y-none left-4 xs:w-48 md:w-64 z-3 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li className="items  px-3" onClick={()=>setShowProfile(prev =>!prev)}><Link to=""  className="flex items-center flex-nowrap py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">&ensp;<IoIosContact className="text-2xl"/>Profile</Link></li>
              <li className="items  px-3"><Link to="" className="flex items-center flex-nowrap py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">&ensp;<IoIosCog className="text-2xl"/>Profile Setting</Link></li>
              <li className="items  px-3"><Link to="" className="flex items-center flex-nowrap py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">&ensp;<IoIosCog className="text-2xl"/>Feeds Preference</Link></li>
    </ul>
    <div className="py-2 h-10"><Link to="" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">&ensp;<IoIosLogOut className="text-2xl"/>Logout</Link>
    </div>
</div>
                    
                 </li>
                </ul>
                <button type="button"  className="md:hidden btn p-4 focus:outline-none hover:bg-gray-800" onClick={()=>toggleMenu()}>
                    <svg className="w-6 h-6 fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
           
     <Profile showUserProfile={showProfile}/>
    </div>
  )
}

export default MenuToggler
