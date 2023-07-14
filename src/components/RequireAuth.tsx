import {useLocation,Navigate,Outlet} from 'react-router-dom';
import {authProps, allowedRolesProps} from '../app/utils/props/authProps';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/pages/auth/authSlice';

const RequireAuth = ({allowedRoles}:allowedRolesProps) =>{
    const {state:{from}} = useLocation();
    const token = useSelector(selectCurrentToken);


    const decodedToken:authProps['auth'] | undefined = token
             ? jwt_decode(token)
                : undefined;
    const  roles = decodedToken?.user?.profile?.roles || []
    // console.log(token)
    return(
        token === null || undefined
        ?<Navigate to="/login" state={{from}} replace />
        :roles?.find((role:number) => allowedRoles?.includes(role))
        ? <Outlet/>
        : token
        ?<Navigate to="/error/403" replace state={{from}} />
        : <Outlet/>
       
    );
}

export default RequireAuth;