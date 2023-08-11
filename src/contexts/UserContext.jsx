import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({children}){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    console.log(user)
    console.log(JSON.parse(localStorage.getItem('user')))
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}