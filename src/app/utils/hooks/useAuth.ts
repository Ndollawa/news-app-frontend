import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../features/pages/auth/authSlice";
import jwtDecode from "jwt-decode";
import { authProps } from "../props/authProps";

const useAuth = ()=>{

    const token =useSelector(selectCurrentToken)
    let isAdmin, isUser, isDev, isStaff = false
    let role = 'User'
    if(token){
        const decodedToken:authProps['auth'] | undefined = jwtDecode(token)
        const {name,profile}= decodedToken?.user!
        
        isUser = profile?.roles?.includes(1002)
        isStaff = profile?.roles?.includes(10003)!
        isAdmin = profile?.roles?.includes(1001)
        isDev = profile?.roles?.includes(1000)

        if(isAdmin) role = "Admin" 
        if(isDev) role = "Developer" 
        if(isUser) role = "User" 
        if(isStaff) role = "Staff" 
    }
    return {username:'',user: '', roles:[], isAdmin,isDev,isStaff,role}
}

export default useAuth