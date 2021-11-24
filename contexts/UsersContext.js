import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();
const SetUserContext = createContext();

export function useUserContext () {
    return [useContext(UserContext), useContext(SetUserContext)];
}

export function UserProvider({children}) {

    const [state, stateDispatch] = useState();
    
    return (
        <UserContext.Provider value={state} >
            <SetUserContext.Provider value={stateDispatch}>
                {children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    );
}