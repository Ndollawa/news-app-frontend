import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {MenuItems} from "./MenuLinks"

export default function Menuitem() {

  const classes = "block py-2.5 px-4 flex items-center space-x-2 text-white hover:bg-gray-800 hover:text-white rounded";
  const [menuItems, setMenuItems] = useState(MenuItems);      
  // const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = (id:number)=>{
    setMenuItems((prevValue)=>{
     return prevValue.map((menu)=>{ return menu.id === id ? {...menu, isOpen:!menu.isOpen } : menu})
     } );
    
  }

     const link =    menuItems.map((item, index):(JSX.Element|undefined) => { 
           switch(item.type){
            case "link":
                    // BASIC LINK
              return (<Link to={item.url} className={ item.isActive ?"bg-gray-800 " + classes: classes } key={item.id}>
                           {item.icon} <span>{item.title}</span>
                        </Link> ) 
             break;

            case "dropdown":
                    //  DROPDOWN LINK 
             return (<div className="block" key={item.id}>
                            <div className={ item.isActive ?"bg-gray-800 justify-between cursor-pointer " + classes: classes+" justify-between cursor-pointer"} key={item.id} onClick={()=>handleToggleMenu(item.id) }>
                                <div className="flex items-center space-x-2">
                                    {item.icon}
                                    <span>{item.title}</span>
                                </div>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={item.isOpen ? {display:"none"} : undefined}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                                <svg  className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={!item.isOpen ? {display:"none"} : undefined}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>    
                            </div>
                            <div className="text-sm border-l-2 border-gray-800 mx-6 my-2.5 px-2.5 flex flex-col gap-y-1"  style={!item.isOpen ? {display:"none"} : undefined}>
                            {
                            item.subMenu?.map((link,i):(JSX.Element|undefined) =>{
                             return ( <Link to={link.url} key={"subMenu_"+i} className="flex items-center flex-nowrap w-full py-2 px-4 hover:bg-gray-800 hover:text-white rounded">
                                    {link.icon}&ensp;{link.title}
                                </Link>)
                            })
                           }
                            </div>
                        </div>)
                  break;
                  
                default:
                  return undefined;
                  break;
                }
            
         });
              return (
                <>
            {link}                    
                </>
              )
}
