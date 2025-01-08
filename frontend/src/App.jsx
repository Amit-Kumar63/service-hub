import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'

import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import { useGetUserQuery } from './app/api/api'

const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Profile = lazy(() => import('./pages/Profile'))
const NearbyServiceProvider = lazy(() => import('./pages/NearbyServiceProvider'))
const ProviderLogin = lazy(() => import('./pages/ProviderLogin'))
const ProviderSignup = lazy(() => import('./pages/ProviderSignup'))
const ProviderHome = lazy(() => import('./pages/ProviderHome'))
const BookingFinished = lazy(() => import('./pages/BookingFinished'))
const PrivateRoute = lazy(() => import('./pages/PrivateRoutes'))

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/home' element={ <Home /> } />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={
        <UserProtectWrapper>
        <Profile />
        </UserProtectWrapper> 
      } />
      <Route path='service-provider' element={ 
        <UserProtectWrapper>
        <NearbyServiceProvider />
        </UserProtectWrapper>
       } />
       <Route path='/booking-finished' element={
        <PrivateRoute isAuthenticated={true} element={<BookingFinished/>} redirectTo='/home' />
       }/>
       {/* Providers Routes */}
       <Route path='/login-provider' element={
        <ProviderLogin />
       } />
        <Route path='/signup-provider' element={
          <ProviderSignup />
        } />
        <Route path='/provider-home' element={
          <ProviderHome />
        } />
    </Routes> 
  )
}

export default App