import { useState } from "react";
import { GetCurrentUser } from "../apis/apiUser";
import { useAuth } from "../contexts/AuthContext";
import useFetchWithAuth from "../apis/fetchWithAuth";

export default function useGetCurrentUser() {
    const { setUser } = useAuth();
    const fetchWithAuth = useFetchWithAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await GetCurrentUser(fetchWithAuth);
            if (result) {
                setUser(result);
            }
            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        handleFetch,
        error,
        loading
    };
}