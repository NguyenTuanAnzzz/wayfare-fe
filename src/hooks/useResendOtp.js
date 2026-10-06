import { useState } from "react";
import { ResendOtp } from "../apis/apiAuth";
import { useLocation } from "react-router-dom";

export default function useResendOtp() {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const location = useLocation();

    const email = location.state?.email;

    const handleSubmit = async () => {

        setMessage("");
        setError("");
        setLoading(true);

        try {

            const result = await ResendOtp({
                email: email
            });

            setMessage(result.message);

            return result;

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
        handleSubmit,
        loading,
        message,
        error
    };
}