import React from 'react';
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

export default function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path="/" element={<HomePage />} />
                </Route>

                <Route element={<ProtectRoute />}>
                    <Route path="/profile" element={<ProfileLayout />}>
                        <Route index element={<ProfilePage />} />
                        <Route path="bookings" element={<MyBookingsPage />} />
                        <Route path="security" element={<SecurityPage />} />
                    </Route>
                </Route>

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