import {useLocation,Navigate, useNavigate,Outlet} from 'react-router-dom';
import {authProps, allowedRolesProps} from '../app/utils/props/authProps';
import jwt_decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/pages/auth/authSlice';

const RequireAuth = ({allowedRoles}:allowedRolesProps) =>{
    const location = useLocation();
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);

    token ?? navigate('/login')
    
    const decodedToken:authProps['auth'] | undefined = token
             ? jwt_decode(token)
                : undefined;
    const  roles = decodedToken?.user?.profile?.roles || []
    // console.log(roles)
    return(
        token === null || undefined
        ?<Navigate to="/login" state={{from:location?.state?.from}} replace />
        :roles?.find((role:number) => allowedRoles?.includes(role))
        ? <Outlet/>
        : token
        ?<Navigate to="/error/403" replace state={{from:location?.state?.from}} />
        : <Outlet/>
       
    );
}

export default RequireAuth;