import React from "react";
import { Outlet } from "react-router-dom";
import { useGetProviderProfileQuery } from "../app/api/api";

const ProviderLayout = () => {
  const token = localStorage.getItem("provider-token");

  const { data: provider, isLoading } = useGetProviderProfileQuery(
    token,
    {
        skip: !token,
    });
  return (
    <>
      <main>
        <Outlet context={{provider, isLoading}}/>
      </main>
    </>
  );
};

export default ProviderLayout;
