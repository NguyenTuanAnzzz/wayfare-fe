import { useState, useEffect } from "react";
import { UpdateUser } from "../apis/apiUser";
import { useAuth } from "../contexts/AuthContext";

export default function useUpdateUser() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, setUser, fetchWithAuth } = useAuth();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        dob: ""
    });

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                phone: user.phone || "",
                dob: user.dob || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: name === "avatar" ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        if (e && typeof e.preventDefault === "function") {
            e.preventDefault();
        }

        setError("");
        setLoading(true);

        const formData = new FormData();

        try {
            formData.append("name", form.name);
            formData.append("phone", form.phone);
            formData.append("dob", form.dob);

            if (form.avatar) {
                formData.append("avatar", form.avatar);
            }
            const result = await UpdateUser(fetchWithAuth, formData);

            if (result) {
                setUser((prev) => ({ ...prev, ...result }));
                setForm((prev) => ({ ...prev, avatar: null }));
                return result;
            }
        } catch (error) {
            setError(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Tự động upload khi người dùng chọn avatar mới
    useEffect(() => {
        if (form.avatar) {
            handleSubmit();
        }
    }, [form.avatar]);

    return {
        loading,
        error,
        form,
        handleChange,
        handleSubmit
    };
}