import { Outlet } from "react-router-dom";
import { useGetUserQuery } from "../app/api/api";
import NavigationBar from "../components/NavigationBar";
import { auth } from '../firebase-config'
import { useEffect, useState } from "react";

const UserLayout = () => {
  const [token, setToken] = useState(null)
  const [isTokenLoading, setIsTokenLoading] = useState(true)

    useEffect(()=> {
      if (localStorage.getItem('providerToken')) {
        auth.signOut()
        localStorage.removeItem('providerToken')
      }
      const unSubscribe = auth.onAuthStateChanged((currentUser)=> {
        if (currentUser) {
          currentUser.getIdToken().then((tokenId)=> {
            setToken(tokenId)
            setIsTokenLoading(false)
          })
          .catch((error)=> {
            console.log(error)
            setIsTokenLoading(false)
            setToken(null)
          }
          )
        }
        else {
          setToken(null)
          setIsTokenLoading(false)  
        }
      })
      return ()=> unSubscribe()
    }, [])
    const { data: user, isLoading, isSuccess, isError, refetch } = useGetUserQuery(
      token,
      {
          skip: !token,
      });

      if (token && !user) {
        return <div className="w-full h-screen flex justify-center items-center bg-slate-300 text-gray-500 font-semibold">Loading user data....</div>
      }      

  return (
    <>
      <main className="md:hidden">
        <Outlet context={{user, isLoading, isSuccess, isError, token, isTokenLoading, refetch}}/>
      </main>
      <div className='w-full h-screen bg-gray-100 hidden md:flex justify-center items-center'>
      <span className='text-gray-600 text-2xl'>Please use a Mobile Device or resize your screen</span>
  </div>
      <NavigationBar />
    </>
  );
};

export default UserLayout;