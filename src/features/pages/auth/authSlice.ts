import {createSlice} from '@reduxjs/toolkit';
import { RootState } from '../../../app/stores/store';
import userInterface from '../../../app/utils/props/userProps';


interface authProps extends userInterface{
    token: string | null;
}
const authSlice = createSlice({
    name:'auth',
    initialState:{ 
        token: null, 
        user: { 
            id:undefined,
            email:undefined,
            name:undefined,
            gender: undefined,
            city: undefined,
            state: undefined,
            country: undefined,
            user_image:undefined,
            account_status:undefined,
            roles:undefined,
        }
    } as authProps, 
    reducers:{
        setCredentials: (state, action) =>{
            const {token , user_info} = action.payload;
            state.token = token;
            if(user_info){
                console.log(user_info)
            state.user = user_info;
            }
        },
        logOut: (state):void =>{
            state.token = null;
            state.user = { 
                id:undefined,
                email:undefined,
                name:undefined,
                gender: undefined,
                city: undefined,
                state: undefined,
                country: undefined,
                user_image:undefined,
                account_status:undefined,
                roles:undefined,
                }
        }
    },
   
})


 export const {setCredentials, logOut} = authSlice.actions;

 export default authSlice.reducer;
 export const selectCurrentToken = (state:RootState) => state.auth.token;
 export const selectCurrentUser = (state:RootState) => state.auth.user;