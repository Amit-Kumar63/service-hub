import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useGetProviderProfileQuery } from "../app/api/api";

const ProviderLayout = () => {
  const [provider, setProvider] = useState(null);
  const token = localStorage.getItem("provider-token");

  const { data, isLoading, isError, isSuccess } = useGetProviderProfileQuery(
    token,
    {
        skip: !token,
    });
    useEffect(()=> {
      if (isSuccess && data) {
        setProvider(data);
      }
      if (isError) {
        localStorage.removeItem('provider-token');
        setProvider(null);
      }
    }, [data, isError, isSuccess])

    if (isLoading || provider === null) {
      return <div className="w-full h-screen flex justify-center items-center text-gray-600">Loading provider data....</div>
    }
  return (
    <>
      <main>
        <Outlet context={{provider, isLoading}}/>
      </main>
    </>
  );
};

export default ProviderLayout;
