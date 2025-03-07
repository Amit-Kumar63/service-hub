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
        bookService: builder.mutation({
            query: ({serviceDate, address, provider, price, serviceType, token}) => ({
                url: 'booking/book-service',
                method: 'POST',
                body: {
                    serviceDate,
                    address,
                    provider,
                    price,
                    serviceType
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        deleteUserBooking: builder.mutation({
            query: ({id, token}) => ({
                url: 'users/delete-bookings',
                method: 'POST',
                params: {
                    id
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        deleteService: builder.mutation({
            query: ({serviceId, token}) => ({
                url: 'service/delete-service',
                method: 'POST',
                params: {
                    serviceId
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
        }),
        updateProviderProfile: builder.mutation({
            query: ({name, phone, address, token}) => ({
                url: 'providers/edit-provider-profile',
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
        logoutProvider: builder.mutation({
            query: (token) => ({
                url: 'providers/logout',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }),
        }),
    }),
})

export const {
    useGetUserQuery,
    useGetNearbyProvidersQuery,
    useGetProviderProfileQuery,
    useGetServicesQuery,
    useGetChangeBookingStatusMutation,
    useGetAddToFavMutation,
    useAddAddressMutation,
    useLogoutUserMutation,
    useUpdateUserProfileMutation,
    useAddProviderAddressMutation,
    useBookServiceMutation,
    useDeleteUserBookingMutation,
    useDeleteServiceMutation,
    useUpdateProviderProfileMutation,
    useLogoutProviderMutation,
} = Api