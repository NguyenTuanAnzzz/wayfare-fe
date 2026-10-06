import { useState } from "react";
import { ResendResetPasswordOtp } from "../apis/apiAuth";

export default function useResendResetPasswordOtp() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const resendResetPasswordOtp = async () => {

        setLoading(true);
        setError(null);

        try {

            const result = await ResendResetPasswordOtp({
                email
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
        email,
        setEmail,
        resendResetPasswordOtp,
        loading,
        error
    };
}