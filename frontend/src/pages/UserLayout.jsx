import { Outlet } from "react-router-dom";
import { useGetUserQuery } from "../app/api/api";
import NavigationBar from "../components/NavigationBar";
import { auth } from '../firebase-config'
import { useEffect, useState } from "react";

const UserLayout = () => {
  const [token, setToken] = useState(null)
  const [isTokenLoading, setIsTokenLoading] = useState(true)

    useEffect(()=> {
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
    const { data: user, isLoading, isSuccess, isError } = useGetUserQuery(
      token,
      {
          skip: !token,
      });

      if (isTokenLoading) {
        return <div className="w-full h-screen flex justify-center items-center text-gray-600">Loading user data....</div>
      }

  return (
    <>
      <main>
        <Outlet context={{user, isLoading, isSuccess, isError, token}}/>
      </main>
      <NavigationBar />
    </>
  );
};

export default UserLayout;