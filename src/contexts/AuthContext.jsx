import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export function useAuth() {
    const auth = useContext(AuthContext);

    return auth;
}

export default AuthProvider;