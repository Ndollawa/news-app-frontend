import { apiSlice } from "../../../app/api/apiSlice";
import localStorage from "redux-persist/es/storage";


export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({

        updateProfile: builder.mutation({
            query: data => ({
                url: '/profile/edit',
                method: 'PATCH',
                body: data,
            }),
        }),
        updateProfilePreference: builder.mutation({
            query: data => ({
                url: '/profile/preferences/edit',
                method: 'PATCH',
                body: data,
            }),
        }),
    
    })
})

export const {
    useUpdateProfileMutation,
    useUpdateProfilePreferenceMutation 
} = profileApiSlice;