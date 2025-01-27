import React from "react";
import { Outlet } from "react-router-dom";
import { useGetUserQuery } from "../app/api/api";
import NavigationBar from "../components/NavigationBar";

const UserLayout = () => {
  const token = localStorage.getItem("token");

  const { data: user, isLoading } = useGetUserQuery(
    token,
    {
        skip: !token,
    });
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <main>
        <Outlet context={{user, isLoading}}/>
      </main>
      <NavigationBar />
    </div>
  );
};

export default UserLayout;