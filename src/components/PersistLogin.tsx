import { Outlet , useLocation, Navigate} from "react-router-dom";
import React,{ useState, useEffect,useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRefreshMutation } from "../features/pages/auth/authApiSlice";
import { selectCurrentToken } from '../features/pages/auth/authSlice';
import { setPreloader } from "../features/pages/preloader/PreloaderSlice";
import useLocalStorage from "../app/utils/hooks/useLocalStorage";
import Preloader from "./Preloader";

const PersistLogin = () =>{
    const [trueSuccess, setTrueSuccess] = useState(false);
    const [ persist ]:any = useLocalStorage('persist',false);
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const {state} = useLocation();
    const dispatch = useDispatch();


const [refresh,{
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
}] = useRefreshMutation();


useEffect(() =>{

    if(effectRan.current === true || process.env.NODE_ENV !== 'development'){
        // react 18 strict mode
        const verifyRefreshToken = async () =>{
            try{
                await refresh();
                setTrueSuccess(true)
            }catch(error){
                console.error(error);
            }
           
        }
        if(!token && persist){verifyRefreshToken()} 
       
    }
  return () =>{
     effectRan.current = true;
    }
  //eslint-disable-next-line
}, [])
 let content;
 if(!persist){
    content =  <Outlet/>
          }else if(isLoading){
            content =<Preloader/>
                }else if(isError){
                  content = <Navigate to={'/login'} replace state={state}/>

                }else if(!isLoading && isSuccess && trueSuccess){
                   content = <Outlet/> 
                }else if(token && isUninitialized){
                  content =  <Outlet/>
                }
    useEffect(()=>{
dispatch(setPreloader(isLoading? true :false))
},[isLoading])            
    return(
        <>
        {content}
        </>
    )
}

export default React.memo(PersistLogin);