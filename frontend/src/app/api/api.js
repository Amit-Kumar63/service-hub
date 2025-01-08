import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const Api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/`,
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
            query: ()=> 'users/profile',
            keepUnusedDataFor: 600
        }),
        getNearbyProviders: builder.query({
            query: ({lat, lng})=> `geo/distance?lat=${lat}&lng=${lng}`,
        }),
        getCurrentLocation: builder.query({
            query: (coords)=> 'geo/get-address-from-coords'
        })
    }),
})

export const {
    useGetUserQuery,
    useGetNearbyProvidersQuery,
    useGetCurrentLocationQuery
} = Api