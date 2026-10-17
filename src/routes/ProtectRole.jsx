import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectRole({ role }) {
    const { user } = useAuth();

    if (user?.role !== role) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
