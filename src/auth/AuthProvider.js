import { AuthContext } from './AuthContext';
import { useState } from 'react';

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const handleSignOut = () => {
    //     setIsLoggedIn(false);
    // };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;