import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-limestone p-8">
      <h1 className="text-3xl font-heading font-bold text-primary mb-4">Trang chủ Wayfare</h1>
      <p className="text-ink">Chào mừng bạn đến với hệ thống đặt tour Wayfare. Tính năng đang được phát triển.</p>
      <div className="mt-6 flex gap-4">
        <a href="/login" className="text-primary hover:underline">Đi tới Đăng nhập</a>
        <a href="/register" className="text-primary hover:underline">Đi tới Đăng ký</a>
      </div>
    </div>
  );
}
