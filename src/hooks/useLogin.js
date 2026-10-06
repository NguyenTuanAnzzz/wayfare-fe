import { useState } from "react";
import { Login } from "../apis/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function useLogin() {

    const [form, setForm] = useState({
        email: "",
        password: "",
        rememberMe: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };
    const { setAccessToken } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const result = await Login(form);
            setAccessToken(result.accessToken)
            navigate("/")

        } catch (err) {
            setError(
                err.message || "Có lỗi xảy ra, vui lòng thử lại!"
            );

        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        handleChange,
        handleSubmit,
        loading,
        error
    };
}