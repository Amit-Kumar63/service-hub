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
    </Routes> 
  )
}

export default App