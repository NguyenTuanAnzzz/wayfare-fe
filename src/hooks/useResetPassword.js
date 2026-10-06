import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResetPassword } from "../apis/apiAuth";

export default function useResetPassword() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        otp: "",
        newPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const resetPassword = async () => {

        setLoading(true);
        setError(null);

        try {

            const result = await ResetPassword(form);

            navigate("/login", { 
                state: { message: result.message || "Đặt lại mật khẩu thành công. Vui lòng đăng nhập!" } 
            });

            return result;

        } catch (error) {

            setError(error.message);
            throw error;

        } finally {

            setLoading(false);
        }
    };

    return {
        form,
        handleChange,
        resetPassword,
        loading,
        error
    };
}