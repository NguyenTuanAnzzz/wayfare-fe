const API_URL = import.meta.env.VITE_API_URL;

export async function GetCurrentUser(fetchWithAuth) {
    const response = await fetchWithAuth(`${API_URL}/me`, {
        method: "GET",
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Không thể lấy thông tin người dùng"
        );
    }

    return result;
}