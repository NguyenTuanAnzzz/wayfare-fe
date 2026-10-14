import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

export default function HomeLayout() {
  const { user, loading } = useAuth();

  // Đang kiểm tra phiên đăng nhập
  if (loading) {
    return null;
  }

  // Nếu người dùng ĐÃ ĐĂNG NHẬP nhưng CHƯA CÓ số điện thoại hoặc ngày sinh (ví dụ login Google)
  // -> Chặn ngay lập tức trước khi vào trang chủ, yêu cầu cập nhật xong mới cho vào trang chủ
  if (user && (!user.phone || !user.dob)) {
    return <Navigate to="/update-phone-and-dob" replace />;
  }

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col font-sans text-ink">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

