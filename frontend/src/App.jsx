import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'

import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import { useGetUserQuery } from './app/api/api'

import ProviderLayout from './pages/ProviderLayout'

const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Profile = lazy(() => import('./pages/Profile'))
const NearbyServiceProvider = lazy(() => import('./pages/NearbyServiceProvider'))
const ProviderLogin = lazy(() => import('./pages/ProviderLogin'))
const ProviderSignup = lazy(() => import('./pages/ProviderSignup'))
const ProviderHome = lazy(() => import('./pages/ProviderHome'))
const BookingFinished = lazy(() => import('./pages/BookingFinished'))
const PrivateRoute = lazy(() => import('./pages/PrivateRoutes'))
const UserBookingsSummary = lazy(() => import('./pages/UserBookingsSummary'))
const ProviderProfile = lazy(() => import('./pages/ProviderProfile'))
const MessagePage = lazy(() => import('./pages/Message'))
const Favorites = lazy(() => import('./pages/Favorites'))

const App = () => {
  const token = localStorage.getItem('token');
      const { isLoading, isError, isSuccess, data: user } = useGetUserQuery(token, {
          skip: !token
    });
  
  return (
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/home' element={ <Home /> } />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={
        <UserProtectWrapper isLoading={isLoading} isError={isError} isSuccess={isSuccess}>
        <Profile user={user} isLoading={isLoading} isSuccess={isSuccess}/>
        </UserProtectWrapper> 
      } />
      <Route path='service-provider/:serviceType' element={ 
        <UserProtectWrapper isLoading={isLoading} isError={isError} isSuccess={isSuccess} >
        <NearbyServiceProvider user={user} />
        </UserProtectWrapper>
       } />
       <Route path='/booking-finished' element={
        <PrivateRoute isAuthenticated={true} element={<BookingFinished/>} redirectTo='/home' />
       }/>
       <Route path='/user-booking-summary' element={
         <UserProtectWrapper isLoading={isLoading} isError={isError} isSuccess={isSuccess}>
         <UserBookingsSummary user={user} />
         </UserProtectWrapper>
       } />
       <Route path='/message' element={
         <UserProtectWrapper isLoading={isLoading} isError={isError} isSuccess={isSuccess}>
         <MessagePage />
         </UserProtectWrapper>
       } />
       <Route path='/favorites' element={
         <UserProtectWrapper isLoading={isLoading} isError={isError} isSuccess={isSuccess}>
         <Favorites user={user} />
         </UserProtectWrapper>
       } />
       {/* Providers Routes */}
       <Route path='/provider' element={<ProviderLayout />} >
       <Route path='login' element={ <ProviderLogin /> }/>
        <Route path='signup' element={ <ProviderSignup /> }/>
        <Route path='home' element={ <ProviderHome /> }/>
        <Route path='profile' element={ <ProviderProfile /> }/>
        </Route>
    </Routes> 
  )
}

export default App