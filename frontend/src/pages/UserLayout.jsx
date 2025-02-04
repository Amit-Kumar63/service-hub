import { Outlet } from "react-router-dom";
import { useGetUserQuery } from "../app/api/api";
import NavigationBar from "../components/NavigationBar";
import { auth } from '../firebase-config'
import { useEffect, useState } from "react";
import checkUserInDB from "../utils/checkUserInDB";

const UserLayout = () => {
  const [token, setToken] = useState(null)
  const [isTokenLoading, setIsTokenLoading] = useState(true)

    useEffect(()=> {
      const unSubscribe = auth.onAuthStateChanged((currentUser)=> {
        if (currentUser) {
          checkUserInDB(currentUser.uid)
          .then((isUserInDB)=> {
            if (isUserInDB) {
              setToken(currentUser.accessToken)
              setIsTokenLoading(false)
            } else {
              auth.signOut()
            }
          })
          .catch((error)=> {
            auth.signOut()
          })
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

      if (token && !user) {
        return <div className="w-full h-screen flex justify-center items-center bg-slate-300 text-gray-500 font-semibold">Loading user data....</div>
      }

  return (
    <>
      <main>
        <Outlet context={{user, isLoading, isSuccess, isError, token, isTokenLoading}}/>
      </main>
      <NavigationBar />
    </>
  );
};

export default UserLayout;