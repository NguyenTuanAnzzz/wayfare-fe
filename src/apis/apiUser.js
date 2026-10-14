
const API_URL = import.meta.env.VITE_API_URL;

// Lấy thông tin user hiện tại
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

// Cập nhật thông tin user hiện tại
export async function UpdateUser(fetchWithAuth, userData) {
    const response = await fetchWithAuth(`${API_URL}/me`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message || "Không thể cập nhật thông tin người dùng"
        );
    }

    return result;
}
