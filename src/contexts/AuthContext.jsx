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
            setUser(null);
            return null;
        }
    };

    // 1. Khi mở / refresh ứng dụng: tự động kiểm tra cookie refresh token và lấy user TRƯỚC KHI tắt loading
    useEffect(() => {
        const initAuth = async () => {
            try {
                const res = await Refresh();
                if (res?.accessToken) {
                    setAccessToken(res.accessToken);

                    // Tải luôn thông tin user trước khi tắt loading để ProtectRoute không bị đá sang /login
                    const userRes = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
                        headers: {
                            Authorization: `Bearer ${res.accessToken}`
                        }
                    });

                    if (userRes.ok) {
                        const userData = await userRes.json();
                        setUser(userData);
                    } else {
                        setAccessToken(null);
                        setUser(null);
                    }
                } else {
                    setAccessToken(null);
                    setUser(null);
                }
            } catch (err) {
                // Khách chưa đăng nhập hoặc cookie hết hạn
                setAccessToken(null);
                setUser(null);
            } finally {
                // Chỉ tắt loading khi ĐÃ CÓ ĐẦY ĐỦ cả accessToken và user
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // 2. Khi accessToken thay đổi sau khi khởi tạo (sau khi login hoặc logout)
    useEffect(() => {
        // Tránh chạy trùng lặp khi initAuth đang chạy
        if (loading) return;

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