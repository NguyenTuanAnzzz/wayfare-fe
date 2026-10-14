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
                name: user.name,
                phone: user.phone,
                dob: user.dob
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const result = await UpdateUser(fetchWithAuth, form);

            if (result) {
                setUser(result);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        form,
        handleChange,
        handleSubmit
    };
}