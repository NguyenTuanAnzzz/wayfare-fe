import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import MyBookingsPage from '../pages/MyBookingsPage';
import SecurityPage from '../pages/SecurityPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import OAuth2CallbackPage from '../pages/OAuth2CallbackPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import UpdatePhoneAndDobPage from '../pages/UpdatePhoneAndDobPage';
import ProtectRoute from './ProtectRoute';
import ProtectRole from './ProtectRole';
import AdminLayout from '../layouts/AdminLayout';
import AdminOverviewPage from '../pages/admin/AdminOverviewPage';
import TourPackagesPage from '../pages/admin/TourPackagesPage';
import CreateTourPackagePage from '../pages/admin/CreateTourPackagePage';
import AdminPlaceholderPage from '../pages/admin/AdminPlaceholderPage';

export default function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path="/" element={<HomePage />} />
                </Route>

                {/* Tuyến đường yêu cầu đã đăng nhập (ProtectRoute) */}
                <Route element={<ProtectRoute />}>
                    {/* Hồ sơ cá nhân & Bảo mật */}
                    <Route path="/profile" element={<ProfileLayout />}>
                        <Route index element={<ProfilePage />} />
                        <Route path="bookings" element={<MyBookingsPage />} />
                        <Route path="security" element={<SecurityPage />} />
                    </Route>

                    {/* Phân hệ Quản trị viên - Yêu cầu vai trò ADMIN (ProtectRole) */}
                    <Route element={<ProtectRole role="ADMIN" />}>
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<AdminOverviewPage />} />
                            <Route path="overview" element={<AdminOverviewPage />} />
                            <Route path="tours" element={<TourPackagesPage />} />
                            <Route path="tours/create" element={<CreateTourPackagePage />} />
                            <Route path="staff" element={<AdminPlaceholderPage />} />
                            <Route path="bookings" element={<AdminPlaceholderPage />} />
                            <Route path="transactions" element={<AdminPlaceholderPage />} />
                            <Route path="sla-alerts" element={<AdminPlaceholderPage />} />
                        </Route>
                    </Route>
                </Route>

                {/* Tuyến đường công khai & Xác thực */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route
                    path="/oauth2/callback"
                    element={<OAuth2CallbackPage />}
                />
                <Route
                    path="/update-phone-and-dob"
                    element={<UpdatePhoneAndDobPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}