import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const Api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/`,
        credentials: 'include',
       
    }),
    endpoints: (builder)=> ({
        getUser: builder.query({
            query: (token)=> ({
                url: 'users/profile',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                keepalive: true
            }),
            keepUnusedDataFor: 600
        }),
        getNearbyProviders: builder.query({
            query: ({lat, lng, serviceType})=> `geo/distance?lat=${lat}&lng=${lng}&serviceType=${serviceType}`,
        }),
        getCurrentLocation: builder.query({
            query: ()=> 'geo/get-address-from-coords'
        }),
        getProviderProfile: builder.query({
            query: (token) => ({
                url: `providers/provider-profile`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
        getServices: builder.query({
            query: (token) => ({
                url: `service/get-services-type`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }),
        })        
    }),
})

export const {
    useGetUserQuery,
    useGetNearbyProvidersQuery,
    useGetCurrentLocationQuery,
    useGetProviderProfileQuery,
    useGetServicesQuery
} = Api