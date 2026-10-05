
import { useAuth } from "../contexts/AuthContext";
import { Refresh } from "../apis/apiAuth";

let refreshPromise = null;

export default function useFetchWithAuth() {

    const { accessToken, setAccessToken } = useAuth();

    const fetchWithAuth = async (url, options = {}) => {

        // Lần gọi API đầu tiên
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`
            }
        });

        // Không phải 401 → trả kết quả luôn
        if (response.status !== 401) {
            return response;
        }

        try {

            // Nếu chưa có request refresh nào
            if (!refreshPromise) {

                refreshPromise = Refresh()
                    .then((result) => {

                        const newAccessToken =
                            result.accessToken;

                        setAccessToken(newAccessToken);

                        return newAccessToken;
                    })
                    .finally(() => {

                        refreshPromise = null;

                    });
            }

            // Chờ request refresh hiện tại 
            const newAccessToken =
                await refreshPromise;

            // Gọi lại API cũ
            const retryResponse = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization:
                        `Bearer ${newAccessToken}`
                }
            });

            return retryResponse;

        } catch (error) {

            setAccessToken(null);

            throw error;
        }
    };

    return fetchWithAuth;
}
