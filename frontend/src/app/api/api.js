import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const Api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/users/`,
        credentials: 'include',
        prepareHeaders: (headers,)=> {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder)=> ({
        getUser: builder.query({
            query: ()=> 'profile',
        }),
    })
})

export const {
    useGetUserQuery
} = Api