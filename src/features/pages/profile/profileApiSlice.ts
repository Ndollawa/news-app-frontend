import { apiSlice } from "../../../app/api/apiSlice";


export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({

        updateProfile: builder.mutation({
            query: data => ({
                url: '/profile/update',
                method: 'PATCH',
                body: data,
            }),
        }),
        updateProfilePreference: builder.mutation({
            query: data => ({
                url: '/profile/preferences/update',
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