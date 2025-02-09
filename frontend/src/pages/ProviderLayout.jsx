import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useGetProviderProfileQuery } from "../app/api/api";
import { auth } from "../firebase-config";

const ProviderLayout = () => {
  const [token, setToken] = useState(null)
    const [isTokenLoading, setIsTokenLoading] = useState(true)
  
      useEffect(()=> {
        if (localStorage.getItem('token')) {
          auth.signOut()
          localStorage.removeItem('token')
        }
        const unSubscribe = auth.onAuthStateChanged((currentUser)=> {
          if (currentUser) {
            setToken(currentUser.accessToken)
            setIsTokenLoading(false)
          }
          else {
            setToken(null)
            setIsTokenLoading(false)  
          }
        })
        return ()=> unSubscribe()
      }, [])
      const { data: provider, isLoading, isSuccess, isError } = useGetProviderProfileQuery(
        token,
        {
            skip: !token,
        });
        if (token && !provider) {
          return <div className="w-full h-screen flex justify-center items-center bg-slate-300 text-gray-500 font-semibold">Loading provider data....</div>
        }
  
  return (
    <>
      <main>
        <Outlet context={{provider, isLoading, isSuccess, isError, token, isTokenLoading}}/>
      </main>
    </>
  );
};

export default ProviderLayout;
