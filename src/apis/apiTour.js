const API_URL = import.meta.env.VITE_API_URL;

export async function createTourPackage(fetchWithAuth, formData){
    const response = await fetchWithAuth(`${API_URL}/tours`, {
        method: "POST",
        body: formData
    })
    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message
        );
    }
    return result
}