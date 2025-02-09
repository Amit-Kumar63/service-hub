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
        }),
        getChangeBookingStatus: builder.mutation({
            query: ({id, status, token}) => ({
                url: `booking/change-booking-status`,
                method: 'POST',
                params: {
                    id,
                    status
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        getAddToFav: builder.mutation({
            query: ({serviceId, token}) => ({
                url: `users/add-to-favourites`,
                method: 'POST',
                params: {
                    serviceId
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        addAddress: builder.mutation({
            query: ({address, phone, token}) => ({
                url: `users/add-address`,
                method: 'POST',
                body: {
                    address,
                    phone
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        logoutUser: builder.mutation({
            query: (token) => ({
                url: `users/logout`,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        updateUserProfile: builder.mutation({
            query: ({name, phone, address, token}) => ({
                url: 'users/edit-user-profile',
                method: 'POST',
                body: {
                    name,
                    phone,
                    address
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        addProviderAddress: builder.mutation({
            query: ({address, phone, token}) => ({
                url: 'providers/add-provider-address',
                method: 'POST',
                body: {
                    address,
                    phone
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
    }),
})

export const {
    useGetUserQuery,
    useGetNearbyProvidersQuery,
    useGetCurrentLocationQuery,
    useGetProviderProfileQuery,
    useGetServicesQuery,
    useGetChangeBookingStatusMutation,
    useGetAddToFavMutation,
    useAddAddressMutation,
    useLogoutUserMutation,
    useUpdateUserProfileMutation,
    useAddProviderAddressMutation,
} = Api