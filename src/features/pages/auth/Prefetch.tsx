import { store } from "../../../app/stores/store";
import {usersApiSlice} from "../profile/usersApiSlice";
import {useSelector} from 'react-redux';
import { selectCurrentUser } from "./authSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch =()=>{
  const user = useSelector(selectCurrentUser)
  useEffect(() => {
    // store.dispatch(settingsApiSlice.util.prefetch('getSettings', 'settingsList', { force: true }))
    // store.dispatch(urlApiSlice.util.prefetch('getUrl', 'urlsList', { force: true }))
   if(user?.id){
    // store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
   } 
}, [])
    return <Outlet/>
}

export default Prefetch