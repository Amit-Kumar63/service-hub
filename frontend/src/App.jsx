import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { lazy } from 'react'

import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'

import ProviderLayout from './pages/ProviderLayout'
import UserLayout from './pages/UserLayout'
import { ToastContainer } from 'react-toastify'
import { SetTitle } from './components/SetTitle'

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
const AllBookings = lazy(() => import('./pages/AllBookings'))

const App = () => {
  const location = useLocation()
  return (
    <>
    <Routes>
      <Route path='/user' element={<UserLayout />} >
      <Route path='home' element={ <Home /> } />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='profile' element={
        <UserProtectWrapper>
        <Profile />
        </UserProtectWrapper>
      } />
      <Route path='service-provider/:serviceType' element={ 
        <UserProtectWrapper >
        <NearbyServiceProvider />
        </UserProtectWrapper>
       } />
       <Route path='booking-finished' element={
        <PrivateRoute element={<BookingFinished/>} redirectTo='/user/home' />
       }/>
       <Route path='user-booking-summary' element={
         <UserProtectWrapper>
         <UserBookingsSummary />
         </UserProtectWrapper>
       } />
       <Route path='message' element={
         <UserProtectWrapper>
         <MessagePage />
         </UserProtectWrapper>
       } />
       <Route path='all-bookings' element={
         <UserProtectWrapper>
         <AllBookings />
         </UserProtectWrapper>
       } />
      </Route>
      <Route path='/' element={<Start />} />
      
       {/* Providers Routes */}
       <Route path='/provider' element={<ProviderLayout />} >
       <Route path='login' element={ <ProviderLogin /> }/>
        <Route path='signup' element={ <ProviderSignup /> }/>
        <Route path='home' element={ <ProviderHome /> }/>
        <Route path='profile' element={ <ProviderProfile /> }/>
        </Route>
    </Routes> 
  <ToastContainer position='bottom-center' style={{maxWidth: '80%', marginBottom: '100px', transform: 'translateX(12%)', borderRadius: '10px', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}/>
  <SetTitle path={location.pathname}/>
    </>
  )
}

export default App