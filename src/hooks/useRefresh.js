
import { useAuth } from "../contexts/AuthContext";
import { Refresh } from "../apis/apiAuth";

export default function useRefresh() {

    const { setAccessToken } = useAuth();

    const refresh = async () => {

        try {

            const result = await Refresh();

            setAccessToken(result.accessToken);

            return result.accessToken;

        } catch (error) {

            setAccessToken(null);

            throw error;
        }
    };

    return refresh;
}

