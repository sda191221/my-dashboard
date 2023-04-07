import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => { },

});

// export const onSignOut = (setIsLoggedIn) => {
//     setIsLoggedIn(false);
// };
// export const setIsLoggedIn = (isLoggedIn) => {
//     isLoggedIn = !isLoggedIn;
// };