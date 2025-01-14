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
    if (!token) {
      window.location.href = "/provider/login";
    }
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-gray-800 text-white text-lg font-bold">
        Provider Dashboard
      </header>
      <main className="py-4">
        <Outlet context={{provider, isLoading}}/>
      </main>
    </div>
  );
};

export default ProviderLayout;
