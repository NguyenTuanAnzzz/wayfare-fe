import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "../apis/apiAuth";

export default function useForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const forgotPassword = async () => {

        setLoading(true);
        setError(null);

        try {

            const result = await ForgotPassword({
                email
            });

            navigate('/reset-password', { state: { email, expiresAt: result.expiresAt } });

            return result;

        } catch (error) {

            setError(error.message);
            throw error;

        } finally {

            setLoading(false);

        }
    };

    return {
        email,
        setEmail,
        forgotPassword,
        loading,
        error
    };
}