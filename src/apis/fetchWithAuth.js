import { Refresh } from "./apiAuth";

let refreshPromise = null;

export function createFetchWithAuth(accessToken, setAccessToken) {
    return async (url, options = {}) => {
        const token = accessToken;

        // 1. Lần gọi API đầu tiên kèm access token hiện tại
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`
            }
        });

        // Không phải 401 → trả kết quả luôn
        if (response.status !== 401) {
            return response;
        }

        // 2. Nếu 401 → tự động refresh token
        try {
            if (!refreshPromise) {
                refreshPromise = Refresh()
                    .then((result) => {
                        const newAccessToken = result.accessToken;
                        setAccessToken(newAccessToken);
                        return newAccessToken;
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
            }

            const newAccessToken = await refreshPromise;

            // 3. Gọi lại API cũ với token mới
            return await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newAccessToken}`
                }
            });
        } catch (error) {
            setAccessToken(null);
            throw error;
        }
    };
}
