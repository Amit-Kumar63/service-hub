import { createContext, useState } from "react";

export const UserAuthContext = createContext();

export const UserContext = ({children}) => {
    const token = localStorage.getItem('token')
    
    return (
        <UserAuthContext.Provider value={
            {
                token
            }
        }>
        {children}
        </UserAuthContext.Provider>
    )
}

export default UserContext;