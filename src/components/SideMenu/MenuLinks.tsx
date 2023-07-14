 import { ReactComponentElement, ReactElement } from 'react';
import {IoIosPaper,IoMdPeople,IoMdPricetags,IoMdPersonAdd,IoMdTrash,IoMdPaper,IoIosCreate,IoIosBrowsers} from 'react-icons/io'
import {FaRegQuestionCircle} from "react-icons/fa"

 
 type Submenu = { 
    id:number;
    title: string;
    type: string;
    url: string;
    icon: string|JSX.Element;
   }[];
 type NavLinks = {
  id: number;
  title: string;
  type: string;
  url: string;
  icon: string | JSX.Element;
  isActive: undefined | boolean | null;
  isOpen?: undefined | boolean | null;
  subMenu?:Submenu | undefined;
}[] 
     export const  MenuItems:NavLinks = [ {
        id: 1, 
        title: "Dashboard",
        type: "link",
        url:"/",
        icon:<IoIosBrowsers/>,
        isActive: true,
      },
    //   {
    //   id:2,
    //   title: "Post Management",
    //   type: "dropdown",
    //   url: "#",
    //   icon: <IoIosPaper/>,
    //   isActive: false,
    //   isOpen:false,
    //   subMenu:[
    //     {
    //       id:3,
    //     title: "Create Post",
    //     type: "link",
    //     url:"/posts/create",
    //     icon:<IoIosCreate/>
    //   },
    //   {
    //     id:4,
    //     title: "All Posts",
    //     type: "link",
    //     url:"/posts",
    //     icon:<IoMdPaper/>
    //   },
    //   {
    //     id:5,
    //     title: "Recycle Bin",
    //     type: "link",
    //     url:"/posts/recyclebin",
    //     icon:<IoMdTrash/>
    //   }] 

    // },
    // {
    //   id:6,
    //   title: "User Management",
    //   type: "dropdown",
    //   url: "#",
    //   icon: <IoMdPeople/>,
    //   isActive: false,
    //   isOpen:false,
    //   subMenu:[
    //     {
    //     id:7,
    //     title: "Create User",
    //     type: "link",
    //     url:"/users/create",
    //     icon:<IoMdPersonAdd/>
    //   },
    //   {
    //     id:8,
    //     title: "All Users",
    //     type: "link",
    //     url:"/users",
    //     icon:<IoMdPeople/>
    //   },
    //   {
    //     id:9,
    //     title: "Recycle Bin",
    //     type: "link",
    //     url:"/users/recyclebin",
    //     icon:<IoMdTrash/>
    //   } ] 

    // },
    // {
    //     id:10,
    //     title: "Post Categories",
    //     type: "link",
    //     url: "/category",
    //     icon: <IoMdPricetags/>,
    //     isActive: false,
    //     isOpen:false
    //   },
    //   {
    //     id:11,
    //     title: "FAQ",
    //     type: "link",
    //     url: "/faq",
    //     icon: <FaRegQuestionCircle/>,
    //     isActive: false,
    //     isOpen:false
    //   }
  ]