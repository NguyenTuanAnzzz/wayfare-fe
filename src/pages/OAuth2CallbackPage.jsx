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

                navigate("/");
            } catch (error) {
                console.error(error);
                navigate("/login");
            }
        };

        handleGoogleLogin();

    }, []);

    return <div>Đang đăng nhập...</div>;
}