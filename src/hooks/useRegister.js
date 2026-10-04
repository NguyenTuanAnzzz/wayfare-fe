import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../apis/apiAuth";

export default function useRegister() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        dob: "",
        agreeTerms: false
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { value, name, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Mật khẩu nhập lại không khớp");
            return;
        }

        if (!form.agreeTerms) {
            setError("Vui lòng đồng ý với điều khoản");
            return;
        }

        setLoading(true);

        try {
            const result = await Register({
                name: form.name,
                email: form.email,
                password: form.password,
                phone: form.phone,
                dob: form.dob
            });

            setMessage(result.message);

            navigate("/verify-email", {
                state: {
                    email: form.email
                }
            });

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
        message,
        error
    };
}