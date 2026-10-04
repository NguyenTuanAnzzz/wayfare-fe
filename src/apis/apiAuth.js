const API_URL = import.meta.env.VITE_API_URL;

export async function Register(data) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}