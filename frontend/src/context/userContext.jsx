import { createContext, useState } from "react";

export const UserDataContext = createContext();

export const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    
    return (
        <UserDataContext.Provider value={
            {
                user,
                setUser,
                isLoading,
                setIsLoading
            }
        }>
        {children}
        </UserDataContext.Provider>
    )
}

export default UserContext;