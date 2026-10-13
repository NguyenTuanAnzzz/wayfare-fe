import { createContext, useContext, useEffect, useState } from "react";
import { Refresh } from "../apis/apiAuth";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async (token) => {
        const currentToken = token || accessToken;
        if (!currentToken) {
            setUser(null);
            return null;
        }

        try {
            let res = await fetch(`${API_URL}/api/me`, {
                headers: {
                    Authorization: `Bearer ${currentToken}`
                }
            });

            // Nếu 401, tự động refresh token và thử lại
            if (res.status === 401) {
                const refreshData = await Refresh();
                if (refreshData?.accessToken) {
                    setAccessToken(refreshData.accessToken);
                    res = await fetch(`${API_URL}/api/me`, {
                        headers: {
                            Authorization: `Bearer ${refreshData.accessToken}`
                        }
                    });
                }
            }

            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
                return userData;
            } else {
                setUser(null);
                return null;
            }
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
                    await fetchUserProfile(res.accessToken);
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
            fetchUserProfile(accessToken);
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
                refetchUser: () => fetchUserProfile(accessToken)
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