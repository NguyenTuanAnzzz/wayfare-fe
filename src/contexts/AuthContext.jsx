import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Refresh } from "../apis/apiAuth";
import { GetCurrentUser } from "../apis/apiUser";
import { createFetchWithAuth } from "../apis/fetchWithAuth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Tạo hàm fetchWithAuth dùng chung
    const fetchWithAuth = useMemo(() => {
        return createFetchWithAuth(accessToken, setAccessToken);
    }, [accessToken]);

    // Tải thông tin user bằng GetCurrentUser từ apiUser.js
    const loadUser = async () => {
        if (!accessToken) {
            setUser(null);
            return null;
        }

        try {
            const userData = await GetCurrentUser(fetchWithAuth);
            setUser(userData);
            return userData;
        } catch (error) {
            console.error("Lỗi khi tải thông tin người dùng:", error);
            setUser(null);
            return null;
        }
    };

    // 1. Khi mở ứng dụng: tự động kiểm tra cookie refresh token
    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await Refresh();
                if (res?.accessToken) {
                    setAccessToken(res.accessToken);
                }
            } catch (err) {
                // Khách chưa đăng nhập hoặc cookie hết hạn
                setAccessToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // 2. Khi accessToken thay đổi (sau khi login hoặc logout)
    useEffect(() => {
        if (accessToken) {
            loadUser();
        } else {
            setUser(null);
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
                user,
                setUser,
                loading,
                fetchWithAuth,
                refetchUser: loadUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;