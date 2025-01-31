import { Outlet } from "react-router-dom";
import { useGetUserQuery } from "../app/api/api";
import NavigationBar from "../components/NavigationBar";

const UserLayout = () => {
  const token = localStorage.getItem('token');

  const { data: user, isLoading, isSuccess, isError } = useGetUserQuery(
    token,
    {
        skip: !token,
    });
    
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