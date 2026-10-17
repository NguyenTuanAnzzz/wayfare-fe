import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50 text-ink">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-bay-700 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-stone-600">Đang kiểm tra đăng nhập...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === 'CUSTOMER' && (!user.phone || !user.dob)) {
        return <Navigate to="/update-phone-and-dob" replace />;
    }

    return <Outlet />;
}