import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { lazy } from 'react'

import Start from './pages/Start'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import ProviderProtectWrapper from './pages/ProviderProtectWrapper'

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
const UserBookingsSummary = lazy(() => import('./pages/UserBookingsSummary'))
const ProviderProfile = lazy(() => import('./pages/ProviderProfile'))
const MessagePage = lazy(() => import('./pages/Message'))
const AllBookings = lazy(() => import('./pages/AllBookings'))
const InfoForGuest = lazy(()=> import('./pages/InfoForGuest'))
const HowWeWork = lazy(()=> import('./pages/HowServiceHubWork'))

const App = () => {
  const location = useLocation()
  return (
    <>
    <Routes>
      <Route path='/user' element={<UserLayout />} >
      <Route path='home' element={ 
        <UserProtectWrapper>
          <Home />
        </UserProtectWrapper>
       } />
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
        <UserProtectWrapper>
        <BookingFinished />
        </UserProtectWrapper>
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
       <Route path='info-for-guest' element={
         <UserProtectWrapper>
         <InfoForGuest path={location.pathname}/>
         </UserProtectWrapper>
       } />
        <Route path='how-we-work' element={
         <HowWeWork path={location.pathname}/>
       } />
      </Route>
      <Route path='/' element={<Start />} />
      
       {/* Providers Routes */}
       <Route path='/provider' element={<ProviderLayout />} >
       <Route path='login' element={ <ProviderLogin /> }/>
        <Route path='signup' element={ <ProviderSignup /> }/>
        <Route path='home' element={ 
          <ProviderProtectWrapper>
            <ProviderHome />
          </ProviderProtectWrapper> }/>
        <Route path='profile' element={ 
          <ProviderProtectWrapper>
            <ProviderProfile />
          </ProviderProtectWrapper>
         }/>
         <Route path='info-for-guest' element={ 
          <ProviderProtectWrapper>
            <InfoForGuest path={location.pathname}/>
          </ProviderProtectWrapper>
         }/>
          <Route path='how-we-work' element={ 
            <HowWeWork path={location.pathname}/>
         }/>
        </Route>
    </Routes> 
  <ToastContainer toastStyle={{width: '90%', marginBottom: '100px', borderRadius: '4px'}} position='bottom-center'/>
  <SetTitle path={location.pathname}/>
    </>
  )
}

export default App