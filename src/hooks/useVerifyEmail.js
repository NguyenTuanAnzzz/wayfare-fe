import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyEmail } from "../apis/apiAuth";

export default function useVerifyEmail() {

    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setOtp(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!email) {
            setError("Không tìm thấy email cần xác thực");
            return;
        }

        if (!otp) {
            setError("Vui lòng nhập mã OTP");
            return;
        }

        if (otp.length !== 6) {
            setError("Mã OTP phải có 6 ký tự");
            return;
        }

        setLoading(true);

        try {
            const result = await VerifyEmail({
                email: email,
                otp: otp
            });

            setMessage(
                result.message || "Xác thực email thành công!"
            );

            navigate("/login")

        } catch (err) {
            setError(
                err.message || "Có lỗi xảy ra, vui lòng thử lại!"
            );

        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        otp,
        handleChange,
        handleSubmit,
        loading,
        message,
        error
    };
}