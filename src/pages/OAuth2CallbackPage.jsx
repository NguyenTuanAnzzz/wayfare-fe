import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Refresh } from "../apis/apiAuth";
import { useAuth } from "../contexts/AuthContext";

export default function OAuth2CallbackPage() {
    const navigate = useNavigate();
    const { setAccessToken } = useAuth();

    useEffect(() => {
        const handleGoogleLogin = async () => {
            try {
                const result = await Refresh();
                setAccessToken(result.accessToken);

                // Kiểm tra thông tin người dùng ngay sau khi login Google
                const userRes = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
                    headers: {
                        Authorization: `Bearer ${result.accessToken}`
                    }
                });

                if (userRes.ok) {
                    const userData = await userRes.json();
                    // Nếu thiếu số điện thoại hoặc ngày sinh -> chặn và chuyển đến trang bổ sung thông tin
                    if (!userData.phone || !userData.dob) {
                        navigate("/update-phone-and-dob", { replace: true });
                        return;
                    }
                }

                // Đã có đủ thông tin -> chuyển về trang chủ
                navigate("/", { replace: true });
            } catch (error) {
                navigate("/login", { replace: true });
            }
        };

        handleGoogleLogin();
    }, [navigate, setAccessToken]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 text-ink">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-3 border-bay-700 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-stone-600">Đang đồng bộ đăng nhập Google...</p>
            </div>
        </div>
    );
}
